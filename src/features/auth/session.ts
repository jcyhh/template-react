import { replaceAppRoute } from '../../router/bridge.ts'
import { ROUTE_PATH } from '../../router/routes.ts'
import { isDappEnvironment } from '../../services/platform/runtime.ts'
import { removeWalletAddress } from '../../services/storage/common.ts'
import { removeToken, setToken } from '../../services/storage/token.ts'
import { useUserStore } from '../../stores/user/store.ts'

import { AUTH_ERROR_MESSAGE, translateAuthErrorMessage } from './config.ts'
import { invalidateAuthSession, runAuthLogoutCleanups } from './lifecycle.ts'

export function completeLogin(token: string): void {
    const value = token.trim()

    if (!value) {
        throw new Error(translateAuthErrorMessage(AUTH_ERROR_MESSAGE.tokenUnavailable))
    }

    invalidateAuthSession()
    setToken(value)
    useUserStore.getState().markSignedIn()
    replaceAppRoute(ROUTE_PATH.home)
}

export function clearAuthSession(): void {
    invalidateAuthSession()
    runAuthLogoutCleanups()
    removeToken()

    if (isDappEnvironment()) {
        removeWalletAddress()
    }

    useUserStore.getState().markSignedOut()
}

export function logout(): void {
    clearAuthSession()
    replaceAppRoute(ROUTE_PATH.root)
}
