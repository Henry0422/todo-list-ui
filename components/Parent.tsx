'use client';

import React, { useState } from 'react';
import ListNav from './ListNav';
import AddTask from './AddTask';
import TodoList from './TodoList';
import { List } from '@/types/lists';
import { Task } from '@/types/tasks';

const Parent = ({ tasks: initialTasks, lists }: { tasks: Task[], lists : List[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sharedData, setSharedData] = useState<number>(0);

  const handleDataFromChild = (data: number) => {
    setSharedData(data);
  };

  // function for Popup to call when a new task is created
  const handleTaskAdded = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="flex">
      <div className="w-1/4 my-5 flex flex-col">
        <ListNav lists={lists} onListSelect={handleDataFromChild} />
      </div>
      <div className="w-3/4 my-5 flex flex-col">
        <AddTask listId={sharedData} onTaskAdded={handleTaskAdded} />
        <div className="my-5">
          <TodoList rows={tasks} selectedListId={sharedData} />
        </div>
      </div>
    </div>
  );
};

export default Parent;
