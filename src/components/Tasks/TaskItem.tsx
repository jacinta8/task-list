import classes from "./TaskItem.module.css"
import useHttp from "../../hook/use-http"
import { ApplyData } from "../../hook/use-http"

type TaskItemProps = {
  onDelete: ApplyData

  id: string
  children: React.ReactNode
}

const TaskItem = (props: TaskItemProps) => {
  const { id, onDelete } = props
  const { sendRequest: deleteTasks } = useHttp()

  const deleteTask = async () => {
    await deleteTasks(
      {
        url: `https://add-tasks-4062b-default-rtdb.firebaseio.com/task${id}.json`,
        method: "DELETE",
      },
      () => onDelete(id)
    )
  }
  return (
    <li className={classes.task}>
      {props.children}
      <button onClick={deleteTask} className={classes.remove}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem
