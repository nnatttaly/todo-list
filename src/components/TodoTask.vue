<script setup lang="ts">
import { type Task } from '../types'
import { ref } from 'vue'

const { task } = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: []
  remove: []
  edit: [newText: string]
}>()

const isEdit = ref(false)
const editedTaskText = ref('')

function startEdit() {
  editedTaskText.value = task.text
  isEdit.value = true
}

function saveEdit() {
  const trimmedText = editedTaskText.value.trim()
  if (trimmedText !== '') {
    emit('edit', trimmedText)
  }
  isEdit.value = false
}

function toggleEdit() {
  if (isEdit.value) {
    saveEdit()
  } else {
    startEdit()
  }
}
</script>

<template>
  <div class="task">
    <input
      type="checkbox"
      class="checkbox"
      aria-label="Отметить выполненной"
      :checked="task.done"
      @change="$emit('toggle')"
    />
    <div class="text">
      <div v-if="!isEdit" :class="{ done: task.done }">{{ task.text }}</div>
      <input
        v-else
        class="edit-input"
        aria-label="Текст задачи"
        v-model="editedTaskText"
        @keydown.enter="saveEdit"
      />
    </div>
    <div class="actions">
      <button class="action" aria-label="Редактировать" @click="toggleEdit">🖊</button>
      <button class="action" aria-label="Удалить" @click="$emit('remove')">🗑</button>
    </div>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
}

.checkbox {
  width: 20px;
  height: 20px;
  accent-color: green;
  cursor: pointer;
}

.text {
  margin-left: 15px;
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  margin-right: 10px;
}

.edit-input {
  width: 100%;
}

.done {
  text-decoration: line-through;
  color: grey;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 16px;
}

.action {
  font-size: 18px;
  border: none;
  cursor: pointer;
  background: transparent;
}
</style>
