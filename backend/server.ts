import { Hono } from 'hono'
import { serve } from 'bun'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { type Todo } from '../frontend/types/todo'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors())

let todos: Todo[] = []

const todoSchema = z.object({
  text: z.string(),
})

app.get('/todos', (c) => {
  return c.json(todos)
})

app.post('/todos', zValidator('json', todoSchema), async (c) => {
  const { text } = c.req.valid('json')
  const id = (await c.req.json<{id: string}>()).id;
  const completed = false
  todos.push({ id, text, completed })
  return c.json({ id, text, completed })
})

app.put('/todos/:id', async (c) => {
    const id = c.req.param('id')
    const todo = await c.req.json<Todo>()
    todos = todos.map(t => t.id === id ? todo : t)
    return c.json(todo)
})

app.delete('/todos/:id', (c) => {
    const id = c.req.param('id')
    todos = todos.filter(t => t.id !== String(id))
    return c.json({ message: 'Todo deleted' })
})

serve({
  fetch: app.fetch,
  port: 3001,
})

console.log('🚀 Hono server running on http://localhost:3001')
