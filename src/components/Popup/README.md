# Popup
基础弹窗组件。

`Popup` only handles the base popup behavior: full-screen overlay, show state, close callback, position, animation, body scroll lock and destroy after close.
`Popup` 只处理基础弹窗逻辑：全屏遮罩、显示状态、关闭回调、位置、动画、锁定页面滚动，以及关闭后销毁。

The popup content is fully provided through `children`.
弹窗内容完全通过 `children` 自定义。

This is the React version of using `van-popup` only for its base popup logic while keeping the inner UI custom.
这相当于 React 版“只使用 van-popup 的底层弹出逻辑，内部 UI 完全自定义”。

```tsx
import { Popup } from '@/components/Popup'

<Popup
    show={show}
    position="bottom"
    onClose={() => setShow(false)}
>
    <div className="language-popup">
        自定义内容
    </div>
</Popup>
```

## Props
## 参数

- `show`: controls whether the popup is visible.
- `show`：控制弹窗是否显示。
- `children`: custom popup content, like a Vue slot.
- `children`：自定义弹窗内容，类似 Vue slot。
- `onClose`: called when the overlay requests closing.
- `onClose`：遮罩触发关闭时调用。
- `position`: `center`, `right`, `left` or `bottom`; default is `center`.
- `position`：支持 `center`、`right`、`left`、`bottom`，默认 `center`。
- `closeOnOverlayClick`: whether clicking the overlay closes the popup; default is `true`.
- `closeOnOverlayClick`：点击遮罩是否关闭弹窗，默认 `true`。
- `backdrop`: whether the overlay uses the backdrop blur style; default is `true`.
- `backdrop`：遮罩是否使用 backdrop 模糊样式，默认 `true`。
- `enterAnimation` and `leaveAnimation`: custom animate.css animation names.
- `enterAnimation` 和 `leaveAnimation`：自定义 animate.css 动画名。

Custom animation names can be passed with or without the `animate__` prefix.
自定义动画名可以带或不带 `animate__` 前缀。
