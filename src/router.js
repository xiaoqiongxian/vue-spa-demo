export default{
    routers: [
        {
            path: '/pageOne',
            component: resolve => require.ensure([], () => resolve(require('./components/page-one/page-one-list.vue')), 'pageOne')
        },
        {
            path: '/pageTwo',
            component: resolve => require.ensure([], () => resolve(require('./components/page-two.vue')), 'pageTwo')
        },
        {
            path: '/pageThree',
            component: resolve => require.ensure([], () => resolve(require('./components/page-three.vue')), 'pageTwo')
        },
        {
            path: '*',
            redirect: '/pageOne'
        }
    ]
}