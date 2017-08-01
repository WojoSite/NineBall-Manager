import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Players from '@/components/Players'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/help',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    }
  ]
})
