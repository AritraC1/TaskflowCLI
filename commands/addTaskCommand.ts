import { Task } from "../models/task";
import { TaskManager } from "../services/taskManager";
import { Command } from "./command";

// Command to add a new task
// Implements the Command pattern to support execute and undo operations.
class AddTaskCommand implements Command {
  private taskManager: TaskManager;
  private title: string;
  public createdTask: Task | null = null;

  // Initializes the command with required dependencies
  constructor(taskManager: TaskManager, title: string) {
    this.taskManager = taskManager;
    this.title = title;
  }

  // Executes the command: If task already exists (redo case), restore it
  execute(): void {
    if(this.createdTask){
      this.taskManager.addTaskWithId(this.createdTask);
    }
    else {
      this.createdTask = this.taskManager.addNewTask(this.title);
    }
  }

  // Undoes the command: Deletes the previously created task if it exists
  undo(): void {
    if (this.createdTask) {
      this.taskManager.deleteTaskById(this.createdTask.id);
    }
  }
}

export { AddTaskCommand };
