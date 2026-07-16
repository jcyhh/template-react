import { useLocation } from 'react-router'

import headerLogoUrl from '@/assets/layout/headbar/logo.svg'

import { ROUTE_PATH, useAppNavigate } from '@/router'

import { LAYOUT_HEADER_TITLE } from '../config.ts'

import './AppBrand.scss'

type AppBrandProps = {
    className?: string
    onClick?: () => void
}

export function AppBrand({
    className = '',
    onClick,
}: AppBrandProps) {
    const location = useLocation()
    const { pushRoute } = useAppNavigate()
    const brandClassName = [
        'app-brand',
        'flex',
        'items-center',
        className,
    ].filter(Boolean).join(' ')

    function handleBrandClick() {
        if (location.pathname !== ROUTE_PATH.home) {
            pushRoute(ROUTE_PATH.home)
        }

        onClick?.()
    }

    return (
        <div className={brandClassName} onClick={handleBrandClick}>
            <img src={headerLogoUrl} className="app-brand__logo" alt="Logo" />
            <div className="ml-10 size-24 bold-6">
                {LAYOUT_HEADER_TITLE}
            </div>
        </div>
    )
}
