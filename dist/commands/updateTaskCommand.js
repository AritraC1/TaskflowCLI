"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskCommand = void 0;
// Command to update a task's title
// Supports undo by storing the previous state of the task.
class UpdateTaskCommand {
    constructor(taskManager, id, newTitle) {
        this.previousTask = null;
        this.taskManager = taskManager;
        this.id = id;
        this.newTitle = newTitle;
    }
    // Executes the command: Retrieves and stores the current task state and Updates the task title if the task exists
    execute() {
        this.previousTask = this.taskManager.findTaskById(this.id) || null;
        if (this.previousTask) {
            this.taskManager.updateTaskById(this.id, this.newTitle);
        }
    }
    // Undoes the command: Restores the task to its previous state if it exists
    undo() {
        if (this.previousTask) {
            this.taskManager.restoreTask(this.previousTask);
        }
    }
}
exports.UpdateTaskCommand = UpdateTaskCommand;
