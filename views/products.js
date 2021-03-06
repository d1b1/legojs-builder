define([
   'backbone',
   'backgrid',
   'libs/text!templates/products/table.html',
   'libs/text!templates/products/tr.html',
   '/data/models.js',
   'libs/text!templates/search/form.html'
], function (Backbone, Backgrid, tableTpl, trTpl, Data, formTpl) {

  var Views = {};

  Views.Form = Backbone.View.extend({
    el: "#searchInfo",

    template: formTpl,

    events: {
      'keyup #searchTerm': 'search'
    },

    search: _.debounce(function(evt) {
      this.collection.queryParams.name = $(evt.currentTarget).val();

      $('#resultsTable').empty();
      
      this.collection.fetch();
    }, 200),

    render: function() {
      $(this.el).prepend(_.template(this.template));
    }
  });

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'click .toggleOwnership': 'ownProduct'
    },

    ownProduct: function(e) {
      var myProduct = new Data.Models.MyProduct();

      myProduct.set('product', this.model.id);
      myProduct.save(null);
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
      console.log('sssss', this.model);
      var jsonData =  this.model.toJSON();
      if (!jsonData.manifest) {
        jsonData.manifest = [];
      }

      console.log('jsonData', jsonData);
      jsonData.numOfPieces = jsonData.manifest.length;

      $(this.el).html(_.template(this.template, jsonData));

      return this;
    }
  });

  Views.Table = Backbone.View.extend({
    el: '#productList',

    template: tableTpl,

    events: {
      'keyup input[name="term"]': 'search'
    },

    search: function(evt) {
      evt.preventDefault();

      this.collection.queryParams.name = $(evt.currentTarget).val();

      $('tbody', this.el).empty();
      this.collection.fetch();
    },

    initialize: function(options){
      _.bindAll(this, 'render', 'appendResult');

      this.pieces = options.pieces;
      this.productId = options.productId;

      this.collection.bind('add', this.appendResult);
      // this.collection.bind('sync', this.appendResult);
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
