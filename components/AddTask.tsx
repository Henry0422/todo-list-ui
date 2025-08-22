'use client';

import { Button } from '@heroui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import Popup from './Popup';

const AddTask = ({ listId, onTaskAdded } : { listId: number, onTaskAdded: (task: any) => void }) => {
  const { isOpen, onOpen, onOpenChange } = Popup.useModal();

  return (
    <div>
      <Button onPress={onOpen} className="btn btn-primary" color="secondary">
        Add new task <AiOutlinePlus size={16} />
      </Button>
      <Popup
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        listId={listId}
        onTaskAdded={onTaskAdded}
      />
    </div>
  );
};

export default AddTask;
