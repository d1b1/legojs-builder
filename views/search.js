define([
   'libs/text!templates/search/form.html',
   'libs/text!templates/search/tr.html',
   '/data/models.js'
], function (formTpl, trTpl, Data) {

  var Views = {};

  Views.Form = Backbone.View.extend({
    el: "#searchInfo",

    template: formTpl,

    events: {
      'click button.add': 'addBrickToProduct',
      'keyup #searchTerm': 'search'
    },

    search: _.debounce(function(evt) {
      this.collection.name = $(evt.currentTarget).val();
      $('#resultsTable').empty();
      this.collection.fetch();
    }, 300),

    render: function() {
      $(this.el).prepend(_.template(this.template));
    }
  });

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'click button.add': 'addBrickToProduct'
    },

    initialize: function(options){
      _.bindAll(this, 'render', 'addBrickToProduct');

      // Store the external collection.
      this.pieces = options.pieces;
      this.productId = options.productId;

      this.model.bind('change', this.render);
    },

    addBrickToProduct: function(){
      var self = this;
      var newPiece = new Data.Models.Piece({ count: 1, brick: this.model.id });
      newPiece.productId = this.productId;

      newPiece.save().done(function() {
        newPiece.fetch().done(function() {
          self.pieces.add( newPiece );
        });
      }).fail(function() {
        alert('Failed to insert Product Piece.');
      });

    },

    render: function() {
      $(this.el).html(_.template(this.template, this.model.toJSON()));

      return this;
    }
  });

  Views.Table = Backbone.View.extend({
    el: '#search',

    initialize: function(options){
      _.bindAll(this, 'render', 'appendResult');

      this.pieces = options.pieces;
      this.productId = options.productId;

      this.collection.bind('add', this.appendResult);
      this.render();
    },

    render: function() {
      var self = this;

      $('#resultsTable', this.el).empty();

      _(this.collection.models).each(function(brick){
        self.appendResult(brick);
      }, this);

      if (this.collection.length == 0) {
        $('#resultsTable', this.el).append($('<tr><td align=center colspan="4">Nothing Found. Try Again.</td></tr>'));
      }
    },

    appendResult: function(brick) {
      var aview = new Views.Tr({
        model: brick,
        pieces: this.pieces,
        productId: this.productId
      });

      $('#resultsTable', this.el).append(aview.render().el);
    }
  });

  return Views;
});
