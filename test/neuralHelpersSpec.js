import { expect } from 'chai';
import * as neuralHelpers from '../consultationHelpers/neuralHelpers';

describe('neuralHelpers', () => {
  beforeEach(() => {
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
  });

  describe('getAllTags', () => {
    it('should exist', () => {
      expect(neuralHelpers.getAllTags).to.be.a.Function;
    });
  });

  describe('getTagMap', () => {
    it('should exist', () => {
      expect(neuralHelpers.getTagMap).to.be.a.Function;
    });
  });

  describe('tagsToVector', () => {
    it('should exist', () => {
      expect(neuralHelpers.tagsToVector).to.be.a.Function;
    });
  });

  describe('vectorToTags', () => {
    it('should exist', () => {
      expect(neuralHelpers.vectorToTags).to.be.a.Function;
    });
  });

  describe('randomVector', () => {
    it('should exist', () => {
      expect(neuralHelpers.randomVector).to.be.a.Function;
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
