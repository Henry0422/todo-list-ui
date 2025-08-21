import { List } from "./types/lists";
import { Task } from "./types/tasks";

const baseUrl = 'http:localhost:3001';

export const getAllTodos = async (): Promise<Task[]> => {
    const res = await fetch(`${baseUrl}/tasks`);
    const todos = await res.json();
    return todos;
}

export const getAllLists = async (): Promise<List[]> => {
    const res = await fetch(`${baseUrl}/lists`);
    const lists = await res.json();
    return lists;
}