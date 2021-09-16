import Vue from 'vue'
import VueRouter from 'vue-router'
import component from '../components/component'
import route from './route'

console.log(route)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'component',
    component: component,
    children: [
      ...route
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
