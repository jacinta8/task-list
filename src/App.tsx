import React, { useState, useEffect } from "react"
import useHttp from "./hook/use-http"

import Tasks from "./components/Tasks/Tasks"
import NewTask from "./components/NewTask/NewTask"
import { ApplyData } from "./hook"

export type TaskProps = {
  id: string
  text: string
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const fetchData: ApplyData = (data: Record<string, TaskProps>) => {
      const loadedTasks: TaskProps[] = []

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text })
      }

      setTasks(loadedTasks)
    }
    fetchTasks(
      { url: "https://add-tasks-4062b-default-rtdb.firebaseio.com/.json" },
      fetchData
    )
  }, [fetchTasks])

  const taskAddHandler = (task: TaskProps) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  const deleteTaskHandler = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDelete={deleteTaskHandler}
      />
    </React.Fragment>
  )
}

export default App
