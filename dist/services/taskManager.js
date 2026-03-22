import { Task } from "../models/task.js";
// Manages tasks and states
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    // Add new task and increments
    addTask(title) {
        const newTask = new Task(this.nextId, title, false);
        this.tasks.push(newTask);
        this.nextId++;
        return newTask;
    }
    // Update task by Id
    updateTaskById(id, title) {
        let found = false;
        this.tasks = this.tasks.map((task) => {
            if (task.id === id) {
                found = true;
                return new Task(task.id, title, task.isCompleted);
            }
            return task;
        });
        return found;
    }
    // Delete task
    deleteTaskById(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks.length < initialLength;
    }
    // list all tasks
    getAllTasks() {
        return this.tasks;
    }
    // Complete task by Id
    completeTaskById(id) {
        let found = false;
        this.tasks = this.tasks.map((task) => {
            if (task.id === id) {
                found = true;
                return new Task(task.id, task.title, true);
            }
            return task;
        });
        return found;
    }
    // Find task by Id
    findTaskById(id) {
        return this.tasks.find((task) => task.id === id);
    }
}
export { TaskManager };
