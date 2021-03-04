import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Clients from '../views/Clients.vue'
import User from '../views/User.vue'
import Prices from '../views/Prices.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  { 
    path: '/user/:userId',
    name:'User',
    component: User,
    props:true
  },
  {
    path:'/prices',
    name: 'Prices',
    component: Prices
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
