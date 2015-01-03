define([
  'paginator',
  'backbone'
], function (Paginator, Backbone) {

  var Models = {};
  var Collections = {};

  Models.MainProduct = Backbone.Model.extend({
    // idAttribute: '_id',
    url: function() {
      return '/product/' + this.id;
    }
  });

  Models.Piece = Backbone.Model.extend({
    idAttribute: '_id',
    url: function() {
      // Hacking solution to keep track of the product ID, needed for
      // the base of the URL string.

      var productId = this.productId ? this.productId : this.collection.productId;

      if (this.isNew()) {
        return '/product/' + productId + '/piece';
      } else {
        return '/product/' + productId + '/piece/' + this.id;
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

  Models.User = Backbone.Model.extend({
    url: function() {
      if (this.isNew()) {
        return '/user';
      } else {
        return '/user/' + this.get('_id');
      }
    },
    validate: function(attrs, options) {
      if (!attrs.name) {
        return 'Name';
      }

      if (!attrs.email) {
        return 'Missing Email';
      }

      if (!attrs.username) {
        return 'Missing Username';
      }

      if (!attrs.password) {
        return 'Missing Password';
      }
    }
  });

  Collections.ProductCollection = Backbone.Collection.extend({
    model: Models.Piece,
    url: function() {
      return '/product/' + this.productId + '/pieces';
    },
    parse: function(data) {
      return data.manifest;
    },
    totalBricks: function() {
      return this.models.length;
    },
    totalPieces: function() {
      return _.reduce(this.models, function(total, model) { 
        return total + model.get('count'); 
      }, 0);
    }
  });

  Collections.SearchCollection = Backbone.Collection.extend({
    url: function() {
      return '/brick/search?name=' + this.name;
    },
    model: Models.Brick,
    parse: function(data) {
      return data.results;
    }
  });

  // Products

  Models.Product = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      image: '',
      name: '',
      category: ''
    },
    url: '/product'
  });

  Models.MyProduct = Backbone.Model.extend({
    idAttribute: '_id',
    url: function() {
      if (this.isNew()) {
        return '/user/' + window.Session.get('_id') + '/products';
      } else {
        return '/user/' + window.Session.get('_id') + '/products/' + this.get('_id');
      }
    }
  });

  Collections.Products = Backbone.PageableCollection.extend({
    mode: "server",

    model: Models.Product,

    url: '/product/search',

    /* Initial pagination states */
    state: {
      pageSize: 100,
      order: -1
    },

    /* You can remap the query parameters from `state` keys from
       the default to those your server supports
     */

    queryParams: {
      pageSize: "size",
      currentPage: "page",
      totalPages: null,
      totalRecords: null
    },

    /* get the state from Github's search API result */
    parseState: function (resp, queryParams, state, options) {
      return {
        totalRecords: resp.count
      };
    },

    /* get the actual records */
    parseRecords: function (resp, options) {
      return resp.results;
    }

  });

  Collections.MyProducts = Backbone.Collection.extend({
    mode: "server",

    initialize: function(models, opts) {
      this.ownerId = opts.ownerId;
    },

    model: Models.MyProduct,

    url: function() {
      return '/user/' + this.ownerId + '/products';
    }

  });

  return {
    Models: Models,
    Collections: Collections
  };
});
