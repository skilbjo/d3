var csv = require('csv')
	, args = process.argv.slice(2)
	, inputFile = args[0]
	, outputFile = args[1]
	, fs = require('fs')
	, readFileOptions = {
		encoding: 'utf8',
		flag: 'r'
	}
	, stream = fs.createReadStream(inputFile)
	, readline = require('readline')
	, rd = readline.createInterface({
			input: fs.createReadStream(stream),
			output: outputFile,
			terminal: true
	})
	;

console.log('Use in the following manner: \n',
	'node hierarchy.js [input file] [output file]');

var findIndex = function(children, nodeID) {
	children.map(function(i) {
		if (children[i].id === nodeID) {
			return i;
		}
	});
};

var addHierarchy = function(hierarchy, node) {

};

rd.on('line', function(data) {
	console.log(data);
});

// fs.readFile(inputFile, readFileOptions ,function(err, data) {
// 	console.log(data);
// });



// require "csv"
// require 'pp'
// require 'json'




// fWriter	= File.open(ARGV[1], 'w')
// source	= CSV.read(ARGV[0])
// @graph	= {}
// @nameStr = String.new
// @count = 0
