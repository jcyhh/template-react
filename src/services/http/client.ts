import axios from 'axios'

import { getRequestLanguage } from '../../i18n/getRequestLanguage.ts'
import { getToken, removeToken } from '../storage/token.ts'
import { isFormDataBody } from './body.ts'
import {
    HTTP_AUTH,
    HTTP_CONFIG,
    HTTP_CONTENT_TYPE,
    HTTP_HEADER,
    HTTP_STATUS,
} from './config.ts'
import { toHttpError } from './error.ts'

export const httpClient = axios.create({
    baseURL: import.meta.env?.VITE_BASE_URL,
    timeout: HTTP_CONFIG.timeout,
})

httpClient.interceptors.request.use((config) => {
    const token = getToken()

    config.headers.set(HTTP_HEADER.language, getRequestLanguage())

    if (token) {
        config.headers.set(
            HTTP_HEADER.authorization,
            `${HTTP_AUTH.scheme} ${token}`,
        )
    } else {
        config.headers.delete(HTTP_HEADER.authorization)
    }

    if (isFormDataBody(config.data)) {
        config.headers.delete(HTTP_HEADER.contentType)
    } else if (config.data !== undefined) {
        config.headers.setContentType(HTTP_CONTENT_TYPE.json)
    }

    // TODO(http): Attach the current wallet address after the wallet module is ready.
    // TODO(http): 钱包模块完成后，在请求头中添加当前钱包地址。
    return config
})

httpClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
        const httpError = toHttpError(error)

        if (httpError.status === HTTP_STATUS.unauthorized) {
            removeToken()
            // TODO(auth): Sync the global signed-out state after the auth store is ready.
            // TODO(auth): 认证 Store 完成后，同步全局退出状态。
            // TODO(router): Redirect to the login page after route guards are ready, and avoid duplicate redirects.
            // TODO(router): React Router 完成后，跳转登录页并避免重复跳转。
        }

        // TODO(http): Show request errors through the shared message module after it is ready.
        // TODO(http): 全局消息系统完成后，在统一错误策略中展示请求错误。
        return Promise.reject(httpError)
    },
)
