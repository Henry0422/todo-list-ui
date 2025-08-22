'use client';

import React, { useState } from 'react';
import ListNav from './ListNav';
import AddTask from './AddTask';
import TodoList from './TodoList';
import { List } from '@/types/lists';
import { Task } from '@/types/tasks';

const Parent = ({ tasks, lists }: { tasks: Task[], lists : List[] }) => {
  const [sharedData, setSharedData] = useState(0);

  const handleDataFromChild = (data) => {
    setSharedData(data);
  };

  return (
    <div className="flex">
      <div className="w-1/4 my-5 flex flex-col">
        <ListNav lists={lists} onDataSend={handleDataFromChild} />
      </div>
      <div className="w-3/4 my-5 flex flex-col">
        <AddTask listId={sharedData} />
        <div className="my-5">
          <TodoList rows={tasks} data={sharedData} />
        </div>
      </div>
    </div>
  );
};

export default Parent;
