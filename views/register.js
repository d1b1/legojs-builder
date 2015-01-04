define([
   'backbone',
   'libs/text!templates/general/register.html',
   '/data/models.js'
], function (Backbone, tpl, Data) {

  return Backbone.View.extend({
  	el: "#content",

  	template: tpl,

    events: {
      'click .actionButton': 'action'
    },

    action: function(evt) {
      evt.preventDefault();
      var self = this;
      var formData = $('#registrationForm').serializeObject();

      var User = new Data.Models.User(formData);

      if (!User.isValid()) {
        console.log('ssss', User.validationError);
        return alert('Missing Info');
      }

      User.save().done(function() {
        alert('New User Created');
      });
    },

    render: function() {
	  	var self = this;

  		$(self.el).html(_.template(self.template));
	  }
  });

});