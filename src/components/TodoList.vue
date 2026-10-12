<script setup lang="ts">
import { type Task } from '../types'
import TodoTask from './TodoTask.vue'

defineProps<{
  tasksList: Task[]
}>()

defineEmits<{
  toggle: [id: string]
  remove: [id: string]
  edit: [id: string, newText: string]
}>()
</script>

<template>
  <div class="tasks">
    <p v-if="tasksList.length === 0" class="empty">Задач пока нет</p>
    <todo-task
      v-for="task in tasksList"
      :key="task.id"
      :task
      @toggle="$emit('toggle', task.id)"
      @remove="$emit('remove', task.id)"
      @edit="(newText) => $emit('edit', task.id, newText)"
    ></todo-task>
  </div>
</template>

<style scoped>
.tasks {
  display: flex;
  gap: 8px;
  flex-direction: column;
  margin-bottom: 20px;
}

.empty {
  color: grey;
  text-align: center;
  padding: 15px;
}
</style>
