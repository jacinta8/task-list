import Section from "../UI/Section"
import TaskItem from "./TaskItem"
import classes from "./Tasks.module.css"
import { TaskProps } from "../../App"
import React from "react"
import { RequestConfig, ApplyData } from "../../hook/use-http"

type TasksProps = {
  items: TaskProps
  loading: boolean
  error: string | null
  onFetch?: (
    requestConfig: RequestConfig,
    applyData: ApplyData
  ) => Promise<void>
  onDelete: ApplyData
}

const Tasks = (props: TasksProps) => {
  const onDelete = props.onDelete

  let taskList = <h2>No tasks found. Start adding some!</h2>

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id} onDelete={onDelete} id={task.id}>
            {task.text}
          </TaskItem>
        ))}
      </ul>
    )
  }

  let content: JSX.Element = taskList

  if (props.error) {
    content = <button onClick={() => props.onFetch}>Try again</button>
  }

  if (props.loading) {
    content = <p>"Loading tasks..."</p>
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  )
}

export default Tasks
