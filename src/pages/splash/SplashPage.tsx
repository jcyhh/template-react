import { useEffect } from 'react'
import {
    useNavigate,
    useParams,
} from 'react-router'

import startLogoUrl from '../../assets/start/splash-logo.png'
import { ROUTE_PATH } from '../../router/routes.ts'

import { saveSplashReferralCode } from './referral.ts'
import './SplashPage.scss'

type SplashRouteParams = {
    ref?: string
}

export function SplashPage() {
    const { ref } = useParams<SplashRouteParams>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!saveSplashReferralCode(ref)) return

        void navigate(ROUTE_PATH.root, { replace: true })
    }, [navigate, ref])

    return (
        <section className="splash-page" data-page="splash">
            <img
                src={startLogoUrl}
                className="splash-page__logo animate__animated animate__zoomIn"
                alt="X SmartPay"
            />

            <div className="splash-page__tips animate__animated animate__slideInUp">
                <span className="splash-page__tips-text">Welcome to X SmartPay</span>
                <span className="splash-page__loading" aria-label="Loading" />
            </div>
        </section>
    )
}
