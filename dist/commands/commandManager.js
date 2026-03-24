"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
// Undo / Redo
// Manages execution of commands with undo/redo support.
// Implements the Command Pattern by maintaining history stacks.
class CommandManager {
    constructor() {
        this.undoStack = []; // Stack of executed commands (used for undo operations)
        this.redoStack = []; // Stack of undone commands (used for redo operations)
    }
    // Executes a command and stores it in the undo stack and also clears the redo stack since new actions invalidate redo history.
    executeCommand(command) {
        try {
            command.execute();
            this.undoStack.push(command);
            this.redoStack = [];
            return true;
        }
        catch (error) {
            return false;
        }
    }
    // Undoes the last executed command and Moves the command from undo stack to redo stack.
    undo() {
        const command = this.undoStack.pop();
        if (!command)
            return false;
        command.undo();
        this.redoStack.push(command);
        return true;
    }
    // Redoes the last undone command and Moves the command from redo stack back to undo stack.
    redo() {
        const command = this.redoStack.pop();
        if (!command)
            return false;
        command.execute();
        this.undoStack.push(command);
        return true;
    }
}
exports.CommandManager = CommandManager;
