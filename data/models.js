define([], function () {

  var Models = {};
  var Collections = {};

  Models.MainProduct = Backbone.Model.extend({
    // idAttribute: '_id',
    url: function() {
      return 'http://api.legojs.io/product/' + this.id;
    }
  });

  Models.Piece = Backbone.Model.extend({
    idAttribute: '_id',
    url: function() {
      // Hacking solution to keep track of the product ID, needed for
      // the base of the URL string.

      var productId = this.productId ? this.productId : this.collection.productId;

      if (this.isNew()) {
        return 'http://api.legojs.io/product/' + productId + '/piece';
      } else {
        return 'http://api.legojs.io/product/' + productId + '/piece/' + this.id;
      }
    }
  });

  Models.Brick = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      image: '',
      name: '',
      category: ''
    },
    url: 'http://api.legojs.io/brick'
  });

  Collections.ProductCollection = Backbone.Collection.extend({
    model: Models.Piece,
    url: function() {
      return 'http://api.legojs.io/product/' + this.productId + '/pieces';
    },
    parse: function(data) {
      return data.manifest;
    }
  });

  Collections.SearchCollection = Backbone.Collection.extend({
    url: function() {
      return 'http://api.legojs.io/brick/search?name=' + this.name;
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
