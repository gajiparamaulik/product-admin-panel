<template>
  <form @submit.prevent="save" class="form">
    <h2>Edit Product</h2>

    <label>
      Name:
      <input v-model="form.title" required />
    </label>

    <label>
      Net Price (€):
      <input type="decimal" v-model.number="form.price" min="0" required />
    </label>

    <label>
      Tax Rate:
      <select v-model.number="form.taxRate">
        <option :value="0">0%</option>
        <option :value="0.07">7%</option>
        <option :value="0.19">19%</option>
      </select>
    </label>

    <label>
      Category:
      <input v-model="form.category" required />
    </label>

    <div class="summary">
      <p><strong>Net:</strong> {{ formatPrice(form.price) }}</p>
      <p><strong>Tax:</strong> {{ formatPrice(taxAmount) }}</p>
      <p><strong>Gross:</strong> {{ formatPrice(grossPrice) }}</p>
    </div>

    <div class="buttons">
      <button type="submit" :disabled="!isValid">💾 Save</button>
      <button type="button" @click="cancel">❌ Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/productStore'
import { formatPrice } from '../utils/format'

const props = defineProps({ productId: Number })
const store = useProductStore()
const router = useRouter()

const original = store.products.find(p => p.id === props.productId)
const form = ref({ ...original, taxRate: original?.taxRate ?? 0.19 })

// Validation
const isValid = computed(() => {
  return (
    form.value.title &&
    form.value.category &&
    form.value.price >= 0
  )
})

// Computed prices
const taxAmount = computed(() =>
  form.value.price * form.value.taxRate
)
const grossPrice = computed(() =>
  form.value.price + taxAmount.value
)

// Dirty check
const isDirty = computed(() =>
  JSON.stringify(form.value) !== JSON.stringify(original)
)

// Save function
async function save() {
  await new Promise(res => setTimeout(res, 500)) // simulate API
  store.updateProduct(form.value)
  router.push('/')
}

// Cancel with confirmation
function cancel() {
  if (isDirty.value) {
    if (!confirm('Discard changes?')) return
  }
  router.push('/')
}

// Leave guard
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const confirmLeave = confirm('You have unsaved changes. Leave anyway?')
    return confirmLeave ? next() : next(false)
  }
  next()
})
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  margin-bottom: 1.2rem;
  color: #2c3e50;
}

label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;
}

input,
select {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.summary {
  margin: 1.5rem 0;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px dashed #ccc;
  font-size: 0.95rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button[type="submit"] {
  background-color: #42b883;
}

button[type="button"] {
  background-color: #e74c3c;
}
</style>
