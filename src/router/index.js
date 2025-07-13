import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductEdit from '../views/ProductEdit.vue'

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductEdit, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
