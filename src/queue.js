const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = (maxSize == null) ? 30 : maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap._size < this.maxSize) {
			this.heap.push(data, priority);
		} else throw Error();

		
	}

	shift() {
		if (this.heap.isEmpty()) {
			throw Error();
		} else {
			return this.heap.pop();
		}
	}

	size() {
		return this.heap._size;
	}

	isEmpty() {
		if (this.heap.isEmpty()){
			return true;
		} else return false;
	}
}

module.exports = PriorityQueue;
