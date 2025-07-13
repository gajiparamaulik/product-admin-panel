<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from './store/productStore'

const store = useProductStore()
onMounted(() => {
  store.fetchProducts()
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 1rem;
}
</style>
