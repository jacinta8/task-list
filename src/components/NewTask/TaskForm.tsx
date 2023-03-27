import { useRef } from "react"
import React from "react"
import classes from "./TaskForm.module.css"

type TaskFormProps = {
  onEnterTask: (taskText: string) => Promise<void>
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  const taskInputRef = useRef<HTMLInputElement | null>(null)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const enteredValue: string | undefined = taskInputRef.current!.value

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue)
    }
    taskInputRef.current!.value = ""
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  )
}

export default TaskForm
