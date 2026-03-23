"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteTaskCommand = void 0;
// Command to mark a task as completed
// Supports undo by restoring the task to its previous state.
class CompleteTaskCommand {
    constructor(taskManager, taskId) {
        this.completedTask = null;
        this.taskId = taskId;
        this.taskManager = taskManager;
    }
    // Executes the command: Marks the task as completed and stores it for undo
    execute() {
        this.completedTask = this.taskManager.completeTaskById(this.taskId);
    }
    // Undoes the command: Restores the previously completed task if it exists
    undo() {
        if (this.completedTask) {
            this.taskManager.restoreTask(this.completedTask);
        }
    }
}
exports.CompleteTaskCommand = CompleteTaskCommand;
