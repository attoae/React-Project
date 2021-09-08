import { PieChartOutlined, AppstoreOutlined, ApartmentOutlined, BarsOutlined, SettingOutlined } from '@ant-design/icons';
import localeKey from './locale/en_US';

interface SiderItemInterface {
    id: string
    title: string
    path: string
}
interface SiderConfigInterface {
    id: string
    root: string
    icon: any
    children: SiderItemInterface[]
}
const SiderConfig: SiderConfigInterface[] = [
    {
        id: localeKey.analysis,
        root: localeKey.analysis,
        icon: PieChartOutlined,
        children: [
            {
                id: localeKey.analysis_user,
                title: localeKey.analysis_user,
                path: '/analysis/user'
            },
            {
                id: localeKey.analysis_order,
                title: localeKey.analysis_order,
                path: '/analysis/order'
            }
        ]
    },
    {
        id: localeKey.goods,
        root: localeKey.goods,
        icon: AppstoreOutlined,
        children: [
            {
                id: localeKey.goods_management,
                title: localeKey.goods_management,
                path: '/goods/management'
            }
        ]
    },
    {
        id: localeKey.category,
        root: localeKey.category,
        icon: ApartmentOutlined,
        children: [
            {
                id: localeKey.category_management,
                title: localeKey.category_management,
                path: '/category/management'
            }
        ]
    },
    {
        id: localeKey.order,
        root: localeKey.order,
        icon: BarsOutlined,
        children: [
            {
                id: localeKey.order_management,
                title: localeKey.order_management,
                path: '/order/management'
            }
        ]
    },
    {
        id: localeKey.setting,
        root: localeKey.setting,
        icon: SettingOutlined,
        children: [
            {
                id: localeKey.permission_management,
                title: localeKey.permission_management,
                path: '/setting/permission/management'
            },
            {
                id: localeKey.account_management,
                title: localeKey.account_management,
                path: '/setting/account/management'
            }
        ]
    }
]

export default SiderConfig;