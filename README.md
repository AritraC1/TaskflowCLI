# TaskFlow CLI
A terminal-based task manager built with plain TypeScript that supports full undo/redo functionality. This project is designed to deepen understanding of core data structures and design patterns—especially stacks, linked lists, and the Command Pattern.

## Features
- Add, delete, and update tasks
- View all tasks in the terminal
- Undo last action
- Redo undone actions
- Command-based architecture for clean state transitions
- No external frameworks (plain TypeScript)

## Learning Goals
This project focuses on mastering:

**1. Stack**
- Two stacks used for managing undo/redo operations:
    - undoStack
    - redoStack

**2. Linked List**
- Stores tasks efficiently
- Allows dynamic insertions and deletions

**3. Command Pattern**
- Encapsulates actions as objects
- Makes undo/redo possible by reversing commands

## Project Structure

```bash
src/
│
├── models/
│   └── Task.ts
│
├── data-structures/
│   ├── Stack.ts
│   └── LinkedList.ts
│
├── commands/
│   ├── Command.ts
│   ├── AddTaskCommand.ts
│   ├── DeleteTaskCommand.ts
│   └── UpdateTaskCommand.ts
│
├── services/
│   ├── TaskManager.ts
│   └── fileHandler.ts
│
└── cli/
    └── index.ts
```

## CLI Commands
| Command       | Description             |
| ------------- | ----------------------- |
| `add <task>`  | Add a new task          |
| `delete <id>` | Delete a task           |
| `update <id>` | Update a task           |
| `list`        | Show all tasks          |
| `undo`        | Undo last action        |
| `redo`        | Redo last undone action |
| `exit`        | Exit app                |
