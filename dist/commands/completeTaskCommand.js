"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteTaskCommand = void 0;
const task_1 = require("../models/task");
// Command to mark a task as completed
// Supports undo by restoring the task to its previous state.
class CompleteTaskCommand {
    constructor(taskManager, taskId) {
        this.completedTask = null;
        this.afterTask = null;
        this.taskId = taskId;
        this.taskManager = taskManager;
    }
    // Executes the command: Marks the task as completed and stores it for undo
    execute() {
        const task = this.taskManager.findTaskById(this.taskId);
        if (!task)
            return;
        // Store snapshot of task BEFORE completing
        this.completedTask = new task_1.Task(task.id, task.title, task.isCompleted);
        this.afterTask = new task_1.Task(task.id, task.title, true);
        this.taskManager.restoreTask(this.afterTask);
    }
    // Undoes the command: Restores the previously completed task if it exists
    undo() {
        if (!this.completedTask)
            return;
        this.taskManager.restoreTask(this.completedTask);
    }
}
exports.CompleteTaskCommand = CompleteTaskCommand;
