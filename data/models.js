define([], function () {

  var Models = {};
  var Collections = {};

  Models.Brick = Backbone.Model.extend({
    defaults: {
      image: '',
      name: '',
      category: ''
    },
    url: 'http://api.legojs.io/brick'
  });

  Collections.ProductCollection = Backbone.Collection.extend({
    model: Models.Brick
  });

  Collections.SearchCollection = Backbone.Collection.extend({
    url: function() {
      return 'http://api.legojs.io/brick/search?term=' + this.term;
    },
    model: Models.Brick,
    parse: function(data) {
      return data.results;
    }
  });

  return {
    Models: Models,
    Collections: Collections
  };
});
