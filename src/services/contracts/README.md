# Project contract services
# 项目合约服务

Use this directory for project-specific contract wrappers.
项目专属合约封装放在本目录。

`src/services/dapp` owns generic wallet, chain, ERC20 and common router capabilities.
`src/services/dapp` 只负责通用钱包、链、ERC20 和通用 Router 能力。

Project ABI files, contract addresses and page-facing contract methods should live here instead of polluting the generic DApp module.
项目 ABI、合约地址和页面会调用的合约业务方法应放在这里，不要污染通用 DApp 模块。

Recommended files:
推荐文件：

- `config.ts`: reads project contract addresses from env and validates required addresses.
- `config.ts`：读取项目合约地址 env，并校验必填地址。
- `<contractName>.ts`: owns one project contract ABI plus read/write methods.
- `<contractName>.ts`：维护一个项目合约 ABI 以及对应读写方法。
- `index.ts`: re-exports project contract wrappers.
- `index.ts`：统一导出项目合约封装。

Common ABI can be imported from `src/services/dapp`, for example `ERC20_ABI` and `UNISWAP_V2_ROUTER_ABI`.
通用 ABI 从 `src/services/dapp` 引入，例如 `ERC20_ABI` 和 `UNISWAP_V2_ROUTER_ABI`。
