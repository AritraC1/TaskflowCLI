"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    // Normal signature with defaults
    constructor(id = 0, title = "", isCompleted = false) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}
exports.Task = Task;
