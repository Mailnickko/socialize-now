const consultNetwork = require('./neuralHelpers').consultNetwork;

const louisEvents = [
  {
    tags: ['Chinese', 'Movie'],
    otherKey: 'consultNetwork will only regard the \'tags\' key of each events object, nothing else!'
  },
  {
    tags: ['Chinese', 'Movie']
  },
  {
    tags: ['Chinese']
  },
  {
    tags: ['Movie']
  },
  {
    tags: ['Chinese', 'Movie']
  },
];

const minhEvents = [
  {
    tags: ['French', 'Movie']
  },
  {
    tags: ['Chinese', 'Movie']
  },
  {
    tags: ['French']
  },
  {
    tags: ['Movie']
  },
  {
    tags: ['Chinese', 'Movie']
  },
];

const nickEvents = [
  {
    tags: ['French', 'Movie']
  },
  {
    tags: ['French', 'Movie']
  },
  {
    tags: ['Movie']
  },
  {
    tags: ['Movie']
  },
  {
    tags: ['Chinese', 'Movie']
  },
];

// Logs a guess to the following question:
// 'What might Louis and Minh like to do together, given the events they've done in the past?'
console.log(consultNetwork([louisEvents, minhEvents]));

// Logs a guess to the following question:
// 'What might Louis and Nick like to do together, given the events they've done in the past?'
console.log(consultNetwork([louisEvents, nickEvents]));

// Logs a guess to the following question:
// 'What might Louis, Minh, and Nick like to do together, given the events they've done in the past?'
console.log(consultNetwork([louisEvents, minhEvents, nickEvents]));
