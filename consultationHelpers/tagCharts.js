const ourTags = ['popular', 'chinese', 'middle eastern', 'movies'];

const conversionCharts = {
  'yelp': {
    'localflavor' : 'popular',
    'massmedia' : 'popular',
    'chinese' : 'chinese',
    'cantonense' : 'chinese',
    'dimsum' : 'chinese',
    'hainan' : 'chinese',
    'shanghainese' : 'chinese',
    'middle eastern' : 'middle eastern'
    'afghan' : 'middle eastern',
    'egyptian' : 'middle eastern',
    'lebanese' : 'middle eastern',
    'movietheater' : 'movies',
    'driveintheater' : 'movies',
    'outdoormovies' : 'movies',
  },
  'defaultTag' : 'popular'
};

module.exports = { ourTags, conversionCharts };
