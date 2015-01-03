define([
   'backbone',
   'backgrid',
   'libs/text!templates/mine/table.html',
   'libs/text!templates/mine/tr.html',
   '/data/models.js'
], function (Backbone, Backgrid, tableTpl, trTpl, Data) {

  var Views = {};

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'mouseover .toggleOwnership': function(e) {
        $(e.currentTarget).html('Drop It');
      },
      'mouseout .toggleOwnership': function(e) {
        $(e.currentTarget).html('Own It');
      },
      'click .toggleOwnership': 'unOwn'
    },

    unOwn: function(e) {

      // Refactor this into a model and or a view.
      $.ajax({
          url: this.model.url() + '/' + this.model.get('_id'),
          type: 'DELETE',
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
