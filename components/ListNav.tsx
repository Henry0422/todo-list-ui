"use client"

import { List } from "@/types/lists";
import {Listbox, ListboxItem, ListboxSection} from "@heroui/react";

const ListboxWrapper = ({children}) => (
    // max-w-[260px]
    <div className="w-full m-5 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        {children}
    </div>
);

const generateItems = (items) => {
    const dataset = [];

    for (let i = 0; i < items.length; i++) {
    const item = items[i].name;

    dataset.push({
        label: `${item}`,
        value: `${item.toLowerCase()}`,
        description: "Sample description",
    });
    }

    return dataset;
};

const ListNav = ({lists} : {lists : List[]}) => {
//   const items = generateItems(100);
    const items = generateItems(lists);

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <ListboxWrapper>
            <Listbox
                isVirtualized
                className="max-w-xs text-center"
                label={"Select from 10000 items"}
                //   placeholder="Select..."
                virtualization={{
                maxListboxHeight: 400,
                itemHeight: 40,
                }}
            >
                {items.map((item, index) => (
                <ListboxItem key={index} value={item.value}>
                    {item.label}
                </ListboxItem>
                ))}
            </Listbox>
            </ListboxWrapper>
        </div>
    )
}

export default ListNav