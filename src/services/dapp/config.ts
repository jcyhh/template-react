import {
    defineChain,
    parseEther,
    parseGwei,
} from 'viem'

export type DappEnv = Partial<Record<string, string>>

export const DAPP_DEFAULT_AMOUNT_DECIMALS = 18

export const DAPP_MAX_AMOUNT_DECIMALS = 36

function getDappEnv(): DappEnv {
    return (import.meta.env ?? {}) as unknown as DappEnv
}

function readDappEnv(
    key: string,
    fallback = '',
    env: DappEnv = getDappEnv(),
): string {
    const value = env[key]
    return value ? value : fallback
}

function readDappEnvNumber(
    key: string,
    fallback: number,
    env: DappEnv = getDappEnv(),
): number {
    const value = readDappEnv(key, '', env)
    const parsed = Number(value)

    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function readDappEnvEther(
    key: string,
    fallback: `${number}` | `${number}.${number}`,
): bigint {
    try {
        return parseEther(readDappEnv(key, fallback))
    } catch {
        return parseEther(fallback)
    }
}

function createDappChain(options: {
    defaultId: number
    defaultName: string
    defaultNativeName: string
    defaultNativeSymbol: string
    defaultRpcUrl: string
}) {
    const explorerUrl = readDappEnv('VITE_CHAIN_EXPLORER_URL')

    return defineChain({
        id: readDappEnvNumber('VITE_CHAIN_ID', options.defaultId),
        name: readDappEnv('VITE_CHAIN_NAME', options.defaultName),
        nativeCurrency: {
            decimals: readDappEnvNumber('VITE_CHAIN_NATIVE_DECIMALS', 18),
            name: readDappEnv('VITE_CHAIN_NATIVE_NAME', options.defaultNativeName),
            symbol: readDappEnv('VITE_CHAIN_NATIVE_SYMBOL', options.defaultNativeSymbol),
        },
        rpcUrls: {
            default: {
                http: [readDappEnv('VITE_RPC_URL', options.defaultRpcUrl)],
            },
        },
        blockExplorers: explorerUrl
            ? {
                default: {
                    name: readDappEnv('VITE_CHAIN_NAME', options.defaultName),
                    url: explorerUrl,
                },
            }
            : undefined,
    })
}

export const DAPP_PROVIDER_STATUS = {
    checking: 'checking',
    available: 'available',
    unavailable: 'unavailable',
} as const

export type DappProviderStatus =
    (typeof DAPP_PROVIDER_STATUS)[keyof typeof DAPP_PROVIDER_STATUS]

export const DAPP_PRODUCTION_CHAIN = createDappChain({
    defaultId: 56,
    defaultName: 'BNB Smart Chain',
    defaultNativeName: 'BNB',
    defaultNativeSymbol: 'BNB',
    defaultRpcUrl: 'https://bsc-dataseed.binance.org',
})

export const DAPP_LOCAL_CHAIN = createDappChain({
    defaultId: 31337,
    defaultName: 'Local Testnet',
    defaultNativeName: 'GO',
    defaultNativeSymbol: 'GO',
    defaultRpcUrl: 'http://127.0.0.1:8545',
})

export const DAPP_CURRENT_CHAIN = import.meta.env?.PROD
    ? DAPP_PRODUCTION_CHAIN
    : DAPP_LOCAL_CHAIN

export const DAPP_APPROVE_AMOUNT =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n

export const DAPP_ERC20_MAX_APPROVE_AMOUNT = DAPP_APPROVE_AMOUNT

export const DAPP_GAS_LIMIT_MULTIPLIER = 130n

export const DAPP_DEFAULT_GAS_PRICE = parseGwei('0.05')

export const DAPP_MIN_GAS_BALANCE = readDappEnvEther('VITE_MIN_GAS_BALANCE', '0.0004')

export function shouldCheckDappGas(env: DappEnv = getDappEnv()): boolean {
    return env.VITE_ENABLE_DAPP_GAS_CHECK !== '0'
}

export function shouldEstimateDappGas(
    env: DappEnv = getDappEnv(),
    isProduction = Boolean(import.meta.env?.PROD),
): boolean {
    if (!isProduction) return false
    return env.VITE_ENABLE_DAPP_GAS_ESTIMATE !== '0'
}

export function shouldUseErc20MaxAllowance(env: DappEnv = getDappEnv()): boolean {
    return env.VITE_ENABLE_ERC20_MAX_APPROVE !== '0'
}

export function getErc20ApproveAmount(
    amount: bigint,
    env: DappEnv = getDappEnv(),
): bigint {
    return shouldUseErc20MaxAllowance(env)
        ? DAPP_ERC20_MAX_APPROVE_AMOUNT
        : amount
}

export function getDappAmountDecimals(env: DappEnv = getDappEnv()): number {
    const value = env.VITE_DAPP_AMOUNT_DECIMALS?.trim()

    if (!value) return DAPP_DEFAULT_AMOUNT_DECIMALS

    const parsed = Number(value)

    if (
        Number.isSafeInteger(parsed)
        && parsed >= 0
        && parsed <= DAPP_MAX_AMOUNT_DECIMALS
    ) {
        return parsed
    }

    return DAPP_DEFAULT_AMOUNT_DECIMALS
}

export const DAPP_AMOUNT_DECIMALS = getDappAmountDecimals()

export const DAPP_ERROR_MESSAGE = {
    providerUnavailable: '没有钱包环境',
    walletAddressUnavailable: '未获取到钱包地址',
    gasBalanceInsufficient: 'Gas费用不足',
    contractReverted: '交易执行失败',
    tokenAddressUnavailable: '未配置 Token 合约地址',
    eip7702Unavailable: '当前钱包暂不支持7702批量调用',
    erc20BalanceInsufficient: '余额不足',
    invalidAmount: '金额格式错误',
} as const

export type DappSignMessage =
    | 'Login'
    | 'Transfer'
    | 'Withdraw'
    | 'Order'
    | 'Node'
    | 'Pledge'
    | 'Claim'
    | 'Saving'
    | 'TokenOrder'
    | 'ClaimQuota'
