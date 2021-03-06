var 
  http            = require('http')
  , flash           = require('connect-flash')
  , express         = require('express')
  , app             = express()
  , morgan          = require('morgan')
  , favicon         = require('serve-favicon')
  , cookieParser    = require('cookie-parser')
  , methodOverride  = require('method-override')
  , session         = require('express-session')
  , errorHandler    = require('errorhandler')
  , bodyParser      = require('body-parser')
  , marked          = require('marked').setOptions({ breaks: true })
  , db              = require('./app/model/index.js')
  , env             = (process.env.NODE_ENV || 'development');

// configuration ==============
  // boilerplate
app.use(cookieParser()); app.use(methodOverride()); app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); app.use(errorHandler()); app.use(morgan('dev'));  app.use(flash());

app.set('port', process.env.PORT || 8080);
app.use(favicon(__dirname + '/public/src/assets/favicon/favicon.ico'));
app.use('/public', express.static('public'));
app.use('/parser', express.static('parser'));
app.use('/bower', express.static('bower_components'));

// view template engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/view');

// models
// app.set('models', require('./app/model'));

// MVC Definitions =============
// models =============
// var model = { 
//   merchants        : app.get('models').Merchants
// };

// controllers ========
var controller = {
  static_pages    : require('./app/controller/static_pages.js') 
  , merchants      : require('./app/controller/merchant.js')
};

// routes =============
require('./app/routes.js')(
  app,
  // , model
  controller
  );

// launch ===================
// db.sequelize.sync({ force: true }).complete(function(err) {
//   if (err) { throw err[0] ; } else {
    // https.createServer(options, app).listen(app.get('port'), function(){ 
      http.createServer(app).listen(app.get('port'), function() {
      console.log('The magic happens on port ' + app.get('port'));
    });
//   }
// });

