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
    return this._root.value;
}

BinarySearchTree.prototype.insert = function(key, value) {

    return this;
}
BinarySearchTree.prototype.delete = function(key) {
    return this;
}
BinarySearchTree.prototype.search = function(key) {
    let node = this._root;
    while (node !== null) {
      if (key === node.key) return node.value;
      if (key < node. key) {
        node = node.left;
      } else {
        node = node.right
      }
    }

    return false;
}

Node.prototype.contains = function(value) {
    if (this === null) return false;
    if (this.value === value) {
      return true;
    } else {
      return this.left.contains(value)||this.right.contains(value);
    }
}
BinarySearchTree.prototype.contains = function(value) {
    let node = this._root;
    return node.contains(value);
}
BinarySearchTree.prototype.traverse = function(order) {
    return this;
}
BinarySearchTree.prototype.verify = function() {
    return this;
}








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
