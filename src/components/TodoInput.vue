<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  add: [text: string]
}>()

const input = ref('')

function handleSubmit() {
  const trimmedValue = input.value.trim()
  if (trimmedValue === '') return
  emit('add', trimmedValue)
  input.value = ''
}
</script>

<template>
  <div class="add-item">
    <input
      placeholder="Что нужно сделать?"
      aria-label="Новая задача"
      v-model="input"
      @keydown.enter="handleSubmit"
    />
    <button class="btn" @click="handleSubmit">Добавить</button>
  </div>
</template>

<style scoped>
.add-item {
  margin: 20px 0;
}

input {
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid grey;
  background: #f5f5f5;
}

.btn {
  margin-left: 8px;
  background: green;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  font-weight: 500;
}

.btn:hover {
  background: #006400;
}
</style>
