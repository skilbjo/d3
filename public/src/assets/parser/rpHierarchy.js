var csv = require('csv')
	, s = require('string')
	, inputFile = 'csv/heirarchy_smaller.csv' // , inputFile = process.argv.slice(2)[0] // , outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, graph = [{
		id: 1,
		children: []
	}];

var findIndex = function(children, nodeID) {
	children.map(function(i) {
		if (children[i].id === nodeID) {
			return i;
		}
	});
};

var addHierarchy = function(hierarchyArr, companyId, node) {

	// console.log(node);
	if (!node.id) {
		node.id = hierarchyArr[0];
	}

	graph.push({ id: companyId, children: 'recursive here' });

	console.log(graph);
	return graph;

};


rl.on('line', function(data) {
	var parsedLine = s(data).parseCSV()
		, name = parsedLine[0]
		, companyId = parsedLine[1]
		, aggregateId = parsedLine[3]
		, splitAggregateId = aggregateId.split('|');

	addHierarchy(splitAggregateId, companyId, graph);
});


rl.on('end', function() {
	rl.close();
});

