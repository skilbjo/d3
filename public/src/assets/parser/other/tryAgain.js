var csv = require('csv')
	, s = require('string')
	, inputFile = 'csv/Merchant_Heirarchy.csv' // , inputFile = process.argv.slice(2)[0] // , outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, _ = require('underscore')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, tree = [];

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
		, id = parsedLine[1]
		, aggregateId = parsedLine[3]
		;

	addHierarchy(aggregateId, name);
}).on('close', function() {
	console.log(JSON.stringify(tree,null,' '));
	rl.close(); 

});


