var PrefixTree = function(){
  this.children = {};
}

PrefixTree.prototype.addWord = function(word){
  if(word){
    var firstLetter = word[0];
    var remainder = word.slice(1);
    if(!this.children[firstLetter]){
      this.children[firstLetter] = new PrefixTree();
    }
    // console.log(this.children);
    this.children.addWord(remainder);
    // this.children[firstLetter].addWord(remainder);
  } else {
    this.children['end'] = '*'
  }

  return word;
}

var prefix = new PrefixTree();

prefix.addWord('hi');

console.log(
JSON.stringify(prefix, null, ' ')
  );


