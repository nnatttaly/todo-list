import { watch, ref } from 'vue'

export function useLocalStorage<T>(key: string, startVal: T) {
  const storedValue = localStorage.getItem(key)
  let initialValue = startVal
  if (storedValue) {
    try {
      initialValue = JSON.parse(storedValue)
    } catch (err) {
      console.error(`useLocalStorage: не удалось прочитать ${key}`, err)
    }
  }

  const val = ref<T>(initialValue)

  watch(
    val,
    (newVal) => {
      localStorage.setItem(key, JSON.stringify(newVal))
    },
    { deep: true },
  )

  return val
}
