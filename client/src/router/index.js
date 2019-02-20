import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Homepage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import PremLogin from '@/components/PremLogin'
import PremRegister from '@/components/PremRegister'
import StdHomepage from '@/components/StdHomepage'
import Odds from '@/components/Odds'
import PremHomepage from '@/components/PremHomepage'
import Book from '@/components/Book'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/premregister',
      name: 'premregister',
      component: PremRegister
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/premlogin',
      name: 'premlogin',
      component: PremLogin
    },
    {
      path: '/odds',
      name: 'odds',
      component: Odds
    },
    {
      path: '/stdhomepage',
      name: 'stdhomepage',
      component: StdHomepage
    },
    {
      path: '/premhomepage/:userid',
      name: 'premhomepage',
      component: PremHomepage
    },
    {
      path: '/books/:userid/:bookname',
      name: 'book',
      component: Book
    }
  ]
})
