import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Category from '@/components/category'
import Tickets from '@/components/tickets'
import Search from '@/components/search'

import Ticketsprice from '@/components/ticketsprice'
import Ticketsinfo from '@/components/ticketsinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/tickets',
      component: Tickets,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '*',
      redirect: "/home"
    },
  ]
})
