define([
   'backbone',
   'libs/text!templates/general/invite.html'
], function (Backbone, tpl) {

  return Backbone.View.extend({
  	el: "#content",

  	template: tpl,

    events: {
      'click .saveButton': 'save'
    },

    render: function() {
	  	var self = this;
  		$(self.el).html(_.template(self.template, this.model.toJSON()));

      return this;
	  },

    save: function(evt) {
      evt.preventDefault();
      var self = this;
      var formData = $('#passwordForm').serializeObject();

      if (formData.password1 == '') {
        return alert('Enter a valid password');
      }
      
      if (formData.password1 != formData.password2) {
        return alert('Passwords do not match.');
      }

      this.model.set('password', formData.password1);

      if (!self.model.isValid()) {
        return alert('Missing Info');
      }

      self.model.save().done(function() {
        alert('Updated Account Password.');
      });
    }

  });

});