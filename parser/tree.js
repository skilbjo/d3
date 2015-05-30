var csv = require('csv')
	, s = require('string')
	, inputFile = process.argv.slice(2)[0]
	, outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, _ = require('underscore')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, tree = [];

if (!inputFile || !outputFile) { console.log('\nPlease use like so: node [input file path] [output file path]\n'); process.exit(1); }

var addHierarchy = function(aggregateId,name) {
	if (aggregateId) {
		var arr = aggregateId.split('|'),
			childId = aggregateId.split('|').reverse()[0];
		arr.reduce(function(children, id) {
			var node, i;
			for (i = 0; i < children.length; i++) {
				if (children[i].id == id) {
					node = children[i];
					break;
				}
			}
				if (!node) {
					children.push(node = {
					id: id,
					children: []
				});
			}
			if (node.id == childId) {
				node.name = name;
			}
			return node.children;
		}, tree);
	}
};

rl.on('line', function(data) {
	var parsedLine = s(data).parseCSV()
		, name = parsedLine[0]
		, aggregateId = parsedLine[2]
		;

	addHierarchy(aggregateId, name);
}).on('close', function() {
	console.log(JSON.stringify(tree,null,' '));
	fs.writeFile(outputFile, JSON.stringify(tree[0],null,' '), function(err){
		if (err) throw err;
		console.log('It\'s saved here: ', outputFile);
	});
	rl.close(); 

});


