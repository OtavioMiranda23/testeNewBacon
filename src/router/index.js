import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import('../pages/HomePage')
        },
        {
            path: '/user/:id',
            name: 'user-details',
            component: () => import('../components/UserDetails'),
            props: true
          }
    ]
})
