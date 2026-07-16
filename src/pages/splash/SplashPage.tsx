import {
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    useNavigate,
    useParams,
} from 'react-router'

import startLogoUrl from '@/assets/start/splash-logo.png'
import { Icon } from '@/components/Icon'
import {
    APP_CONFIG,
    APP_LOGIN_MODE,
} from '@/config/index.ts'
import {
    AUTH_STARTUP_RESULT,
    startAuthFlow,
} from '@/features/auth/startup.ts'
import { ROUTE_PATH } from '@/router/routes.ts'

import { saveSplashReferralCode } from './referral.ts'
import './SplashPage.scss'

type SplashRouteParams = {
    ref?: string
}

const SPLASH_ANIMATION_DURATION = 1000

function waitForSplashAnimation(): Promise<void> {
    return new Promise((resolve) => {
        window.setTimeout(resolve, SPLASH_ANIMATION_DURATION)
    })
}

export function SplashPage() {
    const { ref } = useParams<SplashRouteParams>()
    const navigate = useNavigate()
    const hasStartedRef = useRef(false)
    const [walletRequired, setWalletRequired] = useState(false)
    const loading = APP_CONFIG.loginMode !== APP_LOGIN_MODE.account && !walletRequired

    useEffect(() => {
        if (saveSplashReferralCode(ref)) {
            void navigate(ROUTE_PATH.root, { replace: true })
            return
        }

    }, [navigate, ref])

    useEffect(() => {
        if (ref || hasStartedRef.current) return

        hasStartedRef.current = true

        async function startSplashAuthFlow(): Promise<void> {
            if (APP_CONFIG.loginMode === APP_LOGIN_MODE.account) {
                await waitForSplashAnimation()
            }

            const result = await startAuthFlow()

            if (result === AUTH_STARTUP_RESULT.walletRequired) {
                setWalletRequired(true)
            }
        }

        void startSplashAuthFlow()
    }, [ref])

    return (
        <section className="splash-page" data-page="splash">
            <img
                src={startLogoUrl}
                className="splash-page__logo animate__animated animate__zoomIn"
                alt={APP_CONFIG.name}
            />

            <div className="splash-page__tips vw-100 flex-center gap-10 size-20 tc animate__animated animate__slideInUp">
                <span>
                    {walletRequired
                        ? '请使用钱包环境打开！'
                        : `Welcome to ${APP_CONFIG.name}`}
                </span>

                {loading ? (
                    <Icon
                        name="loading"
                        size={15}
                        ariaLabel="Loading"
                    />
                ) : null}
            </div>
        </section>
    )
}
