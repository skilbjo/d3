var csv = require('csv')
	, s = require('string')
	, inputFile = 'csv/heirarchy_smaller.csv' // , inputFile = process.argv.slice(2)[0] // , outputFile = process.argv.slice(2)[1]
	, fs = require('fs')
	, _ = require('underscore')
	, rl = require('readline').createInterface({
			input: fs.createReadStream(inputFile, {start: 43 /* skip headers */}),
			output: process.stdout
	})
	, graph = [{}];

Array.prototype.pushUnique = function (item){
    if(this.indexOf(item) == -1) {
        this.push(item);
        return true;
    }
    return false;
};

var objectEquals = function (x, y) {
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
}

var containsObject = function(obj, list) {
  for (var i = 0; i < list.length; i++) {
		if (list[i] === obj) {
		  return true;
		}
  }
  return false;
};

var addHierarchy = function(hierarchy) {
	var node = {};
	var level2 = hierarchy[1];
	var parent = hierarchy[1];
	var id = hierarchy[hierarchy.length - 1];
	var children;

	// console.log(id, parent, hierarchy);

	node = {
		id: level2,
		children: [{}]
	};

// console.log(graph.length);

	for (var i = 0; i < graph.length; i++) {
		// console.log(graph[i].id , node.id );
		if ( !objectEquals(graph[i], node) ) {
			graph.pushUnique(node);
		}
	}

	// if (!(node in graph)) {
	// 	graph.push(node);
	// }

	// if (node in graph) {
	// 	node.children = 'children go here';
	// 	graph.pushUnique(node);
	// }


	// for (var key in graph) {
	// 	if (!graph.hasOwnProperty(key)) {
	// 		p.key
	// 	}
	// }

	// for (var key in graph) {
	// 	if (graph.hasOwnProperty(key)) {
	// 		graph.id 
	// 	}
	// }

	// graph.id = id if ()

	// for (var key in graph) {
	// 	if (graph.hasOwnProperty(key)) {
	// 		if ()
	// 	}
	// }

	// if (!graph.hasOwnProperty())

	// if (!(id in graph)) {
	// 	graph.id = id;
	// }

	// graph.map(function(el, i) {
	// 	if (el.id === parent) {
	// 		return false;
	// 	} else {
	// 		graph.id === parent;
	// 	}
	// });

	// graph.push(id);
};

rl.on('line', function(data, graph) {
	var parsedLine = s(data).parseCSV()
		, name = parsedLine[0]
		, id = parsedLine[1]
		, aggregateId = parsedLine[3]
		, hierarchy = aggregateId.split('|')
		;

	addHierarchy(hierarchy);
}).on('close', function() {
	console.log(graph);
	rl.close(); 

});



// var findIndex = function(children, nodeID) {
// 	children.map(function(i) {
// 		if (children[i].id === nodeID) {
// 			return i;
// 		}
// 	});
// };

	// hierarchy.shift();

	// if (hierarchy !== undefined || hierarchy.length !== 0) {
	// 	if (node.children === undefined || node.children.length === 0) {
	// 		node.children = [{}];
	// 		addHierarchy(hierarchy, node.children[0]);
	// 	}
	// } else {
	// 	// node.push([{
	// 	// 	id: id,
	// 	// 	children: children
	// 	// }]);
	// 	// addHierarchy(hierarchy, node);
	// }

	// // if (hierarchy !== []) {
	// // 	graph.id = hierarchy.pop();
	// // 	if ( local_result.children == [] ) {
	// // 		local_result.children = [{}];
	// // 		// addHierarchy(hierarchy, result.children[0]);
	// // 	} 
	// // }

