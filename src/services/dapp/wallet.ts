import type { Address } from 'viem'

import { useDappStore } from '../../stores/dapp/store.ts'
import {
    DAPP_CURRENT_CHAIN,
    DAPP_ERROR_MESSAGE,
    DAPP_PROVIDER_STATUS,
    type DappSignMessage,
} from './config.ts'
import {
    ensureDappChain,
    getDappChainId,
} from './chain.ts'
import {
    detectDappProvider,
    getDappProvider,
    getDappWalletClient,
    resetDappProviderCache,
} from './provider.ts'
import type {
    DappEthereumProvider,
    DappInitializeWalletOptions,
    DappSignResult,
    DappWalletConnection,
} from './types.ts'

function normalizeAddress(address: Address | undefined): Address {
    if (!address) throw new Error(DAPP_ERROR_MESSAGE.walletAddressUnavailable)
    return address
}

function getListenerRemover(provider: DappEthereumProvider) {
    return provider.removeListener ?? provider.off
}

let removeDappWalletListeners: (() => void) | undefined

export async function detectDappWallet(): Promise<boolean> {
    useDappStore.getState().setProviderStatus(DAPP_PROVIDER_STATUS.checking)

    const provider = await detectDappProvider()
    const providerStatus = provider
        ? DAPP_PROVIDER_STATUS.available
        : DAPP_PROVIDER_STATUS.unavailable

    useDappStore.getState().setProviderStatus(providerStatus)
    return Boolean(provider)
}

export async function initializeDappWallet(
    options: DappInitializeWalletOptions = {},
): Promise<boolean> {
    const hasProvider = await detectDappWallet()

    if (!hasProvider) return false

    const chainId = await getDappChainId()
    useDappStore.getState().setChainId(chainId)

    await ensureDappChain(DAPP_CURRENT_CHAIN, {
        skipInDevelopment: options.skipChainInDevelopment,
    })

    if (options.skipChainInDevelopment === false || import.meta.env?.PROD) {
        useDappStore.getState().setChainId(DAPP_CURRENT_CHAIN.id)
    }

    if (options.attachListeners !== false) {
        removeDappWalletListeners?.()
        removeDappWalletListeners = attachDappWalletListeners()
    }

    return true
}

export async function getConnectedDappAddress(): Promise<Address> {
    const walletClient = getDappWalletClient()
    const [address] = await walletClient.getAddresses()

    if (address) return address

    const [requestedAddress] = await walletClient.requestAddresses()
    return normalizeAddress(requestedAddress)
}

export async function connectDappWallet(): Promise<DappWalletConnection> {
    const address = await getConnectedDappAddress()
    const chainId = await getDappChainId()

    useDappStore.getState().setProviderStatus(DAPP_PROVIDER_STATUS.available)
    useDappStore.getState().setWalletAddress(address)
    useDappStore.getState().setChainId(chainId)

    return { address, chainId }
}

export function disconnectDappWallet(): void {
    useDappStore.getState().clearWalletAddress()
    useDappStore.getState().setChainId(undefined)
    removeDappWalletListeners?.()
    removeDappWalletListeners = undefined
    resetDappProviderCache()
}

export async function signDappMessage(
    message: DappSignMessage | string,
): Promise<DappSignResult> {
    const walletClient = getDappWalletClient()
    const address = await getConnectedDappAddress()
    const timestamp = Math.floor(Date.now() / 1000)
    const signMessage = `${message}-${timestamp}`
    const signature = await walletClient.signMessage({
        account: address,
        message: signMessage,
    })

    return {
        signature,
        timestamp,
        message: signMessage,
    }
}

export function attachDappWalletListeners(): () => void {
    const provider = getDappProvider()

    const handleAccountsChanged = (accounts: unknown) => {
        const [address] = Array.isArray(accounts) ? accounts : []

        if (typeof address === 'string' && address) {
            useDappStore.getState().setWalletAddress(address as Address)
            return
        }

        useDappStore.getState().clearWalletAddress()
    }

    const handleChainChanged = (chainId: unknown) => {
        const parsedChainId = typeof chainId === 'string'
            ? Number.parseInt(chainId, 16)
            : Number(chainId)

        useDappStore.getState().setChainId(
            Number.isFinite(parsedChainId) ? parsedChainId : undefined,
        )
    }

    provider.on?.('accountsChanged', handleAccountsChanged)
    provider.on?.('chainChanged', handleChainChanged)

    return () => {
        const removeListener = getListenerRemover(provider)
        removeListener?.call(provider, 'accountsChanged', handleAccountsChanged)
        removeListener?.call(provider, 'chainChanged', handleChainChanged)
    }
}
