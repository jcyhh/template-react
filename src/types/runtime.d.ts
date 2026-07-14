export {}

interface EthereumRequestArguments {
    method: string
    params?: readonly unknown[] | object
}

interface EthereumProvider {
    request(args: EthereumRequestArguments): Promise<unknown>
    on?: (event: string, listener: (payload: unknown) => void) => void
    off?: (event: string, listener: (payload: unknown) => void) => void
    removeListener?: (event: string, listener: (payload: unknown) => void) => void
}

declare global {
    interface Window {
        __FROM_FLUTTER__?: boolean
        Flutter?: {
            postMessage?: (message: string) => void
        }
        receiveMessageFromFlutter?: (message: string) => void
        ethereum?: EthereumProvider
    }
}
