import { Command } from "./command";

// Undo / Redo
// Manages execution of commands with undo/redo support.
// Implements the Command Pattern by maintaining history stacks.
class CommandManager {
  private undoStack: Command[] = []; // Stack of executed commands (used for undo operations)
  private redoStack: Command[] = []; // Stack of undone commands (used for redo operations)

  // Executes a command and stores it in the undo stack and also clears the redo stack since new actions invalidate redo history.
  executeCommand(command: Command): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  // Undoes the last executed command and Moves the command from undo stack to redo stack.
  undo(): void {
    const command = this.undoStack.pop();
    if (!command) return;

    command.undo();
    this.redoStack.push(command);
  }

  // Redoes the last undone command and Moves the command from redo stack back to undo stack.
  redo(): void {
    const command = this.redoStack.pop();
    if (!command) return;

    command.execute();
    this.undoStack.push(command);
  }
}

export { CommandManager };
