import { Hono } from 'hono'

const app = new Hono()

let todos: string[] = []

app.get('/todos', (c) => {
  return c.json(todos)
})

app.post('/todos', async (c) => {
  const { title } = await c.req.json()
  todos.push(title)
  return c.json({ success: true })
})

export default app
