var csv = require('csv')
	, s = require('string')
	, inputFile = 'csv/heirarchy_smaller.csv' // , inputFile = process.argv.slice(2)[0] // , outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, _ = require('underscore')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, graph = [];

var containsObject = function(obj, list) {
  for (var i = 0; i < list.length; i++) {
		if (list[i] === obj) {
		  return true;
		}
  }
  return false;
};

var findIndex = function(children, id) {
	console.log('sup');
	return children.some(function(el, i) {
		if (el.id === id) {
			return i;
		} else {
			return false;
		}
	});
};

var checkId = function(id, node) {
	return node.some(function(el) {
		return el.id === id;
	});
};

var addHierarchy = function(hierarchy, node) {
	if ( !node || !node.hasOwnProperty('id') ) { 
		node = {
			id: hierarchy[0]
		};
	}

	var children;
	hierarchy.shift();

	if ( (hierarchy.length !== 0) ) {

		if ( !node.hasOwnProperty('children') ) {
			node.children = [{}];
			addHierarchy(hierarchy, node.children[0]);
		} else if ( node.children.length !== 0) {
			index = findIndex(node.children, hierarchy[0]);

			if (index) {
				addHierarchy(hierarchy, node.children[index]);
			} else {
				node.children.push({});
				addHierarchy(hierarchy, node.children[node.children.length - 1]);
			}
		}
		// // level 2
		// if (!checkId(node.id, graph)) {
		// 	graph.push(node);
		// 	addHierarchy(hierarchy, node.children);
		// }
	}
};

rl.on('line', function(data, graph) {
	var parsedLine = s(data).parseCSV()
		, name = parsedLine[0]
		, id = parsedLine[1]
		, aggregateId = parsedLine[3]
		, hierarchy = aggregateId.split('|')
		;

	addHierarchy(hierarchy, graph);
}).on('close', function() {
	console.log(graph);
	rl.close(); 

});


