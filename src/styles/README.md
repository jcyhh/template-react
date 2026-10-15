# Shared styles
公共样式。

Write page styles in SCSS and compose existing utility classes in JSX before adding private declarations. `pnpm stylelint` rejects declarations already represented by global utilities; `pnpm lint:tsx-styles` rejects JSX inline styles. Both checks skip `src/vendor` and `src/third-party`.
页面使用 SCSS，新增私有声明前先在 JSX 组合现有工具类。`pnpm stylelint` 拦截已有工具类对应的重复声明，`pnpm lint:tsx-styles` 拦截 JSX 内联样式。两类规则都排除 `src/vendor` 和 `src/third-party`。

Pair every legacy `vh`/`vw` declaration with an immediately following matching `dvh`/`dvw` declaration. This includes values inside `calc()`.
所有传统 `vh`/`vw` 声明后紧接匹配的 `dvh`/`dvw` 声明，包括 `calc()` 内的值。

Use `full-btn` or `full-button()` for full-width actions and `auto-btn` or `auto-button()` for content-width actions. Both structures consume `--app-btn-bg` and `--app-btn-color` by default.
通栏操作使用 `full-btn` 或 `full-button()`，内容自适应操作使用 `auto-btn` 或 `auto-button()`。两种结构默认读取 `--app-btn-bg` 和 `--app-btn-color`。

Compose optional skins with either structure: `full-btn btn-solid`, `auto-btn btn-gradient`, or `full-btn btn-gradient-border`. Configure the corresponding `--app-btn-*` variables in `color.scss`; the template colors are replaceable defaults. Header controls and other scene-specific actions keep their own component styles.
可选皮肤可与任意结构组合：`full-btn btn-solid`、`auto-btn btn-gradient` 或 `full-btn btn-gradient-border`。在 `color.scss` 配置对应 `--app-btn-*` 变量，模板颜色只是可替换默认值。Header 等场景控件在自己的组件中维护样式。

Popup gradient-card tokens represent background images. Keep `--app-popup-gradient-card-bg` and `--app-popup-gradient-card-border` as gradients, including two identical stops for a solid appearance, because the mixin uses multiple background layers.
Popup 渐变卡片变量代表背景图像。`--app-popup-gradient-card-bg` 和 `--app-popup-gradient-card-border` 必须保持渐变；需要纯色效果时使用两个相同颜色的色标，因为 mixin 会将它们组成多层背景。
