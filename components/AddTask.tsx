"use client"

import { Button } from "@heroui/react"
import { AiOutlinePlus } from 'react-icons/ai'
import Popup from "./Popup"

const AddTask = () => {

  const {isOpen, onOpen, onOpenChange} = Popup.useModal();

  return (
    <div>
        <Button onPress={onOpen} className="btn btn-primary" color="secondary">
          Add new task <AiOutlinePlus size={16}/>
        </Button>

        <Popup isOpen={isOpen} onOpenChange={onOpenChange}/>
    </div>
  )
}

export default AddTask