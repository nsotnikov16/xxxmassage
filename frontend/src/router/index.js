import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
        redirect: { name: 'admin-salons' },
        children: [
            {
                path: 'salons',
                name: 'admin-salons',
                component: AdminView,
            },
            {
                path: 'rooms',
                name: 'admin-rooms',
                component: AdminView,
            },
            {
                path: 'masters',
                name: 'admin-masters',
                component: AdminView,
            },
            {
                path: 'programms',
                name: 'admin-programms',
                component: AdminView,
            }
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        redirect: { name: 'auth-login' },
        children: [
            {
                path: 'login',
                name: 'auth-login',
                component: AuthView
            },
            {
                path: 'register',
                name: 'auth-register',
                component: AuthView
            },
            {
                path: 'forgot',
                name: 'auth-forgot',
                component: AuthView
            }
        ]
    }

    // {
    //   path: '/admin',
    //   name: 'admin',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
