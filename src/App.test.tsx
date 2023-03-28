import {
  render,
  screen,
  fireEvent,
  findAllByRole,
} from "@testing-library/react"
import App from "./App"
import user from "@testing-library/user-event"

describe("Tasks", () => {
  test("fetch a list of tasks", async () => {
    render(<App />)

    const tasks = await screen.findAllByRole("listitem")

    expect(tasks).toHaveLength(3)
  })

  test("add a new task", async () => {
    render(<App />)

    const inputField = screen.getByRole("textbox")
    const addButton = screen.getByRole("button", { name: /add/i })
    fireEvent.change(inputField, { target: { value: "new task" } })
    fireEvent.click(addButton)
    fireEvent.change(inputField, { target: { value: "another task" } })
    fireEvent.click(addButton)
    screen.debug()
    const tasks = await screen.findAllByRole("listitem")
    expect(tasks).toHaveLength(5)
  })
})
