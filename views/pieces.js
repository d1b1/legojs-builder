define([
   'backbone',
   'libs/text!templates/pieces/tr.html',
   '/data/models.js'
], function (Backbone, trTpl, Data) {

  var Views = {};

  Views.Tr = Backbone.View.extend({
    tagName: 'tr',

    template: trTpl,

    events: {
      'click button.delete': 'removePiece',
      'keyup .count': 'changeCount'
    },

    changeCount: _.debounce(function(evt) {

      var self = this;
      this.model.set('count', $(evt.currentTarget).val());

      this.model.save({ count: $(evt.currentTarget).val() }).done(function() {
        // NOT getting the usable model back, so lets just do a fetch.
        self.model.fetch();
      });

    }, 500),

    removePiece: function(evt) {
      var self = this;
      this.model.destroy().done(function() {

        self.$el.fadeOut(400, function(){
          self.remove();
        });

      }).fail(function(){
        alert('Oops we could not remove this piece.');
      });
    },

    initialize: function(){
      _.bindAll(this, 'render');

      this.model.bind('change', this.render);
    },

    render: function() {
      var data = this.model.toJSON();
      data.count = data.count || 1;
      data.brick = data.brick || {};
      data.brick.image = data.brick.image || 'sss';

      $(this.el).html(_.template(this.template, data));
      return this;
    }
  });

  Views.Table = Backbone.View.extend({
    el: '#inventory',

    initialize: function(){
      _.bindAll(this, 'render', 'appendResult');

      this.collection.bind('add', this.appendResult);
      // this.collection.bind('remove', this.appendResult);
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
