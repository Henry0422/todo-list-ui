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
  DatePicker,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";

interface PopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => boolean | void;
  listId: number;
  onTaskAdded: (task: any) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onOpenChange, listId, onTaskAdded }) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dueDateValue, setDueDateValue] = useState(today(getLocalTimeZone()));
  
  const handleSubmitNewTodo = async () => {
    try {
      let dueDateIso: string | null = null;

      if (dueDateValue) {
        // Convert CalendarDateTime → JS Date → ISO string
        const jsDate = dueDateValue.toDate(getLocalTimeZone());
        dueDateIso = jsDate.toISOString();
      }

      const res = await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
          dueDate: dueDateIso,
          listId: listId+1
        })
      });

      const json = await res.json();

      // update parent
      onTaskAdded(json);

      // reset fields
      setTitleValue("");
      setDescriptionValue("");

      // close modal
      onOpenChange(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new task</ModalHeader>
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
};

export default Popup;
export const usePopup = useDisclosure;