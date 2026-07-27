# New project setup checklist
# 新项目初始化清单

Use this checklist when creating a real project from this template.
使用本模板创建真实项目时，按本清单初始化。

After this checklist is confirmed, follow `PROJECT_WORKFLOW.md` for daily page, API and DApp development.
本清单确认后，按 `PROJECT_WORKFLOW.md` 继续日常页面、接口和 DApp 开发。

AI should ask one item at a time, summarize all answers, then update project files after the developer confirms.
AI 应一次询问一项，汇总全部回答，并在开发者确认后统一回填项目文件。

After the template is copied, AI should run `pnpm install`, `pnpm env:init` and `pnpm dev` before the first setup question.
模板下载完毕后，AI 应先运行 `pnpm install`、`pnpm env:init` 和 `pnpm dev`，再询问第一个初始化问题。

When the dev server is ready, send the Vite `Local` and `Network` URLs, especially the LAN address, together with the first setup question.
开发服务启动成功后，将 Vite 输出的 `Local` 和 `Network` 访问地址，尤其是局域网地址，和第一个初始化问题放在同一条消息里发给开发者。

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
3. Ask whether the project logo is ready. It must be a square PNG, and the recommended size is 100x100.
3. 询问项目 logo 是否已准备好。必须是正方形 PNG，建议 100x100。
4. If there is no logo yet, tell the developer it can be skipped during early development, and keep `public/brand/brand-status.json` as not ready.
4. 如果暂时没有 logo，告诉开发者前期开发可先跳过，并保持 `public/brand/brand-status.json` 为未就绪。
5. Generate the fixed 68x68 favicon from the logo with `pnpm favicon:generate`; do not ask the developer for favicon.
5. favicon 由 logo 自动生成固定 68x68 尺寸：运行 `pnpm favicon:generate`，不要再向开发者索要 favicon。
6. Production build is blocked until the project logo is replaced and `public/brand/brand-status.json` is marked ready.
6. 生产构建会在项目 logo 替换、并将 `public/brand/brand-status.json` 标记为就绪前被阻止。
7. Confirm route base, default home route and layout menu type.
7. 确认部署路径、默认首页路由和 layout 菜单类型。
8. Confirm login mode: `dapp`, `hybrid` or `account`.
8. 确认登录模式：`dapp`、`hybrid` 或 `account`。
9. Confirm whether i18n is enabled.
9. 确认是否启用多语言。
10. Confirm `PROJECT_TERMS.md`.
10. 确认 `PROJECT_TERMS.md`。

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

If the developer skips the logo, record that the project logo is still not replaced and production build cannot pass yet.
如果开发者暂时没有 logo，要记录项目 logo 尚未替换，生产构建暂时不能通过。
