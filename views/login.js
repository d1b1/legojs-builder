define([
   'backbone',
   'libs/text!templates/login/form.html',
   'jquery',
   'bootstrap',
   '/views/authorization.js',
   'config.js'
], function (Backbone, formTpl, $, Bootstrap, Authorization, Config) {

  var Views = {};

  Views.Form = Backbone.View.extend({

    template: formTpl,
    
    initialize: function() {
      this.isActive = false;
    },

    events: {
      'click .actionButton': 'action'
    },

  	unload: function() {
      $('.modal-backdrop').hide();

      this.isActive = false;
  	  this.unbind();
  	  this.undelegateEvents();
      this.remove();
  	},

    className: 'modal hide fade',

    render: function() {
      var self = this;

      if (!this.isActive) {
        this.isActive = true;
        this.$el.html(this.template);
        this.$el.modal({ show: true }).removeClass('fade').removeClass('hide');

        return this;
      }
    },

    action: function(evt) {
      var self = this;
      var formData = $('#modalForm').serializeObject();

      var AuthService = Authorization(Config.authConfig);
      var url = '/authenticate/accesstoken';

      var opts = {
        url: url,
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify(formData),
        headers: { 'Authorization': AuthService.getSignature(Config[window.env].url + '/authenticate/accesstoken', 'POST') }
      };

      $.ajax(opts)
        .done(function( data ) {

          // Store the session and token info.
          localStorage.setItem('tokenId', data.tokenId);
          localStorage.setItem('secret', data.secret);

          self.$el.modal( { show: false });
          self.unload();

          window.Session.fetch().done(function() {
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        })
        .fail(function( data ) {
          var errorMsg = JSON.parse(data.responseText);

          $('#ModalErrorMessages').html(_.first(errorMsg).message);
        });
    }

  });

  return Views;
});