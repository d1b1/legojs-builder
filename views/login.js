define([
   'backbone',
   'libs/text!templates/login/form.html',
   'jquery',
   'bootstrap'
], function (Backbone, formTpl, $, Bootstrap) {

  var Views = {};

  Views.Form = Backbone.View.extend({

    template: formTpl,
    
    events: {
      'click .actionButton': 'action'
    },

	unload: function() {
	  this.$el.modal('close');

	  this.unbind();
	  this.undelegateEvents();

      this.remove();
	},

    className: 'modal hide fade',

    render: function() {
      var self = this;
      this.$el.html(this.template);
      this.$el.modal({ show: true }).removeClass('fade').removeClass('hide');

      return this;
    },

    action: function(evt) {
      var self = this;
      var formData = $('#modalForm').serializeObject();

      var authConfig = {
        key: 'abc123',
        secret: 'ssh-secret'
      };

      var AuthService = Authorization(authConfig);
      var url = 'http://api.formagg.io/authenticate/accesstoken';

      var opts = {
        url: url,
        type: 'Post',
        contentType: "application/json",
        dataType: "json",
        processData: false,
        data: JSON.stringify(formData),
        headers: { 'Authorization': AuthService.getSignature(url, 'POST') }
      };

      $.ajax(opts)
        .done(function( data ) {

          // Store the session and token info.
          localStorage.setItem('tokenId', data.tokenId);
          localStorage.setItem('secret', data.secret);

          self.unload();
        })
        .fail(function( data ) {
          var errorMsg = JSON.parse(data.responseText);

          $('#ModalErrorMessages').html(_.first(errorMsg).message);
        });
    }

  });

  return Views;
});