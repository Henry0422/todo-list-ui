import { Button } from "@heroui/button"
import { AiOutlinePlus } from 'react-icons/ai'

const AddTask = () => {
  return (
    <div>
        <Button className="btn btn-primary" color="secondary">
          Add new task <AiOutlinePlus size={16}/>
        </Button>
    </div>
  )
}

export default AddTask