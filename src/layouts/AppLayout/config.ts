import { APP_CONFIG } from '../../config/index.ts'
import homeIconUrl from '../../assets/layout/tabbar/home.png'
import homeActiveIconUrl from '../../assets/layout/tabbar/homeAct.png'
import userIconUrl from '../../assets/layout/tabbar/user.png'
import userActiveIconUrl from '../../assets/layout/tabbar/userAct.png'
import {
    appRouteItems,
    ROUTE_PATH,
    type AppRouteItemPath,
} from '../../router/routes.ts'

export const LAYOUT_HEADER_TITLE = APP_CONFIG.name

type LayoutMenuIcon = {
    icon: string
    activeIcon: string
}

const layoutMenuIconMap: Record<AppRouteItemPath, LayoutMenuIcon> = {
    [ROUTE_PATH.home]: {
        icon: homeIconUrl,
        activeIcon: homeActiveIconUrl,
    },
    [ROUTE_PATH.user]: {
        icon: userIconUrl,
        activeIcon: userActiveIconUrl,
    },
}

export const layoutMenuItems = appRouteItems.map((item) => ({
    ...item,
    ...layoutMenuIconMap[item.path],
}))
