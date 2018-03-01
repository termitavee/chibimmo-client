import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'

const login = require('./login')
const logged = require('./logged')
const editor = require('./editor')
const game = require('./game')

Vue.use(VueRouter)
Vue.use(Vuelidate)
const routes = [
  { path: '/login', component: login },
  { path: '/logged', component: logged },
  { path: '/editor', component: editor },
  { path: '/game', component: game }
]


const router = new VueRouter({
  routes
})
let app
window.onload = () => {
  app = new Vue({
    router
  }).$mount('#indexApp')
  router.push('login')

};


/* 
const app = new Vue({
  router
}).$mount('#indexApp')
router.push('login') */


/* window.history.length > 1
  this.$router.go(-1) //forward, back number
  : this.$router.push('/') // go to route
  router.replace('/') // lke push but override*/