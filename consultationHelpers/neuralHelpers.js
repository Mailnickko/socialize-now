const _ = require('lodash');
const { Architect } = require('synaptic');

// Output: A flattened array consisting of all the tags from all users' events
// Input: Same as the input to consultNetwork
const getAllTags = (userEvents) => {
  const tagArrs = userEvents.map(userEvent => userEvent.map(choice => choice.tags));
  return _(tagArrs).flatten().flatten().value();
};

// Output: An array consisting of the unique tags, hereafter called a "tag map"
// (used to convert between tag arrays and vectors)
// Input: An array of tags
// Example: ['Chinese', 'Movies', 'Chinese'] -> ['Chinese', 'Movies']
const getTagMap = (allTags) => {
  return _.uniq(allTags);
};

// Output: A vector corresponding to the input
// Input: An array of tags and an associated 'master list' of tags
// Example: (['Chinese', Movies'], ['French', 'Movies', 'Chinese']) -> [0, 1, 1]
const tagsToVector = (tags, tagMap) => {
  return tagMap.reduce(
    (memo, nextTag) => [...memo, tags.indexOf(nextTag) >= 0 ? 1 : 0],
    []
  );
};

// Output: An array of tags corresponding to the input
// Input: A vector and an associated 'master list' of tags
// Example: ([0, 1, 1], ['French', 'Movies', 'Chinese']) -> ['Movies', 'Chinese']
const vectorToTags = (vector, tagMap) => {
  return vector.reduce((memo, nextBit, nextIndex) => {
    if (nextBit === 1) {
      return [...memo, tagMap[nextIndex]];
    } else {
      return [...memo];
    }
  }, []);
};

// Output: A random vector consisting of binary entries
// Input: The desired length of the random vector
// Example: 3 -> [0, 1, 1]
const randomVector = (n) => {
  return Array.from(Array(n)).reduce(
    (memo) => [...memo, Math.round(Math.random())],
    []
  );
};

// Output: An array of arrays of tags, each of which represents
// a 'suggestion' based on the provided user events
// Input: An array of user events (see examples.js), as well as
// the number of suggestions to return
const consultNetwork = (userEvents, n = 1) => {
  // Convert the userEvents into training data
  const allTags = getAllTags(userEvents);
  const tagMap = getTagMap(allTags);
  const trainingDataUnflattened = userEvents.map(userEvent => {
    return userEvent.map(choice => tagsToVector(choice.tags, tagMap));
  });
  const trainingData = _(trainingDataUnflattened).flatten().value();

  // Create and train a neural network
  const newNetwork = new Architect.Hopfield(tagMap.length);
  newNetwork.learn(trainingData);

  // Randomly choose n input vectors
  const inputVectors = _.range(n).map(() => randomVector(tagMap.length));

  // Feed the input vectors to the neural network and
  // converts the outputs to an array of tags,
  // which is then returned
  return inputVectors.map(inputVector => vectorToTags(newNetwork.feed(inputVector), tagMap));
};

module.exports = { consultNetwork };
