var tree = [];

var addTree = function(aggregateId) {
	if (aggregateId) {
		var arr = aggregateId.split('|');
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
			return node.children;
		}, tree);
	}
};


addTree('1|100376|100377');
addTree('1|100376|100377|100378');
addTree('1|100376|100377|100379|100380');
addTree('1|100376');

console.log(JSON.stringify(tree, null, ' '));