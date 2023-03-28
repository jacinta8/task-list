import { rest } from "msw"

export const handlers = [
  rest.get(
    "https://add-tasks-4062b-default-rtdb.firebaseio.com/task.json",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { id: "a", text: "list1" },

          { id: "b", text: "list2" },
          { id: "c", text: "list3" },
        ])
      )
    }
  ),

  rest.post(
    "https://add-tasks-4062b-default-rtdb.firebaseio.com/task.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ add: "task added!" }))
    }
  ),

  rest.delete(
    "https://add-tasks-4062b-default-rtdb.firebaseio.com/task.json",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ remove: "task removed!" }))
    }
  ),
]
