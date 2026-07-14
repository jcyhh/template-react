# LanguageSwitch
语言切换入口组件。

This component is the React version of a small Vue slot wrapper.
这个组件可以理解为 Vue slot 包裹组件的 React 写法。

It renders `children` and opens the language switch popup when the wrapper is clicked.
它渲染 `children`，点击包裹层时打开语言切换弹窗。

The popup uses the shared `Picker` component, so it behaves like a mobile single-choice selector with a confirm button.
弹窗使用通用 `Picker` 组件，所以它是移动端常见的单选选择器，并带确认按钮。

Changing language goes through `changeAppLanguage()`, which updates i18next, localStorage, `<html lang>` and the app store together.
切换语言会统一走 `changeAppLanguage()`，它会同时更新 i18next、localStorage、`<html lang>` 和 app store。

After a new language is confirmed, the component waits for the Picker close animation to finish, then reloads the page so page-level APIs can request fresh data with the new `lang` header.
确认切换到新语言后，组件会先等待 Picker 关闭动画结束，再刷新页面，让页面级接口用新的 `lang` 请求头重新拉取数据。

`onOpen` is still exposed for temporary wiring, analytics or tests.
组件仍保留 `onOpen`，方便临时接入、埋点或测试。

```tsx
import { LanguageSwitch } from '@/components/LanguageSwitch'

<LanguageSwitch>
    <div>切换语言</div>
</LanguageSwitch>
```
