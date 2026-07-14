import { APP_HOME_ROUTE_NAME } from './config.ts'

export const ROUTE_PATH = {
    root: '/',
    referral: '/ref/:ref',
    home: `/${APP_HOME_ROUTE_NAME}` as const,
    user: '/user',
} as const

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH]

export type AppRouteItemPath =
    | typeof ROUTE_PATH.home
    | typeof ROUTE_PATH.user

export type AppRouteItem = {
    path: AppRouteItemPath
    title: string
}

export const appRouteItems: AppRouteItem[] = [
    {
        path: ROUTE_PATH.home,
        title: '首页',
    },
    {
        path: ROUTE_PATH.user,
        title: '我的',
    },
]
