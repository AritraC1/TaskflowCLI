class Task {
    // Normal signature with defaults
    constructor(id = 0, title = "", isCompleted = false) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}
export { Task };
