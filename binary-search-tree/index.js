function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node(null, null);
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
    let node = this._root;
    let prev = node;

    while ((node !== null)&&(key !== node.key)) {
      if (key < node. key) {
          prev = node;
          node = node.left;
      } else {
          prev = node;
          node = node.right
      }
    }
    let isRoot = (prev === node);
    if (node) {
        if ((!node.left)&&(!node.right)) {//both child null
            if (key < prev.key) {
                prev.left = null;
            } else {
                prev.right = null;
            }
            node = null;
            if (isRoot) {
                this._root = new Node(null, null);
            }
        } else if ((node.left)&&(node.right)) { //both child != null
            if (!node.right.left) {
                //Если левый узел m правого поддерева отсутствует (n->right->left)
                //Копируем из правого узла в удаляемый
                //поля K, V и ссылку на правый узел правого потомка.
                node.key = node.right.key;
                node.value = node.right.value;
                node.right = node.right.right;
            } else {
                //Возьмём самый левый узел m, правого поддерева n->right;
                //Скопируем данные (кроме ссылок на дочерние элементы) из m в n;
                //Рекурсивно удалим узел m.
                let temp = node.right;
                while (temp.left.left) {
                    temp = temp.left;
                }
                node.key = temp.left.key;
                node.value = temp.left.value;
                temp.left = null;
            }



        } else {//one child === null
            if (key < prev.key) {
                prev.left = node.left?node.left:node.right;
            } else {
                prev.right = node.left?node.left:node.right;
            }
        }
    }
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

    return null;
}

Node.prototype.contains = function(value) {
    if (this === null) return false;
    if (this.value === value) {
      return true;
    } else {
      return ((this.left?this.left.contains(value):false)||
        (this.right?this.right.contains(value):false));
    }
}

BinarySearchTree.prototype.contains = function(value) {
    let node = this._root;
    if (node === null) return false;
    return node.contains(value);
}

BinarySearchTree.prototype.traverse = function(order) {
    return this;
}

Node.prototype.verify = function() {
    if (this === null) return true;
    if (((this.left)&&(this.left.key >= this.key))||
        ((this.right)&&(this.right.key <= this.key))) {
      return false;
    } else {
      return ((this.left?this.left.verify():true)&&
        (this.right?this.right.verify():true));
    }
}

BinarySearchTree.prototype.verify = function() {
    let node = this._root;
    if (node === null) return true;
    return node.verify();
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
