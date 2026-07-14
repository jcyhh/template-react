# Picker
选择器组件。

The picker combines the shared `Popup` with Swiper's vertical touch slider.
这个组件组合了项目内的 `Popup` 和 Swiper 的竖向滑动能力。

It follows the old Vue `CusPicker` behavior: open a bottom popup, slide or tap to choose an item, then confirm and return the selected index and option.
它延续老 Vue `CusPicker` 的行为：底部弹窗打开，滑动或点击选择，点击确认后返回选中下标和选项。

## Usage
用法。

```tsx
<Picker
    show={showPicker}
    options={coinOptions}
    defaultIndex={currentIndex}
    title="请选择"
    onClose={() => setShowPicker(false)}
    onConfirm={({ index, option }) => {
        setCurrentIndex(index)
        console.log(option)
    }}
/>
```

Use `renderOption` when an option needs custom content such as token icons or multi-line labels.
如果选项需要图标、多行文案等自定义内容，使用 `renderOption`。
