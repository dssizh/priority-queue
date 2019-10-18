const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {	
		if (!this.isEmpty()) {
			let detach = this.detachRoot();
			this._size--;
			this.restoreRootFromLastInsertedNode(detach);
			if (this.root != null) {
				this.shiftNodeDown(this.root);
			}
			return detach.data;
		}
	}

	detachRoot() {
		let root = this.root;
		this.root = null;
		let indexOfRoot = this.parentNodes.indexOf(root);
		if (indexOfRoot != -1) {
			this.parentNodes.splice(indexOfRoot, 1);
		}
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastInsert = this.parentNodes.pop();
		if (lastInsert != undefined) {
			if (detached.left != lastInsert) {
				lastInsert.left = detached.left;
				if (detached.left != null) {
					detached.left.parent = lastInsert;
				}
			}
			if (detached.right != lastInsert) {
				lastInsert.right = detached.right;
				if (detached.right != null) {
					detached.right.parent = lastInsert;
				}
			}

			if (lastInsert.parent != null&&lastInsert.parent != detached) {
				if (lastInsert.parent.right == lastInsert) {
					lastInsert.parent.right = null;
					this.parentNodes.unshift(lastInsert.parent);
				} else if (lastInsert.parent.left == lastInsert) {
					lastInsert.parent.left = null;
				}
			} 


			this.root = lastInsert;
			if (this.root.right == null) {
				this.parentNodes.unshift(this.root);
			} 

			lastInsert.parent = null;
		}
	}

	size() {
		return this._size;
	}

	isEmpty() {
		if (this._size == 0) {
			return true;
		} else return false;
	}

	clear() {
		this._size = 0;
		this.root = null;
		this.parentNodes = [];
		
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
		} else {
			let n = this.parentNodes[0];
			n.appendChild(node);
			if (n.right != null) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
		this._size++;
	}

	shiftNodeUp(node) {
		if ((node.parent != null)&&(node.priority > node.parent.priority)) {
	
			let p = node.parent;
			let indexOfParent = this.parentNodes.indexOf(p);
			let indexOfNode = this.parentNodes.indexOf(node);
			
			node.swapWithParent();
			let index = this.parentNodes.indexOf(node);
			if (indexOfParent != -1) {
				this.parentNodes[indexOfParent] = node;
			}
			this.parentNodes[indexOfNode] = p;
			if (p == this.root) {
				this.root = node;
			}

			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {

		let child = null;
		if ((node.left != null&&node.right != null&&node.priority<node.left.priority&&node.left.priority > node.right.priority)
			|| (node.right === null&&node.left != null&&node.priority<node.left.priority)) {
				child = node.left;
		} else if ((node.left != null&&node.right != null&&node.priority<node.right.priority&&node.left.priority < node.right.priority)
			|| (node.left === null&&node.right!=null&&node.priority<node.right.priority)) {
				child = node.right;
			}

			if (child != null) {

			let indexOfChild = this.parentNodes.indexOf(child);
			let indexOfNode = this.parentNodes.indexOf(node);
			
			child.swapWithParent();

			if (child.parent === null) {
				this.root = child;
			}
			
			if (indexOfChild != -1) {
				this.parentNodes[indexOfChild] = node;
				if (indexOfNode != -1) {
					this.parentNodes[indexOfNode] = child;	
				}
			}
			
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
