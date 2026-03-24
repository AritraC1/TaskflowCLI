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
    // Executes the command: If task already exists (redo case), restore it
    execute() {
        if (this.createdTask) {
            this.taskManager.addTaskWithId(this.createdTask);
        }
        else {
            this.createdTask = this.taskManager.addNewTask(this.title);
        }
    }
    // Undoes the command: Deletes the previously created task if it exists
    undo() {
        if (this.createdTask) {
            this.taskManager.deleteTaskById(this.createdTask.id);
        }
    }
}
exports.AddTaskCommand = AddTaskCommand;
