import { createRouter, createWebHashHistory } from 'vue-router'

    import Home from '../pages/Home.vue';
    import About from '../pages/Pokemon.vue';
    const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Home
    },
    {
        path: '/pokemon/:pokemonId',
        name: 'PokePage',
        component: About
    }
    ]

    export default createRouter({
        history: createWebHashHistory(),
        routes
    })