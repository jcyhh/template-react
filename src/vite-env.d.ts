/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_RPC_URL: string
    readonly VITE_USDT: string
    readonly VITE_CHAIN_ID: string
    readonly VITE_CHAIN_NAME: string
    readonly VITE_CHAIN_NATIVE_NAME: string
    readonly VITE_CHAIN_NATIVE_SYMBOL: string
    readonly VITE_CHAIN_NATIVE_DECIMALS: string
    readonly VITE_CHAIN_EXPLORER_URL: string
    readonly VITE_MIN_GAS_BALANCE: string
    readonly VITE_ENABLE_DAPP_GAS_CHECK: string
    readonly VITE_ENABLE_DAPP_GAS_ESTIMATE: string
    readonly VITE_ENABLE_ERC20_MAX_APPROVE: string
    readonly VITE_DAPP_AMOUNT_DECIMALS: string
    readonly VITE_APP_NAME: string
    readonly VITE_ENABLE_SOCIAL_META: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
