export const AUTH_API_PATH = {
    passwordLogin: '/api/auth/login',
    dappLogin: '/api/auth/address_login',
} as const

export const AUTH_ERROR_MESSAGE = {
    tokenUnavailable: '登录凭证无效',
    dappUnavailable: '没有钱包环境',
    dappSessionChanged: '钱包账户或网络已切换',
} as const
