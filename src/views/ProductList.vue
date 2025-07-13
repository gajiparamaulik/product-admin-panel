<template>
  <div class="container">
    <div class="header">
      <h1>Product List</h1>
      <button @click="refresh">🔄 Refresh</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="grid">
      <div v-for="product in store.products" :key="product.id" class="card">
        <h3>{{ product.title }}</h3>
        <p><strong>Net:</strong> {{ formatPrice(product.price) }}</p>
        <p><strong>Gross:</strong> {{ formatPrice(product.price * 1.19) }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <router-link :to="`/product/${product.id}`" class="edit-btn">✏️ Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/productStore'
import { formatPrice } from '../utils/format'

const store = useProductStore()
const loading = ref(false)

async function refresh() {
  loading.value = true
  await store.fetchProducts()
  loading.value = false
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #339973;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  background-color: #fff;
}

.card:hover {
  transform: translateY(-5px);
}

.edit-btn {
  display: inline-block;
  margin-top: 0.5rem;
  text-decoration: none;
  background: #35495e;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.edit-btn:hover {
  background: #2c3e50;
}
</style>
