var csv = require('csv')
	, s = require('string')
	, inputFile = 'csv/heirarchy_smaller.csv' // , inputFile = process.argv.slice(2)[0] // , outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, graph = [];

var findIndex = function(children, nodeID) {
	children.map(function(i) {
		if (children[i].id === nodeID) {
			return i;
		}
	});
};

var addHierarchy = function(hierarchy, node) {
	var id = hierarchy[hierarchy.length - 1];
	var children;

	hierarchy.shift();

	if (hierarchy !== undefined || hierarchy.length !== 0) {
		if (node.children === undefined || node.children.length === 0) {
			node.children = [{}];
			addHierarchy(hierarchy, node.children[0]);
		}
	} else {
		// node.push([{
		// 	id: id,
		// 	children: children
		// }]);
		// addHierarchy(hierarchy, node);
	}

	// if (hierarchy !== []) {
	// 	graph.id = hierarchy.pop();
	// 	if ( local_result.children == [] ) {
	// 		local_result.children = [{}];
	// 		// addHierarchy(hierarchy, result.children[0]);
	// 	} 
	// }
};

rl.on('line', function(data) {
	var parsedLine = s(data).parseCSV()
		, name = parsedLine[0]
		, id = parsedLine[1]
		, aggregateId = parsedLine[3]
		, hierarchy = aggregateId.split('|');

	addHierarchy(hierarchy, graph);
}).on('close', function() {
	rl.close(); process.exit(0);
	return graph;
});

