<template>
    <div class="flex justify-center p-8">
        <h1 class="text-5xl text-gray-700 font-bold mb-4">Todoアプリ</h1>
    </div>
    <div class="flex justify-center p-8">
        <input
            v-model="test"
            type="text"
            placeholder="Todoを記載..."
            class="bg-white text-black placeholder-gray-500 p-2 rounded-md border border-gray-300">
        <div class="m-2">
            <UButton color="primary" @click="addTodo">追加</UButton>
        </div>
    </div>
    <div class="flex justify-center p-8">
        <ul>
            <li v-for="todo in todos" :key="todo.id" class="text-gray-700 text-lg flex items-center">
                <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" class="mr-2 h-5 w-5 !bg-white" />
                {{ todo.text }}
                <button @click="deleteTodo(todo.id)" class="ml-2">🗑️</button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { type Todo } from '../types/todo'
    const test = ref('')
    const todos = ref<Todo[]>([])

    onMounted(async () => {
        await fetchTodos()
    })

    const fetchTodos = async () => {
        const res = await fetch('http://localhost:3001/todos')
        const data = await res.json() as Todo[]
        todos.value = data
    }

    const addTodo = async () => {
        const id = String(Math.random());
        const res = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: test.value, id })
        })
        const newTodo = await res.json() as Todo
        todos.value.push(newTodo)
        test.value = ''
        await fetchTodos()
    }

    const updateTodo = async (todo: Todo) => {
        await fetch(`http://localhost:3001/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        console.log('Updating todo:', todo);
    }

    const deleteTodo = async (id: string) => {
        console.log('Deleting todo with id:', id);
        await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            todos.value = todos.value.filter(todo => todo.id !== id);
            fetchTodos();
        })
        .catch(error => console.error('Error deleting todo:', error));
    }
</script>
