import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TaskItem from "./TaskItem"
const taskId = "1"
const deleteTask = jest.fn()

describe("Tasks", () => {
  test("delete task", async () => {
    render(<TaskItem id={taskId} onDelete={deleteTask} />)

    const button = await screen.findByRole("button", { name: /delete/i })
    fireEvent.click(button)

    await waitFor(() => expect(deleteTask).toHaveBeenCalledWith(taskId))
  })
})
