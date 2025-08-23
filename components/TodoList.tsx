"use client"

import { Task } from "@/types/tasks";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { useEffect, useState } from "react";
import EditPopup, { usePopup } from "./EditPopup";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title"
  },
  {
    key: "description",
    label: "Description"
  },
  {
    key: "status",
    label: "Status" 
  },
  {
    key: "dueDate",
    label: "Due Date",
  },
  { 
    key: "actions",
    label: "Actions" 
  }
];

const TodoList = ({rows, selectedListId}: { rows: Task[], selectedListId: number | null }) => {
  const [filteredRows, setFilteredRows] = useState<Task[]>([]);
  const { isOpen, onOpen, onOpenChange } = usePopup();
  const [taskEdit, setTaskEdit] = useState<Task | null>(null);

  useEffect(() => {
    if (selectedListId === null) {
      setFilteredRows(rows); // show all if no list selected
    } else {
      // Dynamically update table based on the selected todo list
      setFilteredRows(rows.filter((task) => task.listId == selectedListId + 1));
    }
  }, [rows, selectedListId]);

  const handleEdit = async (taskId : string) => {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${taskId}`);
      const json = await res.json();
      setTaskEdit(json);
    } catch (err) {
      console.error('Error getting task:', err);
    }
  }

  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={filteredRows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? (
                    <Button size="sm" onPress={() => {
                      handleEdit(item.id);
                      onOpen();
                    }}>Edit</Button>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
        </TableRow>
          )}
        </TableBody>
      </Table>
      <EditPopup isOpen={isOpen} onOpenChange={onOpenChange} task={taskEdit}/>
    </>


  );
}

export default TodoList;