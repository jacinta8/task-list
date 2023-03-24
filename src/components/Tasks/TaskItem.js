import classes from "./TaskItem.module.css"
import useHttp from "../../hook/use-http"

const TaskItem = (props) => {
  const { id, onDelete } = props
  const { sendRequest: deleteTasks } = useHttp()

  const deleteTask = async () => {
    await deleteTasks({
      url: `https://add-tasks-4062b-default-rtdb.firebaseio.com/${id}.json`,
      method: "DELETE",
    })
    onDelete(id)
  }
  return (
    <li className={classes.task} onClick={deleteTask}>
      {props.children}
    </li>
  )
}

export default TaskItem
