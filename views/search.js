define([
   'libs/text!templates/search/form.html',
   'libs/text!templates/search/tr.html',
   '/data/models.js'
], function (formTpl, trTpl, Data) {

  var Views = {};

  Views.Form = Backbone.View.extend({
    el: "#search",

    template: formTpl,

    events: {
      'click button.add': 'addBrickToProduct',
      'keyup #searchTerm': 'search'
    },

    search: function(evt) {
      this.collection.term = $(evt.currentTarget).val();
      $('#resultsTable', this.el).empty();
      this.collection.fetch();
    },

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

      this.model.bind('change', this.render);
    },

    addBrickToProduct: function(){
      this.model.set('qty', 1);
      this.pieces.add(this.model);
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

      this.collection.bind('add', this.appendResult);
      this.render();
    },

    render: function() {
      var self = this;

      _(this.collection.models).each(function(brick){
        self.appendResult(brick);
      }, this);
    },

    appendResult: function(brick) {
      var aview = new Views.Tr({
        model: brick,
        pieces: this.pieces
      });

      $('#resultsTable', this.el).append(aview.render().el);
    }
  });

  return Views;
});
