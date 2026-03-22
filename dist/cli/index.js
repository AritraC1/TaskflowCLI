// Command Line Interface for Taskflow
import { TaskManager } from "../services/taskManager.js";
// Read command-line input
// Parse them
// Call the correct method in taskManager
// Print output to the terminal
console.log("\n==== WELCOME TO TASKFLOW CLI ==== ");
console.log("\nAvailable Commands to Manage Tasks: \n");
console.log("1. add: Add a new task ");
console.log("2. update: Update an existing task from index ");
console.log("3. all: List of all tasks ");
console.log("4. delete: Delete a task by title ");
console.log("5. complete: Complete a task by index ");
console.log("6. find: Find a task by title \n\n");
const taskManager = new TaskManager();
const args = process.argv.splice(2);
const command = args[0];
switch (command) {
    // Add
    case "add": {
        const title = args[1];
        if (!title) {
            console.log("❌ Please provide a task title");
            break;
        }
        const task = taskManager.addTask(title);
        console.log(`✅ Task added: [${task.id}] ${task.title}`);
        break;
    }
    // Update
    case "update": {
        const id = Number(args[1]);
        const title = args[2];
        if (!id || !title) {
            console.log("❌ Please provide id and new title");
            break;
        }
        const success = taskManager.updateTaskById(id, title);
        console.log(success ? "✏️Task updated" : "❌  Unable to update");
        break;
    }
    // Delete
    case "delete": {
        const id = Number(args[1]);
        if (!id) {
            console.log("❌ Please provide a task number to delete");
            break;
        }
        const success = taskManager.deleteTaskById(id);
        console.log(success ? "🗑️ Task deleted" : "❌ Task not found");
        break;
    }
    // all
    case "all": {
        const tasks = taskManager.getAllTasks();
        // No tasks
        if (tasks.length === 0) {
            console.log("📭 No tasks found");
            break;
        }
        // All Tasks
        tasks.forEach((i) => {
            console.log(`{i.id}. [${i.isCompleted ? "x" : " "}] ${i.title}`);
        });
    }
    // complete
    case "complete": {
        const id = Number(args[1]);
        if (!id) {
            console.log("❌ Please provide a valid task ID");
            break;
        }
        const success = taskManager.completeTaskById(id);
        console.log(success ? "✅ Task completed" : "❌ Task not found");
        break;
    }
    case "find": {
        const id = Number(args[1]);
        if (!id) {
            console.log("❌ Please provide a valid task ID");
            break;
        }
        const task = taskManager.findTaskById(id);
        if (!task) {
            console.log("❌ Task not found");
        }
        else {
            console.log(`${task.id}. [${task.isCompleted ? "x" : " "}] ${task.title}`);
        }
        break;
    }
    default:
        console.log("❌ Unknown command");
        console.log("Commands: add, all, complete, delete, find, update");
}
