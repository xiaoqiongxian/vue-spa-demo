export default{
    routers: [
        {
            path: '/pageOne',
            component: resolve => require.ensure([], () => resolve(require('./views/page-one-list.vue')), 'pageOne')
        },
        {
            path: '/pageTwo',
            component: resolve => require.ensure([], () => resolve(require('./views/page-two.vue')), 'pageTwo')
        },
        {
            path: '/pageThree',
            component: resolve => require.ensure([], () => resolve(require('./views/page-three.vue')), 'pageTwo')
        },
        {
            path: '*',
            redirect: '/pageOne'
        }
    ]
}