# Agent Project Rules
# AI 协作项目规则

Read this file before changing code in this template.
修改本模板代码前先阅读本文件。

These rules are part of the template and should be preserved when creating new projects from it.
这些规则属于模板的一部分，基于模板创建新项目时应保留。

## Package manager
## 依赖管理

Use pnpm for dependency installation, scripts, tests, builds and lint checks.
依赖安装、脚本运行、测试、构建和 lint 检查统一使用 pnpm。

Keep `pnpm-lock.yaml` as the only package lock file.
只保留 `pnpm-lock.yaml` 作为依赖锁文件。

Do not create or commit `package-lock.json` or `yarn.lock`.
不要创建或提交 `package-lock.json` 或 `yarn.lock`。

Keep the package-manager guard enabled so npm and yarn fail fast.
保留包管理器校验脚本，让 npm 和 yarn 尽早失败。

Keep the template package name fixed as `@jcy/template-react`.
模板包名固定为 `@jcy/template-react`。

Do not ask for or rewrite the package name during real project setup.
真实项目初始化时不要询问或改写包名。

## New project setup
## 新项目初始化

Before developing a real project from this template, read `PROJECT_SETUP.md` and complete the setup checklist with the developer.
基于本模板开发真实项目前，先阅读 `PROJECT_SETUP.md` 并与开发者完成初始化清单。

After setup, follow `PROJECT_WORKFLOW.md` to decide the next development step instead of guessing from template defaults.
初始化后，按 `PROJECT_WORKFLOW.md` 判断下一步开发内容，不要根据模板默认值猜测。

Ask project-specific unknowns one setup item at a time, but common defaults may be grouped as one default setup pack.
项目特有且未知的配置一次询问一项，但常用默认项可以合并成一个默认配置包统一确认。

The default setup pack may include route base `/h5/`, home route `/home`, layout menu `sidebar`, login mode `dapp`, i18n enabled, BSC production chain and the standard DApp write defaults.
默认配置包可以包含部署目录 `/h5/`、首页 `/home`、布局菜单 `sidebar`、登录模式 `dapp`、启用多语言、BSC 生产网络和标准 DApp 写合约默认项。

When presenting the default setup pack, include available options and short meanings for each item, not only the default values.
询问默认配置包时，必须同时列出可选项和简短含义，不能只列默认值。

At minimum, explain `sidebar` side navigation, `tabbar` bottom navigation, `dapp` wallet login, `hybrid` wallet and account login, `account` account/password login, i18n enabled or disabled, BSC, other viem chain, and token decimals such as 18 or 6.
至少说明 `sidebar` 侧边栏导航、`tabbar` 底部导航、`dapp` 钱包登录、`hybrid` 钱包与账号登录、`account` 账号密码登录、多语言启用或关闭、BSC、other viem chain，以及 18 或 6 等 Token 精度含义。

If the developer replies `默认`, record the whole default setup pack as confirmed. If they provide changed fields such as `菜单 tabbar，多语言关闭`, only change those fields.
如果开发者回复 `默认`，记录整个默认配置包为已确认。如果开发者提供 `菜单 tabbar，多语言关闭` 这类修改字段，则只改这些字段。

After the template is copied into a real project, run `pnpm install`, `pnpm env:init` and `pnpm dev` before asking the first setup question.
模板复制到真实项目后，先运行 `pnpm install`、`pnpm env:init` 和 `pnpm dev`，再询问第一个初始化问题。

When the dev server is ready, report the Vite `Local` and `Network` URLs, especially the LAN address, in the same message as the first setup question and the default setup pack.
开发服务启动成功后，将 Vite 输出的 `Local` 和 `Network` 访问地址，尤其是局域网地址，和第一个初始化问题及默认配置包放在同一条消息里发给开发者。

Ask for the project logo resource only; generate favicon from the logo and do not ask the developer for favicon.
只向开发者索要项目 logo 资源；favicon 由 logo 生成，不要再向开发者索要 favicon。

If the developer has no project logo yet, tell them it can be skipped during early development, keep `public/brand/brand-status.json` not ready, and do not mark it ready until the real logo is replaced.
如果开发者暂时没有项目 logo，告诉他前期开发可先跳过，保持 `public/brand/brand-status.json` 为未就绪，直到替换真实 logo 后才能标记为就绪。

Production build must fail while `public/brand/brand-status.json` says the project logo is not ready.
当 `public/brand/brand-status.json` 表示项目 logo 未就绪时，生产构建必须失败。

Do not treat template defaults as confirmed project decisions.
不要把模板默认值当成项目已经确认的决策。

## Project terminology
## 项目术语

Read `PROJECT_TERMS.md` before copying visible text from Figma or old project code.
从 Figma 或旧项目代码复制可见文案前，先阅读 `PROJECT_TERMS.md`。

If Figma uses a banned term, replace it with the approved term in source code.
如果 Figma 使用了禁用词，源码中必须替换为推荐术语。

Do not use `提现` in user-facing UI source; use `提取` for token claim, redeem or withdraw style actions.
面向用户的 UI 源码中不要使用 `提现`；Token 领取、取回、赎回类动作统一使用 `提取`。

## Production API origin
## 生产接口地址

Keep `VITE_BASE_URL` empty in `.env.production`.
`.env.production` 中的 `VITE_BASE_URL` 必须保持为空。

Production API requests must use relative `/api/...` paths against the current site origin.
生产接口请求必须使用相对 `/api/...` 路径并访问当前网站同源地址。

Do not write a production API domain into source code or production env.
不要在源码或生产环境变量中填写正式接口域名。

Keep `VITE_RPC_URL` empty in `.env.production` because production uses `DAPP_PRODUCTION_CHAIN` and does not read the local-chain RPC setting.
`.env.production` 中的 `VITE_RPC_URL` 必须保持为空，因为生产环境使用 `DAPP_PRODUCTION_CHAIN`，不会读取本地测试链 RPC 配置。

These rules do not apply to `.env.development`, which may use a LAN API URL and local-chain RPC URL during integration.
这些规则不适用于 `.env.development`，开发联调时可以填写局域网接口地址和本地测试链 RPC 地址。

## Import paths
## 引入路径

Use relative imports for files in the same directory or nearby parent directories.
同目录或较近上级目录的文件可以使用相对路径。

`./`, `../` and `../../` are acceptable.
可以接受 `./`、`../` 和 `../../`。

Use the `@/` alias once an import would need three or more parent jumps.
当引入路径需要三级或更多上级跳转时，必须使用 `@/` 别名。

Do not write imports such as `../../../services/...`.
不要写 `../../../services/...` 这类引入。

Use `@/services/...`, `@/shared/...`, `@/router/...`, `@/assets/...` instead.
改用 `@/services/...`、`@/shared/...`、`@/router/...`、`@/assets/...`。

## Page modules
## 页面模块

Treat each route page as a small module directory.
把每个路由页面当成一个小模块目录。

A normal page should start with a `PageName.tsx` file and a `PageName.scss` file.
普通页面通常从 `PageName.tsx` 和 `PageName.scss` 两个文件开始。

Keep same-directory page helpers next to the page and import them with `./`.
页面同目录辅助逻辑放在页面旁边，并使用 `./` 引入。

Use optional files only when the page needs them, such as `types.ts`, `utils.ts`, `service.ts` or `components/`.
仅在页面需要时增加 `types.ts`、`utils.ts`、`service.ts` 或 `components/` 等可选文件。

## Figma page implementation workflow
## Figma 页面生成流程

Before implementing a page from a Figma link, do not write code immediately.
根据 Figma 链接开发页面前，不要直接开始写代码。

First inspect the design and the current project, then provide an implementation checklist for developer confirmation.
先分析设计稿和当前项目，再输出实现清单给开发者确认。

The checklist must include required exported assets, semantic UI elements, reusable components, reusable style classes, reusable mixins and page-specific exceptions.
清单必须包含所需切图资源、语义化 UI 元素、可复用组件、可复用样式类、可复用 mixin 以及页面特例。

Check existing components, `src/styles`, `src/styles/mixins.scss`, showcase pages and nearby page implementations before adding new page SCSS.
新增页面私有 SCSS 前，先检查已有组件、`src/styles`、`src/styles/mixins.scss`、演示页面和相近页面实现。

Map visual controls to semantic elements before styling them: inputs use `input` or `textarea`, actions use `button`, links use route/navigation helpers, and progress uses shared progress components when available.
样式实现前先确认控件语义：输入区使用 `input` 或 `textarea`，操作使用 `button`，跳转使用路由/导航封装，进度展示优先使用已有进度组件。

Static pages still implement basic local interactions when the design includes interactive controls, such as tab switching, inputs, expand-collapse areas, popups and copy buttons.
静态页面如果设计里包含交互控件，仍应实现基础本地交互，例如 tab 切换、输入框、展开收起、弹窗开关和复制按钮。

If the checklist is incomplete or required assets are missing, pause and report the gap instead of filling it with improvised CSS or placeholder markup.
如果清单不完整或必需资源缺失，应暂停并报告缺口，不要用临时 CSS 或占位结构硬补。

## Page data refresh
## 页面数据刷新

Authenticated business routes are wrapped by `PagePullRefresh`; splash, login and other flow pages must not be wrapped.
已登录业务路由由 `PagePullRefresh` 包裹；开屏页、登录页和其他流程页不能包裹下拉刷新。

Pages that support pull refresh must register a real refresh function with `usePageRefresh()`.
支持下拉刷新的页面必须通过 `usePageRefresh()` 注册真实刷新函数。

The refresh function must return or await the actual page data loading work, such as API requests, contract reads, list reloads or timer-driven screen refreshes.
刷新函数必须返回或等待真实页面数据加载，例如接口请求、合约读取、列表重载或定时整屏刷新。

Do not use a refresh handler that only increments a version value while the refresh component cannot know when data has actually finished loading.
不要只在刷新函数里递增版本号却让刷新组件无法知道真实数据何时完成。

Disable `usePageRefresh()` while the page is submitting, writing a contract or otherwise unable to safely refresh.
页面提交中、写合约中或其他不适合刷新时，应临时禁用 `usePageRefresh()`。

After API or contract integration, use `useLatestRequest()` or `AbortController` to prevent stale async requests from writing old data back into the page.
接口或合约联调后，使用 `useLatestRequest()` 或 `AbortController` 防止旧异步请求把旧数据回写到页面。

When a page has timers, manual pull refresh and post-write refresh should reuse the same screen refresh function and guard timer restart with mounted or lifecycle tokens.
页面存在定时器时，手动下拉刷新和写入成功后的刷新应复用同一个整屏刷新函数，并用 mounted 或生命周期 token 防止离页后旧异步重启定时器。

## Auth startup
## 认证启动

Splash animation is the shared startup gate. If startup logic runs while the browser path is splash or referral, wait for `waitForSplashAnimation()` before authentication recovery or login branching.
开屏动画是统一启动门槛。如果启动逻辑运行时浏览器路径仍是开屏页或邀请页，认证恢复或登录分流前必须等待 `waitForSplashAnimation()`。

In DApp login modes, an existing token must validate and resume the current wallet account before authenticated APIs such as `/api/users/my` are requested.
在 DApp 登录模式中，已有 Token 必须先校验并恢复当前钱包账号，再请求 `/api/users/my` 等鉴权接口。

If the cached token and wallet address belong to a different current wallet account during splash startup, clear the stale auth session and immediately start DApp login again in the same startup flow.
开屏启动时如果缓存 Token 与钱包地址属于旧账号，应清理旧登录态，并在同一轮启动流程中立即重新发起 DApp 登录。

Use `clearAuthSession()` when stale auth state must be cleared without forcing a route replacement; use `logout()` when the user should be redirected to splash.
需要清理旧登录态但不强制替换路由时使用 `clearAuthSession()`；需要用户回到开屏页时使用 `logout()`。

## History route fallback
## history 路由 fallback

Use `AppBrowserRouter` instead of a strict `BrowserRouter basename="/h5"`.
使用 `AppBrowserRouter`，不要使用严格的 `BrowserRouter basename="/h5"`。

The router must accept browser URLs both with and without the `/h5` prefix because some H5 servers return the same entry HTML for `/`, `/ref/...` and `/h5/...` without HTTP redirects.
路由必须同时兼容带 `/h5` 和不带 `/h5` 的浏览器地址，因为部分 H5 服务端会把 `/`、`/ref/...` 和 `/h5/...` 都直接返回同一份入口 HTML，而不做 HTTP 重定向。

Keep internal route paths prefix-free and let navigation helpers or `AppBrowserRouter` add the browser base path.
内部路由路径保持不带前缀，由导航辅助方法或 `AppBrowserRouter` 负责补浏览器基础路径。

## Styles
## 样式

Use SCSS for page styles.
页面样式使用 SCSS。

React has no Vue-style `scoped`, so page styles should start from a page-level class prefix.
React 没有 Vue 的 `scoped`，页面样式应从页面级类名前缀开始。

Prefer names like `.splash-page`, `.home-page` and nested element classes under them.
优先使用 `.splash-page`、`.home-page` 这类页面根类名，并在其下编写子元素类名。

Reuse existing global utility classes from `src/styles` before writing new page CSS.
编写新的页面 CSS 前，优先复用 `src/styles` 中已有的全局工具类。

If a visual result can be built by combining existing utility classes, compose those classes in `className` instead of adding a custom selector.
如果某个视觉效果可以通过组合已有通用类实现，就在 `className` 中组合这些类，不要额外新增自定义选择器。

If a style already exists as a utility class, put that class directly in `className`.
如果某个样式已经有对应工具类，直接把该类写到 `className` 中。

Do not duplicate utility styles in page or component SCSS.
不要在页面或组件 SCSS 中重复编写已有工具类的等价样式。

Only write custom SCSS for styles that are genuinely page-specific or hard to express with utilities, such as special positioning, unusual shapes, complex backgrounds, state selectors, animations or component internals.
只有确实属于页面特有、或很难用通用类表达的样式才写自定义 SCSS，例如特殊定位、特殊形状、复杂背景、状态选择器、动画或组件内部结构。

For example, use `className="flex items-center justify-center tc size-24"` instead of rewriting the same flex, alignment, text-align or font-size CSS.
例如，使用 `className="flex items-center justify-center tc size-24"`，不要重复编写同等的 flex、对齐、文本居中或字号 CSS。

## Editor tools
## 编辑器工具

VS Code users should install `IntelliSense for CSS class names in HTML` by `Zignd`.
VS Code 用户建议安装 `Zignd` 的 `IntelliSense for CSS class names in HTML`。

This extension provides class name suggestions in `className`, including SCSS utility classes from `src/styles`.
这个插件用于在 `className` 中提示样式类名，包括 `src/styles` 中的 SCSS 工具类。

If suggestions do not appear, make sure the extension is enabled globally and run `Cache CSS class definitions`.
如果没有提示，确认插件已全局启用，然后执行 `Cache CSS class definitions`。

## Assets
## 资源

Use semantic asset names instead of numeric names.
资源命名使用语义化名称，不使用数字名称。

Good examples are `splash-logo.png`, `token-usdt.png` and `home-banner.png`.
推荐示例：`splash-logo.png`、`token-usdt.png`、`home-banner.png`。

Use SVG for clean icons and vector graphics when available.
干净的图标和矢量图优先使用 SVG。

Use PNG or WebP for complex raster images, screenshots, glow effects and exported design slices.
复杂位图、截图、发光效果和设计稿切图使用 PNG 或 WebP。

Before implementing a designed page, confirm that required exported page assets are already available in the project.
开发设计稿页面前，先确认页面所需切图资源已经放入项目。

Prefer human-exported Figma slices for complex images, decorative frames, glow effects, page backgrounds and non-trivial icons.
复杂图片、装饰边框、光效、页面背景和非常规图标优先使用人工从 Figma 导出的切图。

Decorative design slices do not require `alt`; do not treat missing `alt` on page artwork as a blocking issue.
装饰性设计切图不强制要求编写 `alt`；不要把页面视觉图缺少 `alt` 当作阻塞问题。

Do not replace missing designed assets with CSS drawings, text, emoji or temporary symbols unless the developer explicitly asks for a placeholder prototype.
缺少设计资源时，不要擅自用 CSS 绘制、文字、表情或临时符号顶替，除非开发者明确要求先做占位原型。

If required assets are missing, pause page implementation and list the missing semantic asset names and suggested target paths.
如果必需资源缺失，应暂停页面实现，并列出缺少的语义化资源名和建议放置路径。

Place page-specific assets under `src/assets/<page-name>/`; keep initialization brand assets under `public/brand/`.
页面专属资源放在 `src/assets/<page-name>/`；初始化品牌资源继续放在 `public/brand/`。

## Verification
## 验证

Run tests, build and lint before claiming a change is complete.
声明改动完成前需要运行测试、构建和 lint。

At minimum, run `pnpm test`, `pnpm build` and `pnpm lint`.
至少运行 `pnpm test`、`pnpm build` 和 `pnpm lint`。

`pnpm build` is a hard quality gate: its prebuild lifecycle runs `pnpm verify`, which runs lint and tests before TypeScript and Vite can emit production assets. Do not bypass or remove this lifecycle.
`pnpm build` 是强制质量门禁：prebuild 生命周期会先运行 `pnpm verify`，由它执行 lint 和测试，全部通过后 TypeScript 和 Vite 才能生成生产产物。不得绕过或删除该生命周期。

## Test design
## 测试设计

Test stable business behavior and module contracts, not incidental presentation values or human-maintained file ordering.
测试稳定的业务行为和模块契约，不测试偶然的展示数值或人工维护的文件排序。

For configurable settings, verify that code reads the setting and behaves consistently with its current value. Do not hard-code a chosen size, color, switch value, env field list, or env order unless it is an explicit immutable requirement.
对于可配置项，验证代码确实读取该设置且行为与当前值一致。除非用户明确要求其不可变，否则不要写死尺寸、颜色、开关值、env 字段清单或 env 排序。
