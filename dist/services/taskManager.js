"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const linkedList_1 = require("../data-structures/linkedList");
const task_1 = require("../models/task");
const fileHandler_1 = require("./fileHandler");
class TaskManager {
    constructor() {
        this.fileHandler = new fileHandler_1.FileHandler();
        this.tasks = new linkedList_1.DoublyLinkedList();
        this.nextId = 1;
        const loadedTasks = this.fileHandler.loadTasks();
        let maxId = 0;
        for (const t of loadedTasks) {
            const task = new task_1.Task(t.id, t.title, t.isCompleted);
            this.tasks.append(task);
            if (t.id > maxId)
                maxId = t.id;
        }
        this.nextId = maxId + 1;
    }
    addNewTask(title) {
        const newTask = new task_1.Task(this.nextId, title, false);
        this.tasks.append(newTask);
        this.nextId++;
        this.fileHandler.saveTask(this.tasks.toArray());
        return newTask;
    }
    addTaskWithId(task) {
        this.tasks.append(task);
        if (task.id >= this.nextId) {
            this.nextId = task.id + 1;
        }
        this.fileHandler.saveTask(this.tasks.toArray());
    }
    updateTaskById(id, title) {
        const node = this.tasks.findById(id);
        if (!node)
            return false;
        node.task = new task_1.Task(node.task.id, title, node.task.isCompleted);
        this.fileHandler.saveTask(this.tasks.toArray());
        return true;
    }
    deleteTaskById(id) {
        const deleted = this.tasks.removeById(id);
        if (deleted) {
            this.fileHandler.saveTask(this.tasks.toArray());
        }
        return deleted;
    }
    getAllTasks() {
        return this.tasks.toArray();
    }
    completeTaskById(id) {
        const node = this.tasks.findById(id);
        if (!node)
            return null;
        node.task = new task_1.Task(node.task.id, node.task.title, true);
        this.fileHandler.saveTask(this.tasks.toArray());
        return node.task;
    }
    findTaskById(id) {
        const node = this.tasks.findById(id);
        return node ? node.task : null;
    }
    findNodeById(id) {
        return this.tasks.findById(id);
    }
    restoreTask(task) {
        const existing = this.tasks.findById(task.id);
        if (existing) {
            existing.task = task;
        }
        else {
            this.tasks.append(task);
        }
        this.fileHandler.saveTask(this.tasks.toArray());
    }
    insertAfter(prevId, task) {
        // Insert at head
        if (prevId === null) {
            const newNode = new linkedList_1.TaskNode(task);
            if (!this.tasks.head) {
                this.tasks.head = this.tasks.tail = newNode;
            }
            else {
                newNode.next = this.tasks.head;
                this.tasks.head.prev = newNode;
                this.tasks.head = newNode;
            }
            this.fileHandler.saveTask(this.tasks.toArray());
            return;
        }
        const prevNode = this.tasks.findById(prevId);
        if (!prevNode)
            return;
        const newNode = new linkedList_1.TaskNode(task);
        newNode.next = prevNode.next;
        newNode.prev = prevNode;
        if (prevNode.next) {
            prevNode.next.prev = newNode;
        }
        else {
            this.tasks.tail = newNode;
        }
        prevNode.next = newNode;
        this.fileHandler.saveTask(this.tasks.toArray());
    }
    clearAllTasks() {
        this.tasks = new linkedList_1.DoublyLinkedList();
        this.fileHandler.saveTask([]);
    }
    setTasks(tasks) {
        this.tasks.fromArray(tasks);
        this.fileHandler.saveTask(this.tasks.toArray());
    }
}
exports.TaskManager = TaskManager;
