define([
   'backbone',
   'backgrid',
   'libs/text!templates/products/table.html',
   'libs/text!templates/products/tr.html',
   '/data/models.js'
], function (Backbone, Backgrid, tableTpl, trTpl, Data) {

  var Views = {};

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'click .toggleOwnership': 'ownProduct'
    },

    ownProduct: function(e) {

      // TODO: Refactor this to make it use a model.
      $.ajax({
          url: 'http://api.legojs.io/user/54a37ab2593a67c96cbcfb71/products',
          type: 'POST',
          data: { product: this.model.id },
          success: function(result) {
             alert('all done');
          }
      });
    },

    initialize: function(options){
      _.bindAll(this, 'render', 'addBrickToProduct');

      // Store the external collection.
      this.pieces = options.pieces;
      this.productId = options.productId;

      this.model.bind('change', this.render);
    },

    addBrickToProduct: function() {
      console.log('Edit a Product');
    },

    render: function() {
      var jsonData =  this.model.toJSON();
      if (!jsonData.manifest) {
        jsonData.manifest = [];
      }

      jsonData.numOfPieces = jsonData.manifest.length;

      $(this.el).html(_.template(this.template, jsonData));

      return this;
    }
  });

  Views.Table = Backbone.View.extend({
    el: '#productList',

    template: tableTpl,

    initialize: function(options){
      _.bindAll(this, 'render', 'appendResult');

      this.pieces = options.pieces;
      this.productId = options.productId;

      this.collection.bind('add', this.appendResult);
      this.render();
    },

    render: function() {
      var self = this;

      $(this.el).html(_.template(this.template));
      $('tbody', this.el).empty();

      _(this.collection.models).each(function(model){
        self.appendResult(model);
      }, this);
    },

    appendResult: function(model) {
      var aview = new Views.Tr({
        model: model
      });

      $('tbody', this.el).append(aview.render().el);
    }
  });

  return Views;
});
