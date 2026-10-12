<script setup lang="ts">
import { type Filter, FILTERS } from '../types'

defineProps<{
  currentFilter: Filter
  taskCounts: Record<Filter, number>
}>()

defineEmits<{
  changeCurrentFilter: [filter: Filter]
}>()
</script>

<template>
  <div class="filters">
    <button
      v-for="filter in FILTERS"
      :key="filter"
      type="button"
      class="filter"
      :class="{ current: currentFilter === filter }"
      :aria-pressed="currentFilter === filter"
      @click="$emit('changeCurrentFilter', filter)"
    >
      {{ filter }} · {{ taskCounts[filter] }}
    </button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.filter {
  border: 1px solid green;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  background: transparent;
  font: inherit;
}

.current {
  background: green;
  color: white;
}
</style>
