import { Task } from "../models/task";
import { TaskManager } from "../services/taskManager";
import { Command } from "./command";

// Command to update a task's title
// Supports undo by storing the previous state of the task.
class UpdateTaskCommand implements Command {
  private taskManager: TaskManager;
  private id: number;
  private newTitle: string;
  public previousTask: Task | null = null;

  constructor(taskManager: TaskManager, id: number, newTitle: string) {
    this.taskManager = taskManager;
    this.id = id;
    this.newTitle = newTitle;
  }

  // Executes the command: Retrieves and stores the current task state and Updates the task title if the task exists
  execute(): void {
    const task = this.taskManager.findTaskById(this.id);

    this.previousTask = task
      ? new Task(task.id, task.title, task.isCompleted)
      : null;

    if (this.previousTask) {
      this.taskManager.updateTaskById(this.id, this.newTitle);
    }
  }

  // Undoes the command: Restores the task to its previous state if it exists
  undo(): void {
    if (!this.previousTask) return;

    this.taskManager.restoreTask(this.previousTask);
  }
}

export { UpdateTaskCommand };
