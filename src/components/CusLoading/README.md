# CusLoading
自定义全屏 loading。

This component is the React version of the old Vue `CusLoading` overlay.
这个组件是老 Vue `CusLoading` 遮罩的 React 版本。

It uses the shared `Popup` for overlay, scroll locking and destroy-on-close behavior, then renders the loader with inline SVG.
它使用通用 `Popup` 处理遮罩、锁滚动和关闭销毁，再用内联 SVG 绘制 loading。

The colors are hard-coded for now, matching the current template stage.
当前颜色先写死，符合模板当前阶段。

```tsx
import { CusLoading } from '@/components/CusLoading'

<CusLoading show={loading} />
```
