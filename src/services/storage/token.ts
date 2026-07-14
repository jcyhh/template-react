import { STORAGE_KEY } from './config.ts'
import {
    readLocalStorage,
    removeLocalStorage,
    writeLocalStorage,
} from './localStorage.ts'

export function getToken(): string {
    return readLocalStorage(STORAGE_KEY.token)
}

export function setToken(token: string): void {
    writeLocalStorage(STORAGE_KEY.token, token)
    // TODO(auth): Sync the signed-in state here after global auth state is available.
    // TODO(auth): 接入全局认证状态后，在这里同步已登录状态。
}

export function removeToken(): void {
    removeLocalStorage(STORAGE_KEY.token)
    // TODO(auth): Sync the signed-out state here after global auth state is available.
    // TODO(auth): 接入全局认证状态后，在这里同步已退出状态。
}
