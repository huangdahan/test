import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/home.vue'], resolve),
            meta: { title: '首页' },
            children:[
                {
                    path: '/home',
                    component: resolve => require(['../pages/dash-board.vue'], resolve),
                    meta: { title: '首页' }
                },
                {	// timesheet填报
                    path: '/table',
                    component: resolve => require(['../pages/base-table.vue'], resolve),
                    meta: { title: 'timesheet填报' }
                },
                {	// 审批列表
                    path: '/form',
                    component: resolve => require(['../pages/base-form.vue'], resolve),
                    meta: { title: '流程面板' }
                },
                { // timesheet报表
                    path: '/charts',
                    component: resolve => require(['../pages/base-charts.vue'], resolve),
                    meta: { title: 'timesheet报表' }
                },
                {
                    //统计报表页面
                    path: '/editordata',
                    name: 'editordata',
                    component: resolve => require(['../pages/base-editordata.vue'], resolve),
                    meta: { title: '统计报表', permission: true }
                },
                {
                    // 查看填报详情 带审批按钮
                    path: '/editor',
                    name: 'editor',
                    component: resolve => require(['../pages/from-editor.vue'], resolve),
                    meta: { title: '查看填报信息', permission: true }
                },
                {
                    //查看填报详情 
                    path: '/From-supply',
                    name: 'From-supply',
                    component: resolve => require(['../pages/from-supply.vue'], resolve),
                    meta: { title: '查看填报信息', permission: true }
                },
                {
                    //填报详请页面
                    path: '/timesheet',
                    name: 'timesheet',
                    component: resolve => require(['../pages/from-timesheet.vue'], resolve),
                    meta: { title: '填报详请', permission: true }
                },
                {
                    //查看报表详情页面
                    path: '/check',
                    name: 'check',
                    component: resolve => require(['../pages/from-check.vue'], resolve),
                    meta: { title: '查看统计报表详情', permission: true }
                },
                {
                    //查看消息
                    path: '/tabs',
                    name: 'tabs',
                    component: resolve => require(['../pages/from-tabs.vue'], resolve),
                    meta: { title: '查看消息详情', permission: true }
                },
                {
                    //查看消息
                    path: '/From-myReport',
                    name: 'From-myReport',
                    component: resolve => require(['../pages/from-myReport.vue'], resolve),
                    meta: { title: '查看我提交详情', permission: true }
                },
                {
                    //查看消息
                    path: '/myLook',
                    name: 'myLook',
                    component: resolve => require(['../pages/from-myLook.vue'], resolve),
                    meta: { title: '查看详情', permission: true }
                },
                {
                    //查看消息
                    path: '/timeData',
                    name: 'timeData',
                    component: resolve => require(['../pages/from-timeData.vue'], resolve),
                    meta: { title: '查看详情', permission: true }
                },
                {
                    //查看消息
                    path: '/backlook',
                    name: 'backlook',
                    component: resolve => require(['../pages/from-backlook.vue'], resolve),
                    meta: { title: '查看详情', permission: true }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../pages/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../pages/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../pages/403.vue'], resolve)
        },
        {
            path: '/login1',
            component: resolve => require(['../pages/Login1.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})



