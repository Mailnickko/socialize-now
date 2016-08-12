const { conversionCharts } = require('./tagCharts');

// Output: The corresponding tag from 'our tags'
// Input: A tag from an API result and the
// name of the API, as well as the conversion charts
const convertAPITagToOurTag = (apiTag, apiName, charts = conversionCharts) => {
  if ( !(apiName in charts) || !(apiTag in charts[apiName]) ) {
    return charts.defaultTag;
  } else {
    return charts[apiName][apiTag];
  }
};

// Output: A randomly chosen API tag which corresponds
// to the provided tag
// Input: One of 'our tags' and the name of an API,
// as well as the conversion charts
const convertOurTagToAPITag = (ourTag, apiName, charts = conversionCharts) => {
  if ( !(apiName in charts) ) {
    return null;
  } else {
    const apiKeys = Object
    .keys(charts[apiName])
    .filter(key => charts[apiName][key] === ourTag);

    if (apiKeys.length === 0) {
      return null;
    }

    return apiKeys[Math.floor(Math.random() * apiKeys.length)];
  }
};

// Output: An object with the suggestions provided by Yelp
// Input: TBD
const consultYelp = (input) => {
  // Currently, we're just ignoring the 'input' and returning
  // this dummy sample data from Yelp's Search API documentation

  // For more information, navigate to the following link:
  // https://www.yelp.com/developers/documentation/v2/search_api
  return {
    "businesses": [
      {
        "categories": [
          [
            "Local Flavor",
            "localflavor"
          ],
          [
            "Mass Media",
            "massmedia"
          ]
        ],
        "display_phone": "+1-415-908-3801",
        "id": "yelp-san-francisco",
        "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/nQK-6_vZMt5n88zsAS94ew/ms.jpg",
        "is_claimed": true,
        "is_closed": false,
        "location": {
          "address": [
            "140 New Montgomery St"
          ],
          "city": "San Francisco",
          "coordinate": {
            "latitude": 37.7867703362929,
            "longitude": -122.399958372115
          },
          "country_code": "US",
          "cross_streets": "Natoma St & Minna St",
          "display_address": [
            "140 New Montgomery St",
            "Financial District",
            "San Francisco, CA 94105"
          ],
          "geo_accuracy": 9.5,
          "neighborhoods": [
            "Financial District",
            "SoMa"
          ],
          "postal_code": "94105",
          "state_code": "CA"
        },
        "mobile_url": "http://m.yelp.com/biz/yelp-san-francisco",
        "name": "Yelp",
        "phone": "4159083801",
        "rating": 2.5,
        "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c7fb9aff59f9/ico/stars/v1/stars_2_half.png",
        "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/d63e3add9901/ico/stars/v1/stars_large_2_half.png",
        "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/8e8633e5f8f0/ico/stars/v1/stars_small_2_half.png",
        "review_count": 7140,
        "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/YcjPScwVxF05kj6zt10Fxw/ms.jpg",
        "snippet_text": "What would I do without Yelp?\n\nI wouldn't be HALF the foodie I've become it weren't for this business.    \n\nYelp makes it virtually effortless to discover new...",
        "url": "http://www.yelp.com/biz/yelp-san-francisco"
      }
    ],
    "total": 2316
  };
};

module.exports = { convertAPITagToOurTag, convertOurTagToAPITag, consultYelp };
