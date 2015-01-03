define([
   'backbone',
   'libs/text!templates/general/header.html'
], function (Backbone, headerTpl) {

  return Backbone.View.extend({
  	el: "#header",

  	templateFileName: "header.html",

  	template: headerTpl,

    events: {
      'click .logout': 'logout'
    },

    logout: function(evt) {
      evt.preventDefault();

      localStorage.removeItem('tokenId');
      localStorage.removeItem('secret');

      this.model.clear({ silent: false });

      Backbone.history.navigate('#', { trigger: true });
    },

    initialize: function() {
    	window.Session.bind('sync', this.render, this);
      window.Session.bind('change', this.render, this);
    },

    render: function() {
  		$(this.el).html(_.template(this.template, { isLoggedIn: this.model.isloggedIn(), session: this.model.toJSON() } ));
	   }
  });

});