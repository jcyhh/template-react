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

## Verification
## 验证

Run tests, build and lint before claiming a change is complete.
声明改动完成前需要运行测试、构建和 lint。

At minimum, run `pnpm test`, `pnpm build` and `pnpm lint`.
至少运行 `pnpm test`、`pnpm build` 和 `pnpm lint`。

## Test design
## 测试设计

Test stable business behavior and module contracts, not incidental presentation values or human-maintained file ordering.
测试稳定的业务行为和模块契约，不测试偶然的展示数值或人工维护的文件排序。

For configurable settings, verify that code reads the setting and behaves consistently with its current value. Do not hard-code a chosen size, color, switch value, env field list, or env order unless it is an explicit immutable requirement.
对于可配置项，验证代码确实读取该设置且行为与当前值一致。除非用户明确要求其不可变，否则不要写死尺寸、颜色、开关值、env 字段清单或 env 排序。
