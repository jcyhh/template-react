import headerMenuUrl from '@/assets/layout/headbar/menu.png'

import { LanguageSwitch } from '@/components/LanguageSwitch'
import { APP_CONFIG, APP_LOGIN_MODE } from '@/config/index.ts'
import { maskWalletAddress } from '@/shared/formatters/maskWalletAddress.ts'
import { useDappStore } from '@/stores/dapp/index.ts'
import { useUserStore } from '@/stores/user/index.ts'

import { AppBrand } from '../AppBrand/AppBrand.tsx'

import './HeaderBar.scss'

type HeaderBarProps = {
    showGap?: boolean
    showSidebarMenu?: boolean
    onSidebarMenuClick?: () => void
}

export function HeaderBar({
    showGap = true,
    showSidebarMenu = false,
    onSidebarMenuClick,
}: HeaderBarProps) {
    const walletAddress = useDappStore((state) => state.walletAddress)
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const showWalletAddress =
        APP_CONFIG.loginMode !== APP_LOGIN_MODE.account &&
        isAuthenticated &&
        walletAddress

    return (
        <header>
            <div className="app-header-bar vw-100 backdrop">
                {/* 顶部安全区域占位 */}
                <div className="safe-top" />
                {/* 导航栏 */}
                <div className="flex justify-between items-center header">
                    {/* 左侧 */}
                    <AppBrand />
                    {/* 右侧 */}
                    <div className="flex items-center">
                        <LanguageSwitch />
                        {showWalletAddress ? (
                            <div className="auto-btn size-24 bold-6 ml-20">
                                {maskWalletAddress(walletAddress)}
                            </div>
                        ) : null}
                        {showSidebarMenu ? (
                            <img
                                src={headerMenuUrl}
                                className="img-52 ml-20"
                                alt="Menu"
                                onClick={onSidebarMenuClick}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            {showGap ? <div className="gap-100" /> : null}
        </header>
    )
}
