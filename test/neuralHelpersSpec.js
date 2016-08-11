import { expect } from 'chai';
import * as neuralHelpers from '../consultationHelpers/neuralHelpers';

describe('neuralHelpers', () => {
  let louisEvents;
  let minhEvents;
  let nickEvents;

  beforeEach(() => {
    louisEvents = [
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

    minhEvents = [
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

    nickEvents = [
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
  });

  describe('getAllTags', () => {
    it('should exist', () => {
      expect(neuralHelpers.getAllTags).to.be.a.Function;
    });

    it('should get all tags for one user', () => {
      expect(neuralHelpers.getAllTags([louisEvents])).to.deep.equal([
        'Chinese',
        'Movie',
        'Chinese',
        'Movie',
        'Chinese',
        'Movie',
        'Chinese',
        'Movie'
      ]);
    });

    it('should get all tags for multiple users', () => {
      expect(neuralHelpers.getAllTags([louisEvents, minhEvents, nickEvents])).to.deep.equal([
        'Chinese',
        'Movie',
        'Chinese',
        'Movie',
        'Chinese',
        'Movie',
        'Chinese',
        'Movie',
        'French',
        'Movie',
        'Chinese',
        'Movie',
        'French',
        'Movie',
        'Chinese',
        'Movie',
        'French',
        'Movie',
        'French',
        'Movie',
        'Movie',
        'Movie',
        'Chinese',
        'Movie'
      ]);
    });
  });

  describe('getTagMap', () => {
    it('should exist', () => {
      expect(neuralHelpers.getTagMap).to.be.a.Function;
    });

    it('should get trivial tag maps', () => {
      expect(neuralHelpers.getTagMap(['Chinese', 'Movie'])).to.deep.equal(['Chinese', 'Movie']);
    });

    it('should get more complicated tag maps', () => {
      expect(neuralHelpers.getTagMap(
        ['Chinese', 'Movie', 'Chinese', 'French', 'Movie', 'Chinese', 'Korean', 'Chinese']
      ))
      .to.deep.equal(['Chinese', 'Movie', 'French', 'Korean']);
    });
  });

  describe('tagsToVector', () => {
    it('should exist', () => {
      expect(neuralHelpers.tagsToVector).to.be.a.Function;
    });

    it('should convert tags to vectors, regardless of order', () => {
      expect(neuralHelpers.tagsToVector([], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal([0, 0, 0, 0]);

      expect(neuralHelpers.tagsToVector(['Chinese', 'French'], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal([0, 1, 0, 1]);

      expect(neuralHelpers.tagsToVector(['Korean', 'French', 'Chinese'], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal([1, 1, 0, 1]);
    });
  });

  describe('vectorToTags', () => {
    it('should exist', () => {
      expect(neuralHelpers.vectorToTags).to.be.a.Function;
    });

    it('should convert vectors to tags', () => {
      expect(neuralHelpers.vectorToTags([0, 0, 0, 0], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal([]);

      expect(neuralHelpers.vectorToTags([0, 1, 0, 1], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal(['Chinese', 'French']);

      expect(neuralHelpers.vectorToTags([1, 1, 0, 1], ['Korean', 'Chinese', 'Thai', 'French']))
      .to.deep.equal(['Korean', 'Chinese', 'French']);
    });
  });

  describe('randomVector', () => {
    it('should exist', () => {
      expect(neuralHelpers.randomVector).to.be.a.Function;
    });

    it('should correctly handle trivial input', () => {
      expect(neuralHelpers.randomVector(0)).to.deep.equal([]);
    });

    it('should return vectors of the appropriate length', () => {
      expect(neuralHelpers.randomVector(4).length).to.equal(4);
      expect(neuralHelpers.randomVector(35).length).to.equal(35);
    });

    it('should return a binary vector', () => {
      expect(neuralHelpers.randomVector(100).filter(bit => bit !== 0 && bit !== 1).length).to.equal(0);
    });

    it('should vary its output (fails incorrectly with probability about 1 / 2^100)', () => {
      const output1 = neuralHelpers.randomVector(100);
      const output2 = neuralHelpers.randomVector(100);

      expect(output1).to.not.deep.equal(output2);
    });
  });

  describe('trainNetwork', () => {
    it('should exist', () => {
      expect(neuralHelpers.trainNetwork).to.be.a.Function;
    });
  });

  describe('generateInputVectors', () => {
    it('should exist', () => {
      expect(neuralHelpers.generateInputVectors).to.be.a.Function;
    });
  });

  describe('consultNetwork', () => {
    it('should exist', () => {
      expect(neuralHelpers.consultNetwork).to.be.a.Function;
    });
  });

  describe('createAndConsultNetwork', () => {
    it('should exist', () => {
      expect(neuralHelpers.createAndConsultNetwork).to.be.a.Function;
    });
  });
});
