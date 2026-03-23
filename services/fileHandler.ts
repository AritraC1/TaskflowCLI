import fs from "fs";
import path from "path";

// Create an absolute path to the tasks.json file in the current working directory
const filePath = path.join(process.cwd(), "tasks.json");

class FileHandler {
  // Load tasks from JSON file
  loadTasks() {
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
      }

      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data || "[]");
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  }

   // Save tasks to the JSON file
  saveTask(tasks: any[]) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }
}

export { FileHandler };
