import Section from "../UI/Section"
import TaskForm from "./TaskForm"
import useHttp from "../../hook/use-http"
import { TaskProps } from "../../App"
import React from "react"
import { ApplyData } from "../../hook/use-http"

type NewTaskProp = {
  onAddTask: (tasks: TaskProps) => void
}

type DataProps = {
  name: string
}

const NewTask = (props: NewTaskProp) => {
  const { isLoading, error, sendRequest: sendTask } = useHttp()

  const enterTaskHandler = async (taskText: string) => {
    const fetchData: ApplyData = (data: DataProps) => {
      const generatedId = data.name // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText }
      props.onAddTask(createdTask)
    }

    sendTask(
      {
        url: "https://add-tasks-4062b-default-rtdb.firebaseio.com/task.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      fetchData
    )
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask
