import Section from "../UI/Section"
import TaskForm from "./TaskForm"
import useHttp from "../../hook/use-http"

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTask } = useHttp()

  const enterTaskHandler = async (taskText) => {
    const fetchData = (data) => {
      const generatedId = data.name // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText }
      props.onAddTask(createdTask)
    }

    sendTask(
      {
        url: "https://add-tasks-4062b-default-rtdb.firebaseio.com/.json",
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
