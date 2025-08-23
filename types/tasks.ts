export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export function formatStatus(status: string): string {
  return status
    .toLowerCase()                 // "in_progress"
    .replace(/_/g, " ")            // "in progress"
    .replace(/\b\w/g, c => c.toUpperCase()); // "In Progress"
}

export interface Task {
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    dueDate: Date
    listId: number
}