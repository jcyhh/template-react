# New project setup checklist
# 新项目初始化清单

Use this checklist when creating a real project from this template.
使用本模板创建真实项目时，按本清单初始化。

After this checklist is confirmed, follow `PROJECT_WORKFLOW.md` for daily page, API and DApp development.
本清单确认后，按 `PROJECT_WORKFLOW.md` 继续日常页面、接口和 DApp 开发。

AI should ask one item at a time, summarize all answers, then update project files after the developer confirms.
AI 应一次询问一项，汇总全部回答，并在开发者确认后统一回填项目文件。

## Fixed constraints
## 固定约束

- Use pnpm only. Do not use npm or yarn.
- 只使用 pnpm，不使用 npm 或 yarn。
- Keep `pnpm-lock.yaml` as the only lock file.
- 只保留 `pnpm-lock.yaml` 作为依赖锁文件。
- Keep the template package name fixed as `@jcy/template-react`; do not ask for or rewrite it during real project setup.
- 模板包名固定为 `@jcy/template-react`；真实项目初始化时不要询问或改写它。
- Keep `.env.production` `VITE_BASE_URL` empty so production API requests use the current site origin.
- `.env.production` 的 `VITE_BASE_URL` 保持为空，生产接口请求使用当前网站同源地址。
- Keep `.env.production` `VITE_RPC_URL` empty because production uses `DAPP_PRODUCTION_CHAIN`.
- `.env.production` 的 `VITE_RPC_URL` 保持为空，生产环境使用 `DAPP_PRODUCTION_CHAIN`。

## Required before development
## 开发前必改

1. Project name.
1. 项目名称。
2. Run `pnpm env:init`; it reads `.env.example` and creates `.env.development` and `.env.production` without copying example comments.
2. 运行 `pnpm env:init`；它会读取 `.env.example` 并创建 `.env.development` 和 `.env.production`，不要复制 example 里的注释。
3. Replace `public/brand/app-logo.png`.
3. 替换 `public/brand/app-logo.png`。
4. Replace `public/favicon.ico`.
4. 替换 `public/favicon.ico`。
5. Confirm route base, default home route and layout menu type.
5. 确认部署路径、默认首页路由和 layout 菜单类型。
6. Confirm login mode: `dapp`, `hybrid` or `account`.
6. 确认登录模式：`dapp`、`hybrid` 或 `account`。
7. Confirm whether i18n is enabled.
7. 确认是否启用多语言。
8. Confirm `PROJECT_TERMS.md`.
8. 确认 `PROJECT_TERMS.md`。

## Can be skipped until integration
## 可等到联调阶段补充

1. Development API URL in `.env.development` `VITE_BASE_URL`.
1. `.env.development` 中的开发接口地址 `VITE_BASE_URL`。
2. Development RPC URL in `.env.development` `VITE_RPC_URL`.
2. `.env.development` 中的开发 RPC 地址 `VITE_RPC_URL`。
3. Token and contract addresses such as `VITE_USDT`.
3. Token 与合约地址，例如 `VITE_USDT`。
4. Social share meta values.
4. 社交分享 meta 配置。

## Before page implementation from Figma
## Figma 页面开发前

1. Export required page assets into `src/assets/<page-name>/`.
1. 将页面所需切图导出到 `src/assets/<page-name>/`。
2. Check reusable components, utility classes and mixins before writing page SCSS.
2. 写页面 SCSS 前先检查可复用组件、工具类和 mixin。
3. Check `PROJECT_TERMS.md` before copying visible design text.
3. 复制设计稿可见文案前先检查 `PROJECT_TERMS.md`。
4. Implement basic local interactions even if API data is still static.
4. 即使接口数据仍是静态的，也要实现基础本地交互。

## After API and contract integration
## 接口和合约联调后

1. Replace static balances, rewards, quotas and progress numbers with their confirmed data sources.
1. 将静态余额、收益、额度和进度数字替换为已确认的数据来源。
2. Register page-level pull refresh with `usePageRefresh()` for business pages that should refresh.
2. 需要刷新的业务页使用 `usePageRefresh()` 注册页面级下拉刷新。
3. Use `useLatestRequest()` or `AbortController` to prevent stale requests from writing old data back.
3. 使用 `useLatestRequest()` 或 `AbortController` 防止旧请求回写旧数据。
4. Revisit large page files and move data orchestration into page hooks or same-directory services.
4. 复盘体积较大的页面文件，将数据编排回收到页面 hook 或同目录 service 中。
5. Confirm DApp logged-in startup validates the current wallet account before authenticated APIs.
5. 确认 DApp 已登录启动会在请求鉴权接口前校验当前钱包账号。

## Status file
## 状态文件

After setup, create `PROJECT_SETUP_STATUS.md` in the real project.
初始化完成后，在真实项目中创建 `PROJECT_SETUP_STATUS.md`。

Only record confirmed items and skipped items with their follow-up stage.
只记录已确认项和跳过项及其补齐阶段。
