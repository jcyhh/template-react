import { useTranslation } from 'react-i18next'

import headerLangUrl from '@/assets/layout/headbar/lang.svg'
import headerMenuUrl from '@/assets/layout/headbar/menu.png'

import { LanguageSwitch } from '@/components/LanguageSwitch'

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
    const { t } = useTranslation()

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
                        <LanguageSwitch>
                            <img src={headerLangUrl} className="img-52" alt="Language" />
                        </LanguageSwitch>
                        <div className="header-btn flex-center black size-24 bold-6 ml-20">{t('链接')}</div>
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
