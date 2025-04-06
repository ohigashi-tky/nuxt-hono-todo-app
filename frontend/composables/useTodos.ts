// frontend/composables/useTodos.ts

export const useTodos = () => {
    const baseUrl = 'http://localhost:3001/api/todos'
  
    const fetchTodos = async () => {
      const res = await fetch(baseUrl)
      return await res.json()
    }
  
    const addTodo = async (title: string) => {
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      return await res.json()
    }
  
    const toggleTodo = async (id: string) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
      })
      return await res.json()
    }
  
    const deleteTodo = async (id: string) => {
      await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      })
    }
  
    return { fetchTodos, addTodo, toggleTodo, deleteTodo }
  }
  