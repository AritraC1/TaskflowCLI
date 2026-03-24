import { Command } from "./command";

// Undo / Redo
// Manages execution of commands with undo/redo support.
// Implements the Command Pattern by maintaining history stacks.
class CommandManager {
  private undoStack: Command[] = []; // Stack of executed commands (used for undo operations)
  private redoStack: Command[] = []; // Stack of undone commands (used for redo operations)

  // Executes a command, saves it for undo, clears redo history, and returns success status
  executeCommand(command: Command): boolean {
    try {
      command.execute();
      this.undoStack.push(command);
      this.redoStack = [];
      return true;
    } catch (error) {
      return false;
    }
  }

  // Undoes the last executed command and Moves the command from undo stack to redo stack.
  undo(): boolean {
    const command = this.undoStack.pop();
    if (!command) return false;

    command.undo();
    this.redoStack.push(command);
    return true;
  }

  // Redoes the last undone command and Moves the command from redo stack back to undo stack.
  redo(): boolean {
    const command = this.redoStack.pop();
    if (!command) return false;

    command.execute();
    this.undoStack.push(command);
    return true;
  }
}

export { CommandManager };
