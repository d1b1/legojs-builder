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
			"*actions": "home"
		},
		initialize: function() {
			this.headerView = new HeaderView();
			this.headerView.render();

			this.footerView = new FooterView();
			this.footerView.render();

			// Define the Collections.
			this.search = new Data.Collections.SearchCollection();
			this.pieces = new Data.Collections.ProductCollection();
		},
		home: function() {
			this.homeView = new HomeView();
			this.homeView.render();

      this.pieceView = new Pieces.Table({ collection: this.pieces });
			this.pieceView.render();

			this.searchView = new Search.Form({ collection: this.search });
			this.searchView.render();

			this.searchTable = new Search.Table({ collection: this.search, pieces: this.pieces });
			this.searchTable.render();

		}
	});

	HeaderView = Backbone.View.extend({
		el: "#header",
		templateFileName: "header.html",
		template: headerTpl,

		initialize: function() {
			// $.get(this.templateFileName, function(data){console.log(data);this.template=data});
		},
		render: function() {
			$(this.el).html(_.template(this.template));
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
		// template: "home.html",
		template: homeTpl,
		initialize: function() {

		},
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	app = new ApplicationRouter();
	Backbone.history.start();
});
