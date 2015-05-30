module.exports = function(
  app,
	// model,
	controller
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );

// Purchases ======================
  // RESTful API ==================
  app.route('/merchants')
    .get(function(req, res) { controller.merchants.new(req, res); }) ;

  app.route('/tricity')
    .get(function(req, res) { controller.merchants.new2(req, res); }) ;

};
