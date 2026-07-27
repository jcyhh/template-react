# Project development workflow
# 项目开发流程清单

Use this guide after copying the template into a real project.
复制模板创建真实项目后，按本文档决定下一步该做什么。

This file is the day-to-day route map. `PROJECT_SETUP.md` answers what must be configured, and this file answers when and how to do it.
本文档是日常开发路线图。`PROJECT_SETUP.md` 负责说明必须配置什么，本文档负责说明何时做、怎么做。

## 0. Read these files first
## 0. 先阅读这些文件

Read the documents in this order before changing a real project.
开发真实项目前，按以下顺序阅读文档。

1. `README.md`
1. `README.md`
2. `AGENTS.md`
2. `AGENTS.md`
3. `PROJECT_SETUP.md`
3. `PROJECT_SETUP.md`
4. `PROJECT_TERMS.md`
4. `PROJECT_TERMS.md`
5. `PROJECT_WORKFLOW.md`
5. `PROJECT_WORKFLOW.md`
6. `.env.example`
6. `.env.example`

Do not treat template defaults as project decisions. Confirm them with the developer first.
不要把模板默认值当成真实项目决策。先和开发者确认。

## 1. AI startup prompt
## 1. AI 启动项目提示词

Use this prompt when asking an AI tool to start a real project from the template.
当你让 AI 基于模板启动真实项目时，使用下面的提示词。

### Empty project prompt
### 空项目目录提示词

Use this short prompt when only an empty project folder has been created.
当你只创建了一个空项目文件夹时，复制下面这句即可。

```txt
请从 https://github.com/jcyhh/template-react.git 把 React H5 DApp 模板复制到当前空项目目录，并按模板文档开始初始化项目。
```

After the template is copied, the AI should start the project before asking the first setup question.
模板下载完毕后，AI 应先将项目运行起来，再询问第一个初始化问题。

Run the startup commands first.
先运行启动命令。

```bash
pnpm install
pnpm env:init
pnpm dev
```

When the dev server is ready, report the Vite `Local` and `Network` URLs, including the LAN address, in the same message as the first setup question and the default setup pack.
开发服务启动成功后，将 Vite 输出的 `Local` 和 `Network` 访问地址，尤其是局域网地址，和第一个初始化问题及默认配置包放在同一条消息里发给开发者。

The developer can reply `默认` to accept the default setup pack. If anything should change, they can answer only the changed fields, such as `菜单 tabbar，多语言关闭`.
开发者可以回复 `默认` 接受默认配置包。若需要修改，只回复要改的字段即可，例如 `菜单 tabbar，多语言关闭`。

The default setup pack must show available options and meanings, not only the default values.
默认配置包必须说明可选项和含义，不能只列默认值。

Default setup pack example:
默认配置包示例：

- Route base: default `/h5/`; options are `/h5/`, `/` or a custom prefix.
- 部署目录：默认 `/h5/`；可选项为 `/h5/`、`/` 或自定义前缀。
- Home route: default `/home`; options are `/home` or another first-level home route.
- 首页路由：默认 `/home`；可选项为 `/home` 或其他一级首页路由。
- Layout menu: default `sidebar`; options are `sidebar` side navigation or `tabbar` bottom navigation.
- 布局菜单：默认 `sidebar`；可选项为 `sidebar` 侧边栏导航或 `tabbar` 底部导航。
- Login mode: default `dapp`; options are `dapp` wallet login, `hybrid` wallet and account login, or `account` account/password login.
- 登录模式：默认 `dapp`；可选项为 `dapp` 钱包登录、`hybrid` 钱包与账号登录、`account` 账号密码登录。
- I18n: default enabled; development defaults to `zh-Hans`, and production defaults to `en`; options are enabled language switching or disabled with language locked to `zh-Hans`.
- 多语言：默认启用；开发环境默认 `zh-Hans`，生产环境默认 `en`；可选项为启用语言切换，或关闭多语言功能并固定为 `zh-Hans`。
- Production chain: default BSC; options are BSC or other viem chain.
- 生产网络：默认 BSC；可选项为 BSC 或 other viem chain。
- DApp write policy: default gas check disabled, gas estimate disabled, ERC20 approval uses the maximum amount by default, and Token decimals default to 18; options are enabling the gas switches, approving a passed specific amount, or changing to other decimals confirmed by the project.
- DApp 写合约策略：默认关闭 Gas 检查、关闭 Gas 估算；ERC20 默认授权最大上限；Token 精度默认 18；可选项为开启 Gas 开关、按传入具体数值授权，或改成项目确认的其他精度。

### Template project prompt
### 已复制模板后的提示词

Use this prompt after the template files already exist in the project directory.
当模板文件已经存在于项目目录中时，使用下面的提示词。

```txt
我现在要基于这个 React H5 DApp 模板启动一个真实项目。

请先阅读 README.md、AGENTS.md、PROJECT_SETUP.md、PROJECT_TERMS.md、PROJECT_WORKFLOW.md 和 .env.example。

先运行 pnpm install、pnpm env:init 和 pnpm dev，让项目跑起来。

项目运行起来后，把 Vite 输出的 Local / Network 访问地址，尤其是局域网地址，和项目名询问、默认配置包一起发给我。

默认配置包里的默认项可以一起询问，但每项都要列出默认值、可选项和含义，不要只列默认值。我回复 `默认` 即全部采用；如果需要改，我会只说要改的字段，例如 `菜单 tabbar，多语言关闭`。

然后按 PROJECT_SETUP.md 继续初始化。除默认配置包外，项目特有配置尽量一次只问一项。

不要直接改代码，不要把模板默认值当成我的真实项目选择。

等你收集完初始化答案后，先汇总给我确认；我确认后你再回填项目文件。
```

## 2. First run checklist
## 2. 首次运行清单

Run these steps after the project folder is ready. The development server should be started before the first setup question is asked.
项目目录准备好后，按下面步骤运行。第一个初始化问题抛出前，应先启动开发服务。

1. Install dependencies.
1. 安装依赖。

```bash
pnpm install
```

2. Create local env files from `.env.example`.
2. 根据 `.env.example` 创建本地 env 文件。

```bash
pnpm env:init
```

3. Start the development server.
3. 启动开发服务。

```bash
pnpm dev
```

4. Report the Vite `Local` and `Network` URLs, especially the LAN address, together with the project name question and the default setup pack.
4. 将 Vite 输出的 `Local` 和 `Network` 访问地址，尤其是局域网地址，和项目名询问、默认配置包一起告诉开发者。

- The default setup pack can be accepted by replying `默认`.
- 默认配置包可以直接回复 `默认` 接受。
- Include available options and meanings for every default setup pack item.
- 默认配置包里的每一项都要写明可选项和含义。
- If defaults need changes, reply only with changed fields, for example `菜单 tabbar，多语言关闭`.
- 如需修改默认项，只回复要改的字段即可，例如 `菜单 tabbar，多语言关闭`。

5. Fill `.env.development` for local integration after the developer confirms the relevant setup item.
5. 开发者确认相关初始化项后，再填写 `.env.development` 用于本地联调。

6. Keep `.env.production` `VITE_BASE_URL` and `VITE_RPC_URL` empty unless the project rules are changed intentionally.
6. 除非项目规则明确调整，否则 `.env.production` 的 `VITE_BASE_URL` 和 `VITE_RPC_URL` 保持为空。

7. Ask whether the project logo resource is ready.
7. 询问项目 logo 资源是否已准备好：必须是正方形 PNG，建议 100x100。

- Generate the fixed 68x68 favicon from the logo with `pnpm favicon:generate`.
- favicon 由 logo 自动生成固定 68x68 尺寸：运行 `pnpm favicon:generate`，不要再向开发者索要 favicon。
- If there is no logo yet, it can be skipped during early development. Keep `public/brand/brand-status.json` not ready, and production build will be blocked.
- 如果暂时没有 logo，前期开发可先跳过。保持 `public/brand/brand-status.json` 为未就绪，生产构建会被阻止。

8. Confirm project-level settings in `src/config/app.ts`, usually through the default setup pack.
8. 确认 `src/config/app.ts` 中的项目级设置，通常通过默认配置包一次确认。

- The npm package name stays fixed as `@jcy/template-react`.
- npm 包名固定为 `@jcy/template-react`。
- Project name.
- 项目名。
- Route base and home route.
- 路由基础路径与首页路由。
- Layout menu type.
- Layout 菜单类型。
- Login mode.
- 登录模式。
- I18n switch.
- 多语言开关。
- DApp production chain and contract-write policies.
- DApp 生产网络与写合约策略。

9. Run the quality gates before starting real page work.
9. 开始真实页面开发前先跑质量门禁。

```bash
pnpm test
pnpm lint
pnpm build
```

## 3. Setup status file
## 3. 初始化状态文件

After setup, create `PROJECT_SETUP_STATUS.md` in the real project.
初始化完成后，在真实项目中创建 `PROJECT_SETUP_STATUS.md`。

Record only confirmed decisions and skipped items with their follow-up stage.
只记录已确认的决策，以及暂时跳过但需要在哪个阶段补齐的事项。

Suggested content:
建议内容：

```md
# Project setup status
# 项目初始化状态

## Confirmed
## 已确认

- Project name:
- Login mode:
- Layout menu type:
- I18n:
- Production chain:

## Local only
## 仅本地

- .env.development VITE_BASE_URL:
- .env.development VITE_RPC_URL:

## Later
## 后续补齐

- Project logo if it was skipped:
- Contract addresses:
- Social share meta:
- Page-specific assets:
```

## 4. Page implementation from Figma
## 4. 根据 Figma 开发页面

Do not write code immediately after receiving a Figma link.
拿到 Figma 链接后不要直接写代码。

First inspect the design, existing components, global styles, mixins, nearby pages and required assets.
先检查设计稿、已有组件、全局样式、mixin、相近页面和所需切图。

### Figma page prompt
### Figma 页面提示词

```txt
这是 Figma 页面链接：<粘贴链接>。

请先阅读 AGENTS.md、PROJECT_TERMS.md 和 PROJECT_WORKFLOW.md。

不要直接写代码。

请先输出页面实现清单，必须包括：

1. 需要我导出的切图资源，以及建议放到 src/assets/<page-name>/ 下的语义化文件名。
2. 页面语义结构：哪些地方用 button、input、textarea、img、nav 等。
3. 可复用组件：优先检查 src/components、src/shared/components、src/showcase。
4. 可复用样式：优先检查 src/styles 和已有 showcase。
5. 可复用 mixin。
6. 页面本身必须单独写的特殊样式。
7. 本地交互：tab、输入、展开收起、popup、copy 等。
8. 接口和合约 TODO。

等我确认清单后再实现。
```

## 5. Static page development order
## 5. 静态页面开发顺序

Use this order after the page checklist is confirmed.
页面清单确认后，按这个顺序实现。

1. Place required assets under `src/assets/<page-name>/`.
1. 将所需切图放入 `src/assets/<page-name>/`。
2. Create the page module directory.
2. 创建页面模块目录。
3. Create `PageName.tsx` and `PageName.scss`.
3. 创建 `PageName.tsx` 和 `PageName.scss`。
4. Register the route.
4. 注册路由。
5. Build semantic markup first.
5. 先写语义化结构。
6. Compose existing utility classes in `className` before writing page SCSS.
6. 写页面 SCSS 前，先在 `className` 中组合已有通用样式。
7. Add page-specific SCSS only for styles that cannot be expressed by utilities.
7. 只有通用样式无法表达时，才补页面私有 SCSS。
8. Implement local interactions even while API data is static.
8. 即使接口数据还没联调，也先实现基础本地交互。

### Page implementation prompt
### 页面实现提示词

```txt
请按刚才确认的页面实现清单开发这个页面。

要求：

1. 页面按模块目录创建。
2. 优先复用 src/components、src/shared、src/styles、src/styles/mixins.scss。
3. 如果 className 可以组合已有通用样式，就不要重复写页面 SCSS。
4. 缺少切图时暂停并告诉我缺哪些文件，不要用 CSS 或 emoji 临时替代。
5. 页面里的用户可见文案必须遵守 PROJECT_TERMS.md。
6. 完成后运行相关测试；如果涉及全局影响，再运行 pnpm test、pnpm lint、pnpm build。
```

## 6. Component development order
## 6. 组件开发顺序

Use this route when a page reveals a reusable UI pattern.
当页面里出现可复用 UI 模式时，按这个路线沉淀组件。

1. Confirm the component boundary and props.
1. 确认组件边界和参数。
2. Put reusable components under `src/components`.
2. 通用组件放在 `src/components`。
3. Put small shared display helpers under `src/shared/components`.
3. 小型共享展示组件放在 `src/shared/components`。
4. Add a `README.md` beside the component when the component is meant to be reused.
4. 可复用组件旁边补 `README.md`。
5. Add a showcase page for components that benefit from visual preview.
5. 需要视觉预览的组件补 showcase 页面。

### Component prompt
### 组件提示词

```txt
我想把这个页面里的 <组件描述> 沉淀成通用组件。

请先判断它应该放在 src/components 还是 src/shared/components。

然后总结 props、默认行为、插槽 children、自定义样式方式和使用场景。

确认后再创建组件、README 和 showcase 预览。
```

## 7. API integration order
## 7. 接口联调顺序

Use feature modules for business APIs.
业务接口放在 feature 模块中。

1. Put business API files under `src/features/<feature-name>/`.
1. 业务接口放在 `src/features/<feature-name>/`。
2. Use `src/services/http` for the shared request layer.
2. 统一请求层使用 `src/services/http`。
3. Keep endpoint functions small and named by business meaning.
3. 接口方法保持小而清晰，按业务含义命名。
4. After data integration, register real page refresh with `usePageRefresh()`.
4. 数据联调后，用 `usePageRefresh()` 注册真实页面刷新。
5. Use `useLatestRequest()` or `AbortController` to prevent stale data writes.
5. 使用 `useLatestRequest()` 或 `AbortController` 防止旧请求回写旧数据。

### API prompt
### 接口提示词

```txt
请给这个页面对接接口。

要求：

1. 业务接口放到 src/features/<feature-name>/api.ts。
2. 请求必须走 src/services/http 封装。
3. 页面刷新必须等待真实接口完成。
4. 如果页面有多次请求或定时刷新，使用 useLatestRequest 或 AbortController 防止旧数据覆盖新数据。
5. 接口字段不确定的位置写 TODO 注释，不要擅自编假字段。
```

## 8. DApp and contract integration order
## 8. DApp 与合约联调顺序

Use the DApp service module for wallet and contract behavior.
钱包与合约逻辑走 DApp 服务模块。

1. Confirm the production chain in project config.
1. 在项目配置中确认生产网络。
2. Put reusable contract helpers under `src/services/dapp`.
2. 通用合约辅助逻辑放在 `src/services/dapp`。
3. Put project-specific contract addresses in env.
3. 项目专属合约地址放在 env。
4. Check gas through the shared DApp write flow before contract writes.
4. 写合约前通过共享 DApp 写入流程检查 gas。
5. Use `ContractLoading` for contract writes that must block user interaction.
5. 写合约等待期间需要阻止用户操作时，使用 `ContractLoading`。
6. Refresh page data after contract writes through the same page refresh function.
6. 写合约成功后，复用页面刷新函数刷新数据。

### DApp prompt
### DApp 提示词

```txt
请给这个页面对接 DApp / 合约逻辑。

要求：

1. 先检查 src/services/dapp 已有封装，不要重复写钱包连接、网络切换、gas 检查和 ERC20 授权逻辑。
2. 写合约前使用模板已有的 gas 检查和合约写入策略。
3. 写合约等待期间使用 ContractLoading。
4. 写入成功后复用页面的刷新函数重新拉取接口或合约数据。
5. 如果 ABI 或合约地址缺失，暂停并列出缺失项。
```

## 9. Daily finish checklist
## 9. 每天收尾清单

Run these commands before saying the work is ready.
声明当天工作可交付前，运行下面命令。

```bash
pnpm test
pnpm lint
pnpm build
```

Then review whether any project changes should be fed back into the template.
然后复盘是否有适合反哺模板的通用改动。

## 10. Template feedback prompt
## 10. 模板反哺提示词

Use this prompt in a real project after several pages or modules have been built.
真实项目开发了一些页面或模块后，可以用下面提示词整理模板反馈。

```txt
请扫描当前项目相对 React H5 DApp 模板做过的改动。

只整理适合沉淀回模板的通用优化，不要包含业务强相关内容。

请重点关注：

1. 新增的通用组件。
2. 新增的 hooks。
3. 新增的样式工具类或 mixin。
4. 请求、登录、DApp、合约、storage、i18n 的通用优化。
5. Figma 页面开发中反复出现的规范问题。
6. 术语规范问题。
7. 新项目启动时容易踩坑的流程问题。

请输出到 docs/template-react-feedback.md，并按 TRF-001 这种编号列出。
```

## 11. What to do when you are unsure
## 11. 不知道下一步做什么时

If the project is not initialized, return to `PROJECT_SETUP.md`.
如果项目还没完成初始化，回到 `PROJECT_SETUP.md`。

If the project can run but no real page exists, start from the first Figma page checklist.
如果项目能运行但还没有真实页面，从第一个 Figma 页面清单开始。

If static pages exist but no data exists, start API and contract integration.
如果静态页面已有但没有真实数据，开始接口和合约联调。

If one-off code appears in multiple places, extract a component, hook or shared utility.
如果同类代码在多个地方出现，抽成组件、hook 或共享工具。

If a real project improves the template workflow, write feedback before the details are forgotten.
如果真实项目改进了模板流程，趁还没忘记时写入反馈文档。
