import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "tasks.json");

class FileHandler {
  // Load tasks
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

  // Save tasks
  saveTask(tasks: any[]) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }
}

export { FileHandler };
