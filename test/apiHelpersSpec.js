import * as apiHelpers from '../consultationHelpers/apiHelpers';

import { expect } from 'chai';

describe('apiHelpers', () => {
  const ourTags = ['popular', 'chinese', 'middle eastern', 'movies'];

  const conversionCharts = {
    'yelp': {
      'localflavor': 'popular',
      'massmedia': 'popular',
      'chinese': 'chinese',
      'cantonense': 'chinese',
      'dimsum': 'chinese',
      'hainan': 'chinese',
      'shanghainese': 'chinese',
      'middle eastern': 'middle eastern',
      'afghan': 'middle eastern',
      'egyptian': 'middle eastern',
      'lebanese': 'middle eastern',
      'movietheater': 'movies',
      'driveintheater': 'movies',
      'outdoormovies': 'movies'
    },
    'defaultTag': 'popular'
  };

  describe('convertAPITagToOurTag', () => {
    it('should exist', () => {
      expect(apiHelpers.convertAPITagToOurTag).to.be.a.function;
    });

    it('should convert API tags to one of our tags', () => {
      expect(apiHelpers.convertAPITagToOurTag('dimsum', 'yelp', conversionCharts))
      .to.equal('chinese');

      expect(apiHelpers.convertAPITagToOurTag('lebanese', 'yelp', conversionCharts))
      .to.equal('middle eastern');
    });

    it('should convert unfamiliar APIs and/or API tags to our default tag', () => {
      expect(apiHelpers.convertAPITagToOurTag('dimsum', 'accuweather', conversionCharts))
      .to.equal('popular');

      expect(apiHelpers.convertAPITagToOurTag('romance', 'yelp', conversionCharts))
      .to.equal('popular');
    });
  });

  describe('convertYelpCategoryToOurTag', () => {
    it('should exist', () => {
      expect(apiHelpers.convertYelpCategoryToOurTag).to.be.a.function;
    });

    it('should convert Yelp categories to one of our tags', () => {
      expect(apiHelpers.convertYelpCategoryToOurTag(['Chinese', 'chinese'], conversionCharts))
      .to.equal('chinese');

      expect(apiHelpers.convertYelpCategoryToOurTag(['Lebanese', 'lebanese'], conversionCharts))
      .to.equal('middle eastern');
    });
  });

  describe('convertOurTagToAPITag', () => {
    it('should exist', () => {
      expect(apiHelpers.convertOurTagToAPITag).to.be.a.function;
    });

    it('should convert our tags to a random API tag', () => {
      expect(
        ['movietheater', 'driveintheater', 'outdoormovies'].indexOf(
          apiHelpers.convertOurTagToAPITag('movies', 'yelp', conversionCharts)
        )
      )
      .to.not.equal(-1);

      expect(
        ['massmedia', 'localflavor'].indexOf(
          apiHelpers.convertOurTagToAPITag('popular', 'yelp', conversionCharts)
        )
      )
      .to.not.equal(-1);
    });

    it('should return null when an invalid key or API is given', () => {
      expect(apiHelpers.convertOurTagToAPITag('movies', 'accuweather', conversionCharts))
      .to.equal(null);

      expect(apiHelpers.convertOurTagToAPITag('korean', 'yelp', conversionCharts))
      .to.equal(null);
    });
  });

  describe('consultYelp', () => {
    it('should exist', () => {
      expect(apiHelpers.consultYelp).to.be.a.function;
    });

    it('should return a promise', () => {
      const apiHelpersOutput = apiHelpers.consultYelp(['popular'], 'Bethlehem');

      expect(apiHelpersOutput instanceof Object).to.be.true;
    });
  });

  describe('deepEquals', () => {
    it('should allow for deep array equality', () => {
      expect(apiHelpers.deepEquals([3], [3])).to.be.true;
    });

    it('should distinguish between an empty object and array', () => {
      expect(apiHelpers.deepEquals([], {})).to.be.false;
    });
  });
});
