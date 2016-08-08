const _ = require('lodash');
const synaptic = require('synaptic');

const Neuron = synaptic.Neuron;
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
const Architect = synaptic.Architect;

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
  return tagMap.reduce((memo, nextTag) => {
    return tags.indexOf(nextTag) >= 0 ? [...memo, 1] : [...memo, 0];
  }, []);
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
  return Array.from(Array(n)).reduce((memo) => [...memo, Math.round(Math.random())], []);
};

// Output: An array of tags which comprises a 'suggestion' based on the provided user events
// Input: An array of user events (see examples.js)
const consultNetwork = (userEvents) => {
  // Converts the userEvents into training data
  const allTags = getAllTags(userEvents);
  const tagMap = getTagMap(allTags);
  const trainingDataUnflattened = userEvents.map(userEvent => {
    return userEvent.map(choice => tagsToVector(choice.tags, tagMap));
  });
  const trainingData = _(trainingDataUnflattened).flatten().value();

  // Creates and train a neural network
  const newNetwork = new Architect.Hopfield(tagMap.length);
  newNetwork.learn(trainingData);

  // Randomly chooses an input vector
  const inputVector = randomVector(tagMap.length);

  // Feeds the input vector to the neural network and converts its output to an array of tags,
  // which is then returns
  return vectorToTags(newNetwork.feed(inputVector), tagMap);
};

module.exports = { consultNetwork };
