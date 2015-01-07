require.config({
  paths: {
    'jquery':      'libs/jquery',
	'underscore':  'libs/underscore',
	'backbone':    'libs/backbone',
	'paginator':   'libs/backbone.paginator',
    'backgrid':    'libs/backgrid',
    'backgrid-paginator': 'libs/backgrid-paginator.js',
    'bootstrap':   'js/bootstrap'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: [ 'jquery'],
      exports: 'Backstrap'
    },
    'backbone': {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
	'paginator': {
      deps: [ 'backbone' ],
	  exports: 'Backbone'
    },
    'backgrid': {
      deps: [ 'backbone' ],
      exports: 'Backbone'
    }
  }
});

require(
  [ 'backbone',
	'libs/text!templates/general/header.html',
	'libs/text!home.html',
	'libs/text!builder.html',
	'libs/text!footer.html',
	'libs/text!mine.html',
	'/views/search.js',
	'/views/pieces.js',
	'/data/models.js',
	'/views/products.js',
	'/views/mine.js',
	'libs/text!products.html',
	'/views/authorization.js',
	'/views/login.js',
	'config.js',
	'/views/header.js',
	'/views/about.js',
	'/views/register.js',
	'/views/details.js',
	'/views/password.js',
	'/views/invite.js'
  ],
function(Backbone, headerTpl, homeTpl, builderTpl, footerTpl, myKitsTpl, Search, Pieces, Data, Products, Mine, productListTpl, Authorization, Login, Config, Header, About, Register, Details, Password, Invite) {

    $.fn.serializeObject = function() {
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};

    window.env = 'local';

    var Session = Backbone.Model.extend({
	  url: '/user/current',
	  isloggedIn: function() {
	  	return !_.isUndefined(this.get('username'));
	  }
	});

	window.Session = new Session();

	var AuthService = Authorization(Config.authConfig);

 	Backbone.originalSync = Backbone.sync;
 	Backbone.sync = function (method, model, opts) {
	    var xhr, dfd;
	    dfd = $.Deferred();

		opts.beforeSend = function(xhr, request) {
			// Only send a signed request when we have tokens or we are trying to login.

			if (signature = AuthService.getSignature(request.url, request.type)) {
			  xhr.setRequestHeader('Authorization', signature);
	 		}
		};

	    // opts.success and opts.error are resolved against the deferred object
	    // instead of the jqXHR object.
	    
	    if (opts)
	        dfd.then(opts.success, opts.error);

	    xhr = Backbone.originalSync(method, model, _.omit(opts, 'success', 'error'));

	    // success : forward to the deferred
	    xhr.done(dfd.resolve);

	    // failure : resolve or reject the deferred according to your cases
	    xhr.fail(function() {
	        if (xhr.status === 200 && xhr.responseText === "") {
	            dfd.resolve.apply(xhr, arguments);
	        } else {
	            if (xhr.status === 200 || xhr.status === 302 || xhr.status === 0) {
	                 ('login');
	            }
	            dfd.reject.apply(xhr, arguments);
	        }
	    });

	    // return the promise to add callbacks if necessary
	    return dfd.promise();
	};

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {

        options.url = Config[window.env].url + options.url;
        originalOptions.url = Config[window.env].url + originalOptions.url;

        options.crossDomain ={
            crossDomain: true
        };

        options.xhrFields = {
            withCredentials: false
        };
    });

    $.ajaxSetup({
        cache: false,
        statusCode: {
          401: function(req) {

            // If we got a 401 from a get current user
            // then we do not force a login, since it 
            // is ok to be anonymous.
            
          	if (this.url.match(/user\/current/g)) {
              return;
          	}

            new Login.Form({}).render();
            if (req) req.abort();
          }
        }
    });

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"":             "home",
			"products":     "products",
            "products/:id": "builder",
            "mine":         "mine",
            "about":        "about",
            "register":     "register",
            "details":      "details",
            "password":     "password",
            "invite":       "invite"
		},
		initialize: function() {
			this.headerView = new Header({ model: window.Session });
			this.headerView.render();

			this.footerView = new FooterView();
			this.footerView.render();

			// Define the Collections.
			this.search = new Data.Collections.SearchCollection();
			this.search.productId = this.productId;

			this.pieces = new Data.Collections.ProductCollection();
			this.pieces.productId = this.productId;

			this.products = new Data.Collections.Products();
		},
		home: function() {
			var self = this;

			self.homeView = new HomeView();
			self.homeView.render();
		},
		register: function() {
			var self = this;

			self.registerView = new Register();
			self.registerView.render();
		},
		details: function() {
			var self = this;
			var user = new Data.Models.User({ _id: window.Session.get('_id')});

			user.fetch().then(function() {
				self.detailsView = new Details({ model: user });
				self.detailsView.render();
			});
		},
		password: function() {
			var self = this;
			var user = new Data.Models.User({ _id: window.Session.get('_id')});

			user.fetch().then(function() {
				self.passwordView = new Password({ model: user });
				self.passwordView.render();
			});
		},
		invite: function() {
			var self = this;
			var user = new Data.Models.User({ _id: window.Session.get('_id')});

			user.fetch().then(function() {
				self.inviteView = new Invite({ model: user });
				self.inviteView.render();
			});
		},
		about: function() {
			var self = this;

			self.aboutView = new About();
			self.aboutView.render();
		},
		products: function() {
			var self = this;

      		self.productView = new ProductView();
			self.productView.render();

			this.productListView = new Products.Table({ collection: this.products });
			this.productListView.render();
			this.products.fetch();

			this.productSearchView = new Products.Form({ collection: this.products });
		    this.productSearchView.render();
		},
		mine: function() {
			var self = this;

			this.myProducts = new Data.Collections.MyProducts([], { ownerId: window.Session.get('_id') });

      		self.myProductView = new MineView();
			self.myProductView.render();

			this.myProductListView = new Mine.Table({ collection: this.myProducts });
			this.myProductListView.render();

			this.myProducts.fetch();

		},
		builder: function(id) {
		   var self = this;
		   this.MainProduct = new Data.Models.MainProduct({ id: id });

           // Set the active Product Id.
           this.pieces.productId = id;
		   this.search.productId = id;

		   this.MainProduct.fetch().done(function() {

		     self.builderView = new ProductBuilderView({ model: self.MainProduct, pieces: self.pieces });
		     self.builderView.render();

		     self.pieces.fetch().done(function() {
		       self.pieceView = new Pieces.Table({ collection: self.pieces });
		     });

		     self.searchView = new Search.Form({ collection: self.search, productId: id });
		     self.searchView.render();

		     self.searchTable = new Search.Table({ collection: self.search, pieces: self.pieces, productId: id });
		     self.searchTable.render();
		   })
		}
	});

	FooterView = Backbone.View.extend({
		el: "#footer",
		template: footerTpl,
		render: function() {
			this.$el.html(_.template(this.template));
		}
	});

    HomeView = Backbone.View.extend({
		el: "#content",

		template: homeTpl,

		render: function() {
			var self = this;
         
			$(self.el).html(_.template(self.template));
		}
	});
    
	ProductView = Backbone.View.extend({
		el: "#content",

		template: productListTpl,

		render: function() {
			var self = this;

			$(self.el).html(_.template(self.template));
		}
	});

    MineView = Backbone.View.extend({
		el: "#content",

		template: myKitsTpl,

		render: function() {
			var self = this;

			$(self.el).html(_.template(self.template));
		}
	});

	ProductBuilderView = Backbone.View.extend({
		el: "#content",

		template: builderTpl,

		initialize: function(opts) {
		    if (opts.pieces) {
		    	this.pieces = opts.pieces;
		    }
		},

		numOfPieces: function() {
			this.$el.find('.numOfBricks').html('<b># of Bricks</b>: ' + this.pieces.totalBricks());
			this.$el.find('.numOfPieces').html('<b># of Pieces</b>: ' + this.pieces.totalPieces());
		},

		render: function() {
			var self = this;
         
			$(self.el).html(_.template(self.template, this.model.toJSON()));

			this.pieces.bind('sync', this.numOfPieces, this);
			this.pieces.bind('add', this.numOfPieces, this);
			this.pieces.bind('remove', this.numOfPieces, this);
		}
	});

	app = new ApplicationRouter();

	window.Session.fetch({
	  success: function() {
	    Backbone.history.start();
	  },
	  error: function(err) {
        Backbone.history.start();
	    // TODO: Find a better way to handle this state change.

	    console.log('No active Session. Start in ANON Mode.');
	  }
	});
});
