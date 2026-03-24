"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = exports.TaskNode = void 0;
class TaskNode {
    constructor(task, prev = null, next = null) {
        this.task = task;
        this.prev = prev;
        this.next = next;
    }
}
exports.TaskNode = TaskNode;
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(task) {
        const newNode = new TaskNode(task);
        if (!this.head) {
            this.head = this.tail = newNode;
            return;
        }
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }
    findById(id) {
        let curr = this.head;
        while (curr) {
            if (curr.task.id === id)
                return curr;
            curr = curr.next;
        }
        return null;
    }
    removeById(id) {
        const node = this.findById(id);
        if (!node)
            return null;
        // Single node case
        if (node === this.head && node === this.tail) {
            this.head = this.tail = null;
        }
        // Head
        if (node === this.head) {
            this.head = node.next;
            if (this.head) {
                this.head.prev = null;
            }
        }
        // Tail
        else if (node === this.tail) {
            this.tail = node.prev;
            if (this.tail) {
                this.tail.next = null;
            }
        }
        // Middle
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        return node.task;
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.task);
            current = current.next;
        }
        return result;
    }
    fromArray(tasks) {
        this.head = this.tail = null;
        for (const task of tasks) {
            this.append(task);
        }
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
