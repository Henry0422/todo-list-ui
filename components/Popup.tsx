"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { FormEventHandler, useEffect, useState } from "react"

interface PopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => boolean | void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onOpenChange }) => {
  const [titleValue, setTitleValue] = useState('')

  const handleSubmitNewTodo= async () => {
    console.log(titleValue);

    try {
    const res = await fetch(`http://localhost:3001/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleValue,
        description: 'description',
        dueDate: new Date()
      })
    });

    const json = await res.json();
    console.log('Response:', json);
    setData((prev) => [...prev, json]); // Add new task to state
  } catch (err) {
    console.error('Error creating task:', err);
  }
    setTitleValue("");
  }

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <h3 className="font-bold text-lg">Add new task</h3>
                <div className="modal-action">
                  <Input
                    value={titleValue}
                    onChange={e => setTitleValue(e.target.value)}
                    isRequired
                    label="Title"
                    labelPlacement="outside"
                    name="title"
                    placeholder="Enter a title"
                  />
                  <Input
                    label="Description"
                    labelPlacement="outside"
                    name="description"
                    placeholder="Description"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmitNewTodo}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
    </Modal>
  )
}

export default Popup
Popup.useModal = useDisclosure;