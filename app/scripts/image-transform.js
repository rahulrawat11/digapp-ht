/**
 * transform elastic search image query to display format.  See data-model.json
 */

/* globals _ */
/* exported imageTransform */
/* jshint camelcase:false */

/* note lodash should be defined in parent scope. */
var imageTransform = (function(_, relatedEntityTransform, commonTransforms) {

  function getImageUrl(record) {
    return _.get(record, 'url');
  }

  return {
    // expected data is from an elasticsearch
    images: function(data) {
      var images = [];
      data.hits.hits.forEach(function(hit) {
        images.push(getImageUrl(hit._source));
      });
      return images;
    },
    image: function(data) {
      console.log(data);

      var newData = {};
      if(data.hits.hits.length > 0) {
        newData = data.hits.hits[0]._source;

        var adultService = {
          total: newData.isImagePartOf.length,
          array: []
        };

        newData.isImagePartOf.forEach(function(service) {
          if(service.mainEntity) {
            adultService.array.push(service.mainEntity.itemOffered.uri);
          }

        });

        newData.adultService = adultService;
      }
      console.log(newData);
      return newData;
    },
    offerLocationData: function(data) {
      return commonTransforms.offerLocationData(data);
    },
    imageOffersData: function(data) {
      var newData = {};
      newData.relatedOffers = relatedEntityTransform.offer(data);
      console.log(newData);
      return newData;
    },

    imageTotal: function(data) {
      return data.hits.total;
    }
  };
})(_, relatedEntityTransform, commonTransforms);
