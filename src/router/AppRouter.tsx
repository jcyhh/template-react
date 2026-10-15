import { useEffect } from 'react'
import {
    Navigate,
    Outlet,
    Route,
    Routes,
    useNavigate,
} from 'react-router'

import { PagePullRefresh } from '@/components/PagePullRefresh'
import { AuthSessionBoundary } from '@/features/auth/AuthSessionBoundary.tsx'
import { LoginPage } from '@/pages/auth/index.ts'
import { HomePage, MainLayout, UserPage } from '@/pages/main'
import { SplashPage } from '@/pages/splash/SplashPage.tsx'
import { SHOWCASE_ROUTE_ELEMENTS } from '@/showcase/router/index.ts'
import { useUserStore } from '@/stores/user/store.ts'

import { AppBrowserRouter } from './AppBrowserRouter.tsx'
import { registerAppRouteReplacer } from './bridge.ts'
import { ROUTE_PATH } from './routes.ts'

function RouterNavigationBridge() {
    const navigate = useNavigate()

    useEffect(() => registerAppRouteReplacer((path) => {
        void navigate(path, { replace: true })
    }), [navigate])

    return null
}

function RequireAuthentication() {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const isSessionReady = useUserStore((state) => state.isSessionReady)

    if (!isAuthenticated) {
        return <Navigate to={ROUTE_PATH.root} replace />
    }

    return <AuthSessionBoundary ready={isSessionReady}><Outlet /></AuthSessionBoundary>
}

function PullRefreshRouteOutlet() {
    return (
        <PagePullRefresh>
            <Outlet />
        </PagePullRefresh>
    )
}

export function AppRouter() {
    return (
        <AppBrowserRouter>
            <RouterNavigationBridge />
            <Routes>
                <Route path={ROUTE_PATH.root} element={<SplashPage />} />
                <Route path={ROUTE_PATH.referral} element={<SplashPage />} />
                <Route path={ROUTE_PATH.login} element={<LoginPage />} />

                <Route element={<RequireAuthentication />}>
                    <Route element={<PullRefreshRouteOutlet />}>
                        <Route element={<MainLayout />}>
                            <Route path={ROUTE_PATH.home.slice(1)} element={<HomePage />} />
                            <Route path={ROUTE_PATH.user.slice(1)} element={<UserPage />} />
                        </Route>
                    </Route>
                </Route>

                {SHOWCASE_ROUTE_ELEMENTS}

                <Route path="*" element={<Navigate to={ROUTE_PATH.root} replace />} />
            </Routes>
        </AppBrowserRouter>
    )
}
