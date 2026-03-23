"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTaskCommand = void 0;
// Command to add a new task
// Implements the Command pattern to support execute and undo operations.
class AddTaskCommand {
    // Initializes the command with required dependencies
    constructor(taskManager, title) {
        this.createdTask = null;
        this.taskManager = taskManager;
        this.title = title;
    }
    // Executes the command: Creates a new task using TaskManager and stores it
    execute() {
        this.createdTask = this.taskManager.addNewTask(this.title);
    }
    // Undoes the command: Deletes the previously created task if it exists
    undo() {
        if (this.createdTask !== null) {
            this.taskManager.deleteTaskById(this.createdTask.id);
        }
    }
}
exports.AddTaskCommand = AddTaskCommand;
