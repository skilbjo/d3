var tree = {
	// Id: 1
	// children: {};
};

var addTree = function(aggregateId){
	if(aggregateId){
		var id = aggregateId.split('|')[0],
			remainder = aggregateId.split('|').slice(1).join('|');
		if(!tree.Id){
			tree.Id = id;
			tree.children = {};
			console.log(tree);
		}
		// tree.children = { Id: '100376', children: {} } 
		if(remainder) {
			console.log(remainder);
			tree.children = addTree(remainder);
		}
	}
};



addTree('1|100376|100377');


console.log(
	tree
	// JSON.stringify(tree, null, ' ')

);

