const _ = require('lodash');
const { deepEquals } = require('./apiHelpers');
const { Architect } = require('synaptic');

// Output: A flattened array consisting of all the tags from all users' events
// Input: Same as the input to consultNetwork
const getAllTags = (userEvents) => {
  const tagArrs = userEvents.map(userEvent => _.map(userEvent, 'tags'));
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
  return _.range(n).reduce(
    memo => [...memo, Math.random() > .5 ? 1 : 0],
    []
  );
};

// Output: A neural network that has been trained on the provided
// user events
// Input: An array of user events (see examples.js), as well as
// the associated tag map
const trainNetwork = (userEvents, tagMap) => {
  // Convert the input to training data
  const trainingDataUnflattened = userEvents.map(userEvent => {
    return userEvent.map(choice => tagsToVector(choice.tags, tagMap));
  });
  const trainingData = _(trainingDataUnflattened).flatten().value();

  // Create and train a neural network
  const newNetwork = new Architect.Hopfield(tagMap.length);
  newNetwork.learn(trainingData);

  return newNetwork;
};

// Output: n randomly generated input vectors
// Input: An integer n and a tag map
const generateInputVectors = (n, tagMap) => {
  return _.range(n).map(() => randomVector(tagMap.length));
};

// Output: An array of tags
// Input: A network, tag map, and a vector
const consultNetwork = (network, tagMap, inputVector) => {
  return vectorToTags(network.feed(inputVector), tagMap);
};

// Output: An array of arrays of tags, each of which represents
// a 'suggestion' based on the provided user events
// Input: An array of user events (see examples.js), as well as
// the number of suggestions to generate
const createAndConsultNetwork = (userEvents, n = 1) => {
  const enrichedUserEvents = userEvents.map(
    userEvent => deepEquals(userEvent, []) ? [ { tags: [''] } ] : userEvent
  );

  const tagMap = getTagMap(getAllTags(userEvents));
  const network = trainNetwork(userEvents, tagMap);
  const inputVectors = generateInputVectors(n, tagMap);

  return inputVectors.map(
    inputVector => consultNetwork(network, tagMap, inputVector)
  );
};

module.exports = {
  getAllTags,
  getTagMap,
  tagsToVector,
  vectorToTags,
  randomVector,
  trainNetwork,
  generateInputVectors,
  consultNetwork,
  createAndConsultNetwork
};
