"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Create an absolute path to the tasks.json file in the current working directory
const filePath = path_1.default.join(process.cwd(), "tasks.json");
class FileHandler {
    // Load tasks from JSON file
    loadTasks() {
        try {
            if (!fs_1.default.existsSync(filePath)) {
                fs_1.default.writeFileSync(filePath, "[]");
            }
            const data = fs_1.default.readFileSync(filePath, "utf-8");
            return JSON.parse(data || "[]");
        }
        catch (error) {
            console.error("Error reading tasks:", error);
            return [];
        }
    }
    // Save tasks to the JSON file
    saveTask(tasks) {
        try {
            fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        }
        catch (error) {
            console.error("Error saving tasks:", error);
        }
    }
}
exports.FileHandler = FileHandler;
