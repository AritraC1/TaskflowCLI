"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskCommand = void 0;
// Command to delete a task
// Supports undo by storing the deleted task and restoring it if needed
class DeleteTaskCommand {
    constructor(taskManager, taskId) {
        this.deletedTask = null;
        this.taskManager = taskManager;
        this.taskId = taskId;
    }
    // Executes the command: Deletes the task and stores it for undo
    execute() {
        this.deletedTask = this.taskManager.deleteTaskById(this.taskId);
    }
    // Undoes the command: Restores the previously deleted task if it exists
    undo() {
        if (this.deletedTask) {
            // Re-add the task with its original data (including ID)
            this.taskManager.addTaskWithId(this.deletedTask);
        }
    }
}
exports.DeleteTaskCommand = DeleteTaskCommand;
