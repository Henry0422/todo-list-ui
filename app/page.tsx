import { getAllTodos } from "@/api";
import AddTask from "@/components/AddTask";
import TodoList from "@/components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();


  return (
    <main>
      <div className="text-center my-5 flex flex-col">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask />
      </div>
      <TodoList rows = {tasks} />
    </main>
  );
}
