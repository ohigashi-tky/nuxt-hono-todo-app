<template>
    <div class="flex justify-center p-8">
        <h1 class="text-5xl text-blue-500 font-bold mb-4">Todoアプリ</h1>
    </div>
    <div class="flex justify-center p-8">
        <UInput v-model="value" />
        <UButton color="primary">追加</UButton>
    </div>
</template>

<script setup lang="ts">
    const value = ref('')
    const test: string = "test"
</script>