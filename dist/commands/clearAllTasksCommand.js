"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearAllTasksCommand = void 0;
// Command to clear all tasks.
// Supports undo by backing up the current state before clearing.
class ClearAllTasksCommand {
    constructor(taskManager) {
        // Stores a backup of all tasks before they are cleared
        this.backup = [];
        this.taskManager = taskManager;
    }
    // Executes the command: Saves the current list of tasks and Clears all tasks from the manager
    execute() {
        this.backup = [...this.taskManager.getAllTasks()]; // Shallow copy
        this.taskManager.clearAllTasks();
    }
    // Undoes the command: Restores the previously saved task list
    undo() {
        this.taskManager.setTasks(this.backup);
    }
}
exports.ClearAllTasksCommand = ClearAllTasksCommand;
