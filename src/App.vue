<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFilters from './components/TodoFilters.vue'
import { type Task, type Filter } from './types'
import { useLocalStorage } from './composables/use-local-storage.ts'

const now = new Date()
const formatDate = now.toLocaleDateString('ru-RU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const tasksList = useLocalStorage<Task[]>('todo-list', [])

const currentFilter = ref<Filter>('Все')

const filteredTasksList = computed(() => {
  switch (currentFilter.value) {
    case 'Все':
      return tasksList.value
    case 'Активные':
      return tasksList.value.filter((task) => !task.done)
    case 'Выполненные':
      return tasksList.value.filter((task) => task.done)
  }
})

const taskCounts = computed<Record<Filter, number>>(() => {
  const total = tasksList.value.length
  const doneCount = tasksList.value.filter((task) => task.done).length
  return {
    Все: total,
    Активные: total - doneCount,
    Выполненные: doneCount,
  }
})

function findTask(id: string) {
  return tasksList.value.find((task) => task.id === id)
}

function addTask(text: string) {
  tasksList.value.push({ id: crypto.randomUUID(), text, done: false })
}

function toggleTask(id: string) {
  const task = findTask(id)
  if (task) task.done = !task.done
}

function removeTask(id: string) {
  tasksList.value = tasksList.value.filter((task) => task.id !== id)
}

function editTask(id: string, newText: string) {
  const task = findTask(id)
  if (task) task.text = newText
}

function removeDoneTasks() {
  tasksList.value = tasksList.value.filter((task) => !task.done)
}

function changeCurrentFilter(newFilter: Filter) {
  currentFilter.value = newFilter
}
</script>

<template>
  <div class="content">
    <div class="info">
      <h1 class="title">Мои дела</h1>
      <p class="date">{{ formatDate }}</p>
    </div>
    <todo-input @add="addTask" />
    <todo-filters
      :current-filter="currentFilter"
      :task-counts="taskCounts"
      @change-current-filter="changeCurrentFilter"
    />
    <todo-list
      :tasks-list="filteredTasksList"
      @toggle="toggleTask"
      @remove="removeTask"
      @edit="editTask"
    />
    <div class="footer">
      <div>Осталось: {{ taskCounts['Активные'] }}</div>
      <button v-if="taskCounts['Выполненные'] > 0" class="clear-btn" @click="removeDoneTasks">
        Очистить выполненные
      </button>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin: 50px;
  width: 600px;
}

.title {
  margin-bottom: 5px;
}

.date {
  color: grey;
}

.date::first-letter {
  text-transform: uppercase;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid grey;
  padding: 15px 0;
}

.clear-btn {
  background: white;
  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
}

.clear-btn:hover {
  background: #f5f5f5;
}
</style>
