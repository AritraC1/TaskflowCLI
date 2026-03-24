"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskCommand = void 0;
const task_1 = require("../models/task");
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
        const task = this.taskManager.findTaskById(this.id);
        this.previousTask = task
            ? new task_1.Task(task.id, task.title, task.isCompleted)
            : null;
        if (this.previousTask) {
            this.taskManager.updateTaskById(this.id, this.newTitle);
        }
    }
    // Undoes the command: Restores the task to its previous state if it exists
    undo() {
        if (!this.previousTask)
            return;
        this.taskManager.restoreTask(this.previousTask);
    }
}
exports.UpdateTaskCommand = UpdateTaskCommand;
