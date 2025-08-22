"use client"

import { Task } from "@/types/tasks";
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

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "dueDate",
    label: "Due Date",
  },
];

const TodoList = ({rows, data}: { rows: Task[], data: number | null }) => {
  const [filteredRows, setFilteredRows] = useState<Task[]>([]);

  useEffect(() => {
    if (data === null) {
      setFilteredRows(rows); // show all if no list selected
    } else {
      setFilteredRows(rows.filter((task) => task.listId == data + 1));
    }
  }, [rows, data]);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={filteredRows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TodoList;