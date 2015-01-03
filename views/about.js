define([
   'backbone',
   'libs/text!templates/general/about.html'
], function (Backbone, tpl) {

  return Backbone.View.extend({
  	el: "#content",

  	template: tpl,

    render: function() {
	  	var self = this;

  		$(self.el).html(_.template(self.template ));
	  }
  });

});