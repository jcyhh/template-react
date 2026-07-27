import { useLocation } from 'react-router'

import { APP_CONFIG } from '@/config'
import { ROUTE_PATH, useAppNavigate } from '@/router'

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
            <img
                src={`${APP_CONFIG.routeBase}brand/app-logo.png`}
                className="app-brand__logo"
                alt={APP_CONFIG.name}
            />
            <div className="ml-10 size-24 bold-6">
                {APP_CONFIG.name}
            </div>
        </div>
    )
}
