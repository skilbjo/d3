var csv = require('csv')
	, inputFile = process.argv.slice(2)[0]
	, outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, rd = require('readline').createInterface({
			input: fs.createReadStream(inputFile),
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




// fWriter	= File.open(ARGV[1], 'w')
// source	= CSV.read(ARGV[0])
// @graph	= {}
// @nameStr = String.new
// @count = 0
