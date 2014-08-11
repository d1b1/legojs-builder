require([
	'libs/text!header.html',
	'libs/text!home.html',
	'libs/text!footer.html',
	'/views/search.js',
	'/views/pieces.js',
	'/data/models.js'
], function (headerTpl, homeTpl, footerTpl, Search, Pieces, Data) {

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "home",
		},
		initialize: function() {
			this.productId = '53bc3c6cc9a1d802009d1432';
			this.MainProduct = new Data.Models.MainProduct({ id: this.productId });

			this.headerView = new HeaderView({ model: this.MainProduct });
			this.headerView.render();

			this.footerView = new FooterView();
			this.footerView.render();

			// Define the Collections.
			this.search = new Data.Collections.SearchCollection();
			this.search.productId = this.productId;

			this.pieces = new Data.Collections.ProductCollection();
			this.pieces.productId = this.productId;
		},
		home: function() {
      var self = this;

      this.MainProduct.fetch().done(function() {

				self.homeView = new HomeView({ model: self.MainProduct });
				self.homeView.render();

        self.pieces.fetch().done(function() {
		      self.pieceView = new Pieces.Table({ collection: self.pieces });
					// self.pieceView.render();
				});

				self.searchView = new Search.Form({ collection: self.search, productId: self.productId });
				self.searchView.render();

				self.searchTable = new Search.Table({ collection: self.search, pieces: self.pieces, productId: self.productId });
				self.searchTable.render();
			})

		}
	});

	HeaderView = Backbone.View.extend({
		el: "#header",
		templateFileName: "header.html",
		template: headerTpl,
		render: function() {
			var self = this;

      $(self.el).html(_.template(self.template));
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
		initialize: function() {

		},
		render: function() {
			var self = this;

			$(self.el).html(_.template(self.template, this.model.toJSON()));
		}
	});

	app = new ApplicationRouter();
	Backbone.history.start();
});
