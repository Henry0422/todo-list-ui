import { getAllLists, getAllTodos } from "@/api";
import Parent from "@/components/Parent";

export default async function Home() {
  const tasks = await getAllTodos();
  const lists = await getAllLists();

  return (
    <main>
      <h1 className="text-2xl text-center font-bold">Todo List App</h1>
      <Parent tasks={tasks} lists={lists}/>
    </main>
  );
}
