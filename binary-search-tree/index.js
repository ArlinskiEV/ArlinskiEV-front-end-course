function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node(null);
}

BinarySearchTree.prototype.root = function() {
    return this._root.value;
}

BinarySearchTree.prototype.insert = function(key, value) {
    let node = this._root;

    if (node.key === null) {
      node.key = key;
      node.value = value;
      return this;
    };

    let flag = true;
    let prev = node;
    while ((node !== null)&&(flag)) {
      flag = false;
      if (key < node.key) {
          prev = node;
          node = node.left;
          flag = true;
      }
      if ((!flag)&&(key > node.key)) {
          prev = node;
          node = node.right;
          flag = true;
      }
    }
    if (node === null) {
      node = new Node(key, value);
      if (key < prev.key) {
          prev.left = node;
      } else {
          prev.right = node;
      }
    } else {
      //throw new Error('key is already exist');
      console.log('key is already exist');
    }
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
  student: 'ArlinskiEV'
};
