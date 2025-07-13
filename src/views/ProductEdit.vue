<template>
  <div class="page">
    <ProductEditForm v-if="validId" :productId="productId" />
    <div v-else class="error">
      <h2>❌ Product Not Found</h2>
      <router-link to="/">← Go back to list</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../store/productStore'
import ProductEditForm from '../components/ProductEditForm.vue'

const route = useRoute()
const productId = Number(route.params.id)
const store = useProductStore()

const validId = computed(() =>
  store.products.some(p => p.id === productId)
)
</script>

<style scoped>
.page {
  padding: 2rem;
}

.error {
  text-align: center;
  margin-top: 5rem;
  color: #c0392b;
}
</style>
