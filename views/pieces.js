define([
   'libs/text!templates/pieces/tr.html',
   '/data/models.js'
], function (trTpl, Data) {

  var Views = {};

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'click button.add': 'addBrickToProduct'
    },

    initialize: function(){
      _.bindAll(this, 'render');

      this.model.bind('change', this.render);
    },

    render: function() {
      $(this.el).html(_.template(this.template, this.model.toJSON()));

      return this;
    }
  });

  Views.Table = Backbone.View.extend({
    el: '#inventory',

    initialize: function(){
      _.bindAll(this, 'render', 'appendResult');

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
        model: brick
      });

      $('#productPiecesTable', this.el).append(aview.render().el);
    }
  });

  return Views;
});
