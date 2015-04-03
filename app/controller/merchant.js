var 
  fs            = require('fs')
  , request       = require('request')
  , path          = require('path');

// GET, /purchase, new
exports.new = function(req, res) {
  res.render('merchant/merchant');
};

