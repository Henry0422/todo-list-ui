'use client';

import { List } from '@/types/lists';
import { Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import React, { ReactNode } from 'react';

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  // Alternative: use PropsWithChildren
  // const ListboxWrapper = ({ children }: PropsWithChildren)
  // max-w-[260px]
  <div className="w-full m-5 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const generateItems = (items: List[]) => {
  const dataset = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i].name;

    dataset.push({
      label: `${item}`,
      value: `${item.toLowerCase()}`,
    });
  }

  return dataset;
};

const ListNav = ({
  lists,
  onListSelect,
}: {
  lists: List[];
  onListSelect: (id: number) => void;
}) => {
  // onListSelect is a function receiving a number;
  // it does not return anything, so its return typee is void
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(['0']));
  const items = generateItems(lists);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <ListboxWrapper>
        <Listbox
          disallowEmptySelection
          selectedKeys={selectedKeys}
          selectionMode="single"
          onSelectionChange={setSelectedKeys}
          isVirtualized
          className="max-w-xs text-center"
          label={'Select from todo lists'}
          //   placeholder="Select..."
          virtualization={{
            maxListboxHeight: 400,
            itemHeight: 40,
          }}
        >
          {items.map((item, index) => (
            <ListboxItem
              key={index}
              value={item.value}
              onClick={() => {
                const firstKey = Array.from(selectedKeys)[0]; // e.g. "1"
                onListSelect(parseInt(firstKey, 10)); // send as number
              }}
            >
              {item.label}
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>
    </div>
  );
};

export default ListNav;
