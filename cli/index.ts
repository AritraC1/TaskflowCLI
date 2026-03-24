import readline from "readline";

import { TaskManager } from "../services/taskManager";
import { CommandManager } from "../commands/commandManager";
import { AddTaskCommand } from "../commands/addTaskCommand";
import { UpdateTaskCommand } from "../commands/updateTaskCommand";
import { DeleteTaskCommand } from "../commands/deleteTaskCommand";
import { CompleteTaskCommand } from "../commands/completeTaskCommand";
import { ClearAllTasksCommand } from "../commands/clearAllTasksCommand";

// Entry point for CLI-based task management
// Responsibilities:
// - Read user input
// - Parse commands
// - Execute appropriate command
// - Print results to terminal

const taskManager = new TaskManager(); // Create instances of task manager (handles data)
const commandManager = new CommandManager(); // and command manager (handles execution + undo/redo)

// Parses user input and executes the corresponding command
function handleCommand(args: string[]) {
  const command = args[0]; // First word is the command keyword

  switch (command) {
    // Add a new task
    case "add": {
      const title = args.slice(1).join(" "); // Remaining words form the task title

      if (!title) {
        console.log("Please provide a task title");
        break;
      }

      // Create and execute add command
      const cmd = new AddTaskCommand(taskManager, title);
      commandManager.executeCommand(cmd);

      // Display created task info
      if (cmd.createdTask) {
        console.log(
          `Task added: [${cmd.createdTask.id}] ${cmd.createdTask.title}`,
        );
      }
      break;
    }

    // Update an existing task
    case "update": {
      const id = Number(args[1]);
      const title = args.slice(2).join(" ");

      if (!id || !title) {
        console.log("Please provide id and new title");
        break;
      }

      // Create and execute update command
      const cmd = new UpdateTaskCommand(taskManager, id, title);
      commandManager.executeCommand(cmd);

      // Check if task existed before update
      if (!cmd.previousTask) {
        console.log("Task not found");
      } else {
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

      // Create and execute delete command
      const cmd = new DeleteTaskCommand(taskManager, id);
      commandManager.executeCommand(cmd);

      // Confirm deletion
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

      // Print each task with status
      tasks.forEach((i) => {
        console.log(`${i.id}. [${i.isCompleted ? "x" : " "}] ${i.title}`);
      });
      break;
    }

    // Mark a task as completed
    case "complete": {
      const id = Number(args[1]);

      if (!id) {
        console.log("Please provide a valid task ID");
        break;
      }

      // Create and execute complete task command
      const cmd = new CompleteTaskCommand(taskManager, id);
      commandManager.executeCommand(cmd);

      const updatedTask = taskManager.findTaskById(id);

       // Verify completion
      if (updatedTask?.isCompleted) {
        console.log("Task completed successfully");
      } else {
        console.log("Unable to complete task");
      }
      break;
    }

    // Find a specific task
    case "find": {
      const id = Number(args[1]);

      if (!id) {
        console.log("Please provide a valid task ID");
        break;
      }

      const task = taskManager.findTaskById(id);

      if (!task) {
        console.log("Task not found");
      } else {
        console.log(
          `${task.id}. [${task.isCompleted ? "x" : " "}] ${task.title}`,
        );
      }
      break;
    }

    // Undo last command
    case "undo": {
      commandManager.undo();
      console.log("Undo performed");
      break;
    }

    // Redo last undone command
    case "redo": {
      commandManager.redo();
      console.log("Redo performed");
      break;
    }

    // Clear all tasks
    case "clear": {
      // Create and execute clear all tasks command
      const cmd = new ClearAllTasksCommand(taskManager);
      commandManager.executeCommand(cmd);

      console.log("Task list cleared/reset");
      break;
    }

    // Exit application
    case "exit": {
      console.log("Goodbye 👋");
      process.exit(0);
    }

    default:
      console.log("Unknown command, please choose from the given commands");
  }
}

// Create CLI interface using standard input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Recursively prompts user for input (keeps CLI running)
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

// Initial welcome message
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
