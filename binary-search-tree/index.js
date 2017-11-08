function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

BinarySearchTree.prototype.root = function() {

}





const bst = new BinarySearchTree();
// returns root of the tree;
bst.root();

// stores specified value in tree using key; method should be chainable;
bst.insert(key, value);

// removes node from tree by provided key; method should be chainable;
bst.delete(key);

// looking for stored data in tree using key;
bst.search(key);

// returns whether BST contains such value or not;
bst.contains(value);

// returns ordered sequence of stored values in given oreder (order is boolean)
bst.traverse(order);

// verifies whether tree is well-formed binary search tree or not
bst.verify();















module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'STUDENT NAME'
};
