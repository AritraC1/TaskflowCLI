"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const taskManager_1 = require("../services/taskManager");
const commandManager_1 = require("../commands/commandManager");
const addTaskCommand_1 = require("../commands/addTaskCommand");
const updateTaskCommand_1 = require("../commands/updateTaskCommand");
const deleteTaskCommand_1 = require("../commands/deleteTaskCommand");
const completeTaskCommand_1 = require("../commands/completeTaskCommand");
const clearAllTasksCommand_1 = require("../commands/clearAllTasksCommand");
// Read command-line input
// Parse them
// Call the correct method in taskManager
// Print output to the terminal
const taskManager = new taskManager_1.TaskManager(); // Create instances of task manager (handles data)
const commandManager = new commandManager_1.CommandManager(); // and command manager (handles execution + undo/redo)
function handleCommand(args) {
    const command = args[0];
    switch (command) {
        // Add a new task
        case "add": {
            const title = args.slice(1).join(" ");
            if (!title) {
                console.log("Please provide a task title");
                break;
            }
            const cmd = new addTaskCommand_1.AddTaskCommand(taskManager, title);
            commandManager.executeCommand(cmd);
            if (cmd.createdTask) {
                console.log(`Task added: [${cmd.createdTask.id}] ${cmd.createdTask.title}`);
            }
            break;
        }
        // Update a task
        case "update": {
            const id = Number(args[1]);
            const title = args.slice(2).join(" ");
            if (!id || !title) {
                console.log("Please provide id and new title");
                break;
            }
            const cmd = new updateTaskCommand_1.UpdateTaskCommand(taskManager, id, title);
            commandManager.executeCommand(cmd);
            if (!cmd.previousTask) {
                console.log("Task not found");
            }
            else {
                console.log(`Task updated: [${cmd.previousTask.id}] -> ${title}`);
            }
            break;
        }
        // Delete a task
        case "delete": {
            const id = Number(args[1]);
            if (!id) {
                console.log("Please provide a task number to delete");
                break;
            }
            const cmd = new deleteTaskCommand_1.DeleteTaskCommand(taskManager, id);
            commandManager.executeCommand(cmd);
            if (cmd.deletedTask) {
                console.log("Task deleted successfully");
            }
            break;
        }
        // List of all tasks
        case "all": {
            const tasks = taskManager.getAllTasks();
            if (tasks.length === 0) {
                console.log("No tasks found");
                break;
            }
            tasks.forEach((i) => {
                console.log(`${i.id}. [${i.isCompleted ? "x" : " "}] ${i.title}`);
            });
            break;
        }
        // Complete task
        case "complete": {
            const id = Number(args[1]);
            if (!id) {
                console.log("Please provide a valid task ID");
                break;
            }
            const cmd = new completeTaskCommand_1.CompleteTaskCommand(taskManager, id);
            commandManager.executeCommand(cmd);
            if (cmd.completedTask?.isCompleted) {
                console.log("Task completed successfully");
            }
            else {
                console.log("Unable to complete task");
            }
            break;
        }
        // Find
        case "find": {
            const id = Number(args[1]);
            if (!id) {
                console.log("Please provide a valid task ID");
                break;
            }
            const task = taskManager.findTaskById(id);
            if (!task) {
                console.log("Task not found");
            }
            else {
                console.log(`${task.id}. [${task.isCompleted ? "x" : " "}] ${task.title}`);
            }
            break;
        }
        // Undo
        case "undo": {
            commandManager.undo();
            console.log("Undo performed");
            break;
        }
        // Redo
        case "redo": {
            commandManager.redo();
            console.log("Redo performed");
            break;
        }
        // Clear
        case "clear": {
            const cmd = new clearAllTasksCommand_1.ClearAllTasksCommand(taskManager);
            commandManager.executeCommand(cmd);
            console.log("Task list cleared/reset");
            break;
        }
        case "exit": {
            console.log("Goodbye 👋");
            process.exit(0);
        }
        default:
            console.log("Unknown command, please choose from the given commands");
    }
}
// Creating CLI interface using stdin and stdout
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Recursively prompts user for input
function prompt() {
    rl.question("> ", (input) => {
        // Split input into arguments
        const args = input.trim().split(" ");
        // Handle command
        handleCommand(args);
        // Prompt again
        prompt();
    });
}
// Initial UI messages
console.log("\n==== WELCOME TO TASKFLOW CLI ==== ");
console.log("\nAvailable Commands to Manage Tasks: \n");
console.log("1. add: Add a new task ");
console.log("2. update: Update an existing task from index ");
console.log("3. all: List of all tasks ");
console.log("4. delete: Delete a task by title ");
console.log("5. complete: Complete a task by index ");
console.log("6. find: Find a task by title");
console.log("7. clear: Clears task list");
console.log("8. exit: Exits the app \n\n");
// Start CLI loop
prompt();
