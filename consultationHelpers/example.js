const { createAndConsultNetwork } = require('./neuralHelpers');
const { consultYelp } = require('./apiHelpers');

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
console.log('Louis and Minh should consider...\n', createAndConsultNetwork([louisEvents, minhEvents]));

// Logs a guess to the following question:
// 'What 4 things might Louis and Nick like to do together, given the events they've done in the past?'
console.log('Louis and Nick should consider...\n', createAndConsultNetwork([louisEvents, nickEvents], 4));

// Logs a guess to the following question:
// 'What 3 things might Louis, Minh, and Nick like to do together, given the events they've done in the past?'
console.log('Louis, Minh, and Nick should consider...\n', createAndConsultNetwork([louisEvents, minhEvents, nickEvents], 3));

// Logs the results of consulting Yelp Search API with compl:
console.log(consultYelp('We need to agree on a standard for this input!'));
