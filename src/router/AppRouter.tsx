import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import { AppLayout } from '../layouts/AppLayout/index.ts'
import { HomePage } from '../pages/home/HomePage.tsx'
import { SplashPage } from '../pages/splash/SplashPage.tsx'
import { UserPage } from '../pages/user/UserPage.tsx'

import { APP_ROUTER_BASENAME } from './config.ts'
import { ROUTE_PATH } from './routes.ts'

export function AppRouter() {
    return (
        <BrowserRouter basename={APP_ROUTER_BASENAME}>
            <Routes>
                <Route path={ROUTE_PATH.root} element={<SplashPage />} />
                <Route path={ROUTE_PATH.referral} element={<SplashPage />} />

                <Route element={<AppLayout />}>
                    <Route path={ROUTE_PATH.home.slice(1)} element={<HomePage />} />
                    <Route path={ROUTE_PATH.user.slice(1)} element={<UserPage />} />
                </Route>

                <Route path="*" element={<Navigate to={ROUTE_PATH.root} replace />} />
            </Routes>
        </BrowserRouter>
    )
}
