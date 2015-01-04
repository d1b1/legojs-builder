define([
   'backbone',
   'libs/text!templates/general/details.html'
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
      var formData = $('#detailsForm').serializeObject();

      this.model.set(formData);

      if (!self.model.isValid()) {
        console.log('ssss', self.model.validationError);
        return alert('Missing Info');
      }

      self.model.save().done(function() {
        alert('Updated User Info');
      });
    }

  });

});