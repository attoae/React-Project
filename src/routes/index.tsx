import {lazy} from 'react';
import {Redirect} from 'react-router-dom';
import {RouteConfig} from 'react-router-config';
import Title from '../config/locale/en_US';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: lazy(() => import('../pages/common/home')),
        exact: true,
        breadcrumb: [
            {title: Title.home_page}
        ],
        permission: ['admin']
    },
    {
        path: '/analysis/user',
        component: lazy(() => import('../pages/analysis/analysis_user')),
        breadcrumb: [
            {title: Title.analysis},
            {title: Title.analysis_user}
        ]
    },
    {
        path: '/analysis/order',
        component: lazy(() => import('../pages/analysis/analysis_order')),
        breadcrumb: [
            {title: Title.analysis},
            {title: Title.analysis_order}
        ]
    },
    {
        path: '/goods/management',
        component: lazy(() => import('../pages/goods/goods_management')),
        breadcrumb: [
            {title: Title.goods},
            {title: Title.goods_management}
        ]
    },
    {
        path: '/goods/edit/:type', // add modify
        component: lazy(() => import('../pages/goods/goods_edit')),
        breadcrumb: [
            {title: Title.goods},
            {title: Title.goods_management, to: '/goods/management'},
            {title: Title.goods_edit}
        ]
    },
    {
        path: '/category/management',
        component: lazy(() => import('../pages/category/category_management')),
        breadcrumb: [
            {title: Title.category},
            {title: Title.category_management}
        ]
    },
    {
        path: '/order/management',
        component: lazy(() => import('../pages/order/order_management')),
        breadcrumb: [
            {title: Title.order},
            {title: Title.order_management}
        ]
    },
    {
        path: '/order/detail/:id',
        component: lazy(() => import('../pages/order/order_detail')),
        breadcrumb: [
            {title: Title.order},
            {title: Title.order_management, to: '/order/management'},
            {title: Title.order_view}
        ]
    },
    {
        path: '/setting/account/management',
        component: lazy(() => import('../pages/setting/account_management')),
        breadcrumb: [
            {title: Title.setting},
            {title: Title.account_management}
        ]
    },
    {
        path: '/setting/account/edit/:type', // add modify
        component: lazy(() => import('../pages/setting/account_edit')),
        breadcrumb: [
            {title: Title.setting},
            {title: Title.account_management, to: '/setting/account/management'},
            {title: Title.account_edit}
        ]
    },
    {
        path: '/setting/permission/management',
        component: lazy(() => import('../pages/setting/permission_management')),
        breadcrumb: [
            {title: Title.setting},
            {title: Title.permission_management}
        ]
    },
    {
        path: '/setting/permission/edit/:type', // add modify
        component: lazy(() => import('../pages/setting/permission_edit')),
        breadcrumb: [
            {title: Title.setting},
            {title: Title.permission_management, to: '/setting/permission/management'},
            {title: Title.permission_edit}
        ]
    },
    // 错误页面
    {
        path: '/error',
        component: lazy(() => import('../pages/common/error'))
    },
    // 没有权限的页面
    {
        path: '/forbidden',
        component: lazy(() => import('../pages/common/forbidden'))
    },
    {
        path: '/not-match',
        component: lazy(() => import('../pages/common/not-match'))
    },
    {
        path: '**',
        render: () => <Redirect to="/not-match"/>
    }
]

export default routes;