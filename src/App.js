import React, { useState, useEffect } from "react"
import useHttp from "./hook/use-http"

import Tasks from "./components/Tasks/Tasks"
import NewTask from "./components/NewTask/NewTask"

function App() {
  const [tasks, setTasks] = useState([])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const fetchData = (data) => {
      const loadedTasks = []

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

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  const deleteTaskHandler = (id) => {
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
