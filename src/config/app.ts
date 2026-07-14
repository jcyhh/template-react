export const APP_LAYOUT_MENU_TYPE = {
    tabbar: 'tabbar',
    sidebar: 'sidebar',
} as const

export type AppLayoutMenuType =
    (typeof APP_LAYOUT_MENU_TYPE)[keyof typeof APP_LAYOUT_MENU_TYPE]

export const APP_HOME_ROUTE_NAME = 'home'

// Project-level layout menu mode options. Choose exactly one mode for a project.
// 项目级 layout 菜单模式选项，一个项目只能选择其中一种。
export const APP_LAYOUT_MENU_TYPE_OPTIONS = [
    APP_LAYOUT_MENU_TYPE.tabbar,
    APP_LAYOUT_MENU_TYPE.sidebar,
] as const

export const APP_CONFIG = {
    name: import.meta.env?.VITE_APP_NAME ?? '',
    routeBase: '/h5/',
    routerBasename: '/h5',

    // Special home route name used by app-wide navigation logic.
    // 首页路由名称，给全局跳首页等逻辑统一使用。
    homeRouteName: APP_HOME_ROUTE_NAME,

    // Project-level layout menu mode. `tabbar` and `sidebar` are mutually exclusive.
    // 项目级 layout 菜单模式，`tabbar` 和 `sidebar` 是互斥关系。
    defaultLayoutMenuType: APP_LAYOUT_MENU_TYPE.sidebar,

    defaultLanguageCode: import.meta.env?.PROD ? 'en' : 'zh-Hans',
} as const
