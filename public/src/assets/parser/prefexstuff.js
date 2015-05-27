var Tree = function(id) {
	this.children = {};
};

Tree.prototype.addTree = function(aggregateId) {
	if(aggregateId){
		var id = aggregateId.split('|')[0],
			remainder = aggregateId.split('|').slice(1).join('|');
		if(!this.children[id]){
			this.children[id] = new Tree();
		}
		this.children[id].addTree(remainder);
	} else {
		// this.children['end'] = '*';
	}
	return aggregateId;
}

var tree = new Tree();

tree.addTree('1|100376|100377');
tree.addTree('1|100376|100377|100378');
tree.addTree('1|100376|100377|100379');
// tree.addTree('1|100376');

console.log(JSON.stringify(tree, null, ' '));