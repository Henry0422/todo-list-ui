import { Task } from "@/types/tasks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
} from "@heroui/react";
import { getLocalTimeZone, parseAbsolute, today } from "@internationalized/date";
import React, { useEffect, useState } from 'react';

interface EditPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => boolean | void;
  task: Task | null;
}

const EditPopup: React.FC<EditPopupProps> = ({ isOpen, onOpenChange, task}) => {
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [dueDateValue, setDueDateValue] = useState<any>(null);

    useEffect(() => {
      if (task) {
        setTitleValue(task.title ?? "");
        setDescriptionValue(task.description ?? "");

        // Convert ISO string to CalendarDateTime
        if (task.dueDate) {
          const parsed = parseAbsolute(task.dueDate, getLocalTimeZone());
          setDueDateValue(parsed);
        } else {
          setDueDateValue(null);
        }
      }
    }, [task]);

    const handleSubmitNewTodo = async () => {
      try {
        let dueDateIso: string | null = null;

        if (dueDateValue) {
          // Convert CalendarDateTime → JS Date → ISO string
          const jsDate = dueDateValue.toDate(getLocalTimeZone());
          dueDateIso = jsDate.toISOString();
        }

        const res = await fetch(`http://localhost:3001/tasks/${task?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
          dueDate: dueDateIso,
          listId: task?.listId
        })
      });

      // close modal
      onOpenChange(false);
      } catch (err) {
        console.error('Error updating task:', err);
      }
    }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Update task</ModalHeader>
            <ModalBody>
              <div className="modal-action">
                <Input
                  isRequired
                  label="Title"
                  name="title"
                  placeholder="Enter a title"
                  value={titleValue}
                  onChange={e => setTitleValue(e.target.value)}
                />
                <Input
                  label="Description"
                  name="description"
                  placeholder="Optional"
                  value={descriptionValue}
                  onChange={e => setDescriptionValue(e.target.value)}
                />
                <DatePicker
                  hideTimeZone
                  isRequired
                  showMonthAndYearPickers
                  label="Due Date"
                  value={dueDateValue}
                  onChange={(date) => {
                    if (date)
                      setDueDateValue(date);
                  }}
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
  );
}

export default EditPopup;
export const usePopup = useDisclosure;