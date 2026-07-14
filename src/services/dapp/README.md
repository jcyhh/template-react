# DApp services
DApp 服务。

This module contains the wallet and on-chain interaction layer for mobile H5 DApp projects.
这个模块用于移动端 H5 DApp 项目的钱包和链上交互。

The first version focuses on basic wallet capabilities and does not include login or business authentication flows.
第一版只聚焦钱包基础能力，不包含登录或业务认证流程。

The normal initialization flow is wallet environment check, chain check, then feature calls.
正常初始化流程是先检查钱包环境，再检查网络，最后再执行具体功能调用。

Development mode skips chain switching by default, because local projects often connect to a LAN test RPC.
开发环境默认跳过强制切链，因为本地项目通常会连接局域网测试 RPC。

Production mode uses the env chain config and forces the wallet to switch to that chain.
生产环境使用 env 中的链配置，并强制钱包切换到该链。

If the wallet does not know the chain, the module adds the chain first and then switches to it.
如果钱包里没有这条链，模块会先添加链，再切换到这条链。

## Design rules
## 设计规则

Use `viem` as the only chain interaction library.
统一使用 `viem` 作为链交互库。

Do not introduce `ethers` or AppKit into the base template.
基础模板不引入 `ethers` 或 AppKit。

Wallet operations must use the injected `window.ethereum` provider.
钱包操作必须使用注入的 `window.ethereum` provider。

Do not create an HTTP public client for wallet flows.
钱包流程不要创建 HTTP public client。

This avoids slow or hanging operations observed in TP Wallet App when using an online public client.
这样可以规避 TP 钱包 App 内使用在线 public client 时操作很慢或几乎等不到成功的问题。

The wallet client is created with `createWalletClient`, `custom(provider)` and `publicActions`.
钱包客户端通过 `createWalletClient`、`custom(provider)` 和 `publicActions` 创建。

Gas balance check is controlled by `VITE_ENABLE_DAPP_GAS_CHECK`.
Gas 余额检查由 `VITE_ENABLE_DAPP_GAS_CHECK` 控制。

Contract writes call the shared gas checker before sending transactions.
写合约方法在发送交易前都会先调用统一 Gas 检查。

Frontend gas estimation and gas submission is controlled by `VITE_ENABLE_DAPP_GAS_ESTIMATE`.
前端是否估算并提交 gas 由 `VITE_ENABLE_DAPP_GAS_ESTIMATE` 控制。

Development mode always skips frontend gas estimation and gas submission.
开发环境始终跳过前端 gas 估算和 gas 提交。

Production mode follows `VITE_ENABLE_DAPP_GAS_ESTIMATE`.
生产环境按 `VITE_ENABLE_DAPP_GAS_ESTIMATE` 判断。

EIP-7702/EIP-5792 helpers are passive wrappers.
EIP-7702/EIP-5792 是被动封装。

They do nothing unless business code calls them.
业务代码不调用时不会生效。

Call `detectDappEip7702Support()` before using batch calls in a real page.
真实页面使用批量调用前，先调用 `detectDappEip7702Support()` 做能力判断。

ERC20 insufficient allowance approval is controlled by `VITE_ENABLE_ERC20_MAX_APPROVE`.
ERC20 授权额度不足时的授权金额由 `VITE_ENABLE_ERC20_MAX_APPROVE` 控制。

When enabled, `ensureErc20Allowance()` approves the max amount.
开启时，`ensureErc20Allowance()` 会授权最大额度。

When disabled, it only approves the requested amount.
关闭时，只授权本次传入的目标额度。

DApp amount unit conversion is controlled by `VITE_DAPP_AMOUNT_DECIMALS`.
DApp 金额单位转换由 `VITE_DAPP_AMOUNT_DECIMALS` 控制。

The default value is 18, which matches the common BSC project setup.
默认值为 18，适配常见 BSC 项目配置。

For 6-decimal networks or assets, set `VITE_DAPP_AMOUNT_DECIMALS=6`.
如果项目使用 6 位小数的网络或资产，设置 `VITE_DAPP_AMOUNT_DECIMALS=6`。

## Files
## 文件职责

- `config.ts`: chain config, provider status, sign message names, approval amount and gas defaults.
- `config.ts`：链配置、钱包状态、签名前缀、授权额度和 gas 默认配置。
- `provider.ts`: detects and caches the injected provider, then creates the local wallet client.
- `provider.ts`：检测并缓存注入 provider，然后创建本地钱包客户端。
- `wallet.ts`: connects wallet, clears local wallet state, signs messages and attaches wallet listeners.
- `wallet.ts`：连接钱包、清理本地钱包状态、签名以及绑定钱包监听。
- `chain.ts`: reads chain id, switches chain and adds the chain when the wallet does not know it.
- `chain.ts`：读取链 ID、切链，并在钱包没有目标链时添加链。
- `contract.ts`: wraps common contract read, write, gas estimation and gas balance checks.
- `contract.ts`：封装通用合约读取、写入、gas 估算和 gas 余额检查。
- `units.ts`: converts between display amounts and on-chain integer units by configured decimals.
- `units.ts`：按配置的小数位转换展示金额和链上整数单位。
- `erc20.ts`: wraps common ERC20 balance, allowance, approve and transfer operations.
- `erc20.ts`：封装常用 ERC20 信息读取、余额、授权额度、自动补授权、授权和转账操作。
- `batch.ts`: keeps low-level `wallet_sendCalls` and `wallet_getCallsStatus` helpers for future 7702-style flows.
- `batch.ts`：保留底层 `wallet_sendCalls` 和 `wallet_getCallsStatus` 方法，方便后续扩展 7702 类流程。
- `eip7702.ts`: wraps EIP-7702/EIP-5792 support detection, batch call sending and status query.
- `eip7702.ts`：封装 EIP-7702/EIP-5792 能力检测、批量调用发送和状态查询。
- `types.ts`: shared DApp TypeScript types.
- `types.ts`：DApp 共享 TypeScript 类型。

## State
## 状态

Shared wallet state lives in `src/stores/dapp`.
共享钱包状态放在 `src/stores/dapp`。

The store tracks provider status, wallet address, chain id and global DApp loading.
store 维护钱包环境状态、钱包地址、链 ID 和全局 DApp loading。

Wallet address changes are synced to `STORAGE_KEY.walletAddress`.
钱包地址变化会同步到 `STORAGE_KEY.walletAddress`。

## Usage
## 使用

```ts
import {
    connectDappWallet,
    formatDappAmountUnits,
    ensureErc20Allowance,
    initializeDappWallet,
    parseDappAmountUnits,
    signDappMessage,
} from '@/services/dapp'

await initializeDappWallet()
await connectDappWallet()
const signInfo = await signDappMessage('Login')

const rawAmount = parseDappAmountUnits('1.23')
const displayAmount = formatDappAmountUnits(rawAmount)

await ensureErc20Allowance(spenderAddress, rawAmount)
```

Business login should be built on top of these helpers later.
后续业务登录应该基于这些基础方法继续封装。
