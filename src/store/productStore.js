import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([])

  async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products')
    products.value = await res.json()
  }

  function updateProduct(updated) {
    const index = products.value.findIndex(p => p.id === updated.id)
    if (index !== -1) {
      products.value[index] = { ...updated }
    }
  }

  return { products, fetchProducts, updateProduct }
})
