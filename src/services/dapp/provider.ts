import {
    createWalletClient,
    custom,
    publicActions,
} from 'viem'

import { isDappEnvironment } from '../platform/runtime.ts'
import { DAPP_CURRENT_CHAIN, DAPP_ERROR_MESSAGE } from './config.ts'
import type { DappEthereumProvider } from './types.ts'

function isDappProvider(provider: unknown): provider is DappEthereumProvider {
    return (
        typeof provider === 'object' &&
        provider !== null &&
        typeof (provider as DappEthereumProvider).request === 'function'
    )
}

function createInjectedWalletClient(provider: DappEthereumProvider) {
    return createWalletClient({
        chain: DAPP_CURRENT_CHAIN,
        transport: custom(provider),
    }).extend(publicActions)
}

let cachedProvider: DappEthereumProvider | undefined
let cachedWalletClient: ReturnType<typeof createInjectedWalletClient> | undefined

export function resetDappProviderCache(): void {
    cachedProvider = undefined
    cachedWalletClient = undefined
}

export async function detectDappProvider(): Promise<DappEthereumProvider | undefined> {
    if (cachedProvider) return cachedProvider

    if (!isDappEnvironment()) return undefined

    if (isDappProvider(window.ethereum)) {
        cachedProvider = window.ethereum
        return cachedProvider
    }

    return undefined
}

export function getDappProvider(): DappEthereumProvider {
    const provider = cachedProvider ?? (isDappEnvironment() ? window.ethereum : undefined)

    if (!isDappProvider(provider)) {
        throw new Error(DAPP_ERROR_MESSAGE.providerUnavailable)
    }

    cachedProvider = provider
    return provider
}

export function getDappWalletClient(): ReturnType<typeof createInjectedWalletClient> {
    if (!cachedWalletClient) {
        cachedWalletClient = createInjectedWalletClient(getDappProvider())
    }

    return cachedWalletClient
}
