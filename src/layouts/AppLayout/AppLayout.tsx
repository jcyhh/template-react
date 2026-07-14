import { useState } from 'react'
import { Outlet } from 'react-router'

import {
    DEFAULT_LAYOUT_MENU_TYPE,
    LAYOUT_MENU_TYPE,
    type LayoutMenuType,
} from '../../router/config.ts'

import { HeaderBar } from './HeaderBar/HeaderBar.tsx'
import { SidebarMenu } from './SidebarMenu.tsx'
import { TabbarMenu } from './TabbarMenu.tsx'
import './AppLayout.scss'

type AppLayoutProps = {
    menuType?: LayoutMenuType
}

export function AppLayout({
    menuType = DEFAULT_LAYOUT_MENU_TYPE,
}: AppLayoutProps) {
    const [showSidebarMenu, setShowSidebarMenu] = useState(false)
    const isSidebarLayout = menuType === LAYOUT_MENU_TYPE.sidebar
    const isTabbarLayout = menuType === LAYOUT_MENU_TYPE.tabbar
    const appLayoutClassName = isTabbarLayout
        ? 'app-layout app-layout--tabbar vw-100 min-vh-100'
        : 'app-layout vw-100 min-vh-100'

    function handleOpenSidebarMenu() {
        setShowSidebarMenu(true)
    }

    function handleCloseSidebarMenu() {
        setShowSidebarMenu(false)
    }

    return (
        <div className={appLayoutClassName}>
            <HeaderBar
                showSidebarMenu={isSidebarLayout}
                onSidebarMenuClick={handleOpenSidebarMenu}
            />

            <div className="app-layout__body">
                <main className="app-layout__main">
                    <Outlet />
                </main>
            </div>

            {isSidebarLayout ? (
                <SidebarMenu
                    show={showSidebarMenu}
                    onClose={handleCloseSidebarMenu}
                />
            ) : null}
            {isTabbarLayout ? <TabbarMenu /> : null}
        </div>
    )
}
