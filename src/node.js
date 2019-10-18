class Node {

	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.left = null;
		this.right = null;
		this.parent = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			this.left.parent = this;
		} else if (this.right === null) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right == node) {
			this.right.parent = null;
			this.right = null;
		} else throw Error();
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {

		if (this.parent != null) {
			let parent = this.parent.parent;
			this.parent.parent = this;
			let left = this.left;
			let right = this.right;
			if (left != null) {
				left.parent = this.parent;
			}
			if (right != null) {
				right.parent = this.parent;
			}
			if (this.parent.left == this) {

				this.left = this.parent;
				this.parent.left = left;
				this.right = this.parent.right;
				if (this.parent.right != null) {
					this.parent.right.parent = this;
					this.parent.right = right;
				}
			} else if (this.parent.right == this) {
				this.right = this.parent;
				this.parent.right = right;
				this.left = this.parent.left;

				if (this.parent.left != null) {
					this.parent.left.parent = this;
					this.parent.left = left;
				}
			}

			if (parent != null) {
				if (this.parent == parent.left) {
					parent.left = this;
				} else if (this.parent == parent.right) {
					parent.right = this;
				}
			}

			this.parent = parent;
		}
	}
}

module.exports = Node;
