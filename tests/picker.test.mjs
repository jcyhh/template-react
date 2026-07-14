import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('picker wraps popup and swiper into a reusable mobile picker', async () => {
    const [component, styles, entry, readme, packageJson] = await Promise.all([
        readFile('src/components/Picker/Picker.tsx', 'utf8'),
        readFile('src/components/Picker/Picker.scss', 'utf8'),
        readFile('src/components/Picker/index.ts', 'utf8'),
        readFile('src/components/Picker/README.md', 'utf8'),
        readFile('package.json', 'utf8'),
    ])

    assert.match(packageJson, /"swiper":/)
    assert.match(component, /import \{ Swiper, SwiperSlide \} from 'swiper\/react'/)
    assert.match(component, /import 'swiper\/css'/)
    assert.match(component, /import \{ Empty \} from '@\/components\/Empty'/)
    assert.match(component, /import \{ Popup \} from '@\/components\/Popup'/)
    assert.match(component, /show:\s*boolean/)
    assert.match(component, /options:\s*PickerOption\[\]/)
    assert.match(component, /defaultIndex\?:\s*number/)
    assert.match(component, /value\?:\s*number/)
    assert.match(component, /allowEmpty\?:\s*boolean/)
    assert.match(component, /renderOption\?:/)
    assert.match(component, /onChange\?:/)
    assert.match(component, /onConfirm\?:/)
    assert.match(component, /onAfterClose\?:/)
    assert.match(component, /onAfterClose=\{onAfterClose\}/)
    assert.match(component, /contentPreset=\{false\}/)
    assert.match(component, /position="bottom"/)
    assert.match(component, /direction="vertical"/)
    assert.match(component, /slidesPerView="auto"/)
    assert.match(component, /centeredSlides/)
    assert.match(component, /onSwiper=\{handleSwiper\}/)
    assert.match(component, /onSlideChange=\{handleSlideChange\}/)
    assert.match(component, /swiperRef\.current\?\.slideTo/)
    assert.match(component, /handleConfirm/)
    assert.match(component, /Icon name="cross"/)
    assert.match(component, /<Empty text=\{emptyText\} \/>/)
    assert.doesNotMatch(component, /picker__empty/)

    assert.match(styles, /\.picker\s*\{/)
    assert.match(styles, /&__swiper/)
    assert.match(styles, /\.swiper-slide-active/)
    assert.doesNotMatch(styles, /&__empty/)
    assert.match(entry, /export \{ Picker \} from '\.\/Picker\.tsx'/)
    assert.match(entry, /export type \{ PickerConfirmPayload, PickerOption, PickerProps \} from '\.\/Picker\.tsx'/)
    assert.match(readme, /Popup/)
    assert.match(readme, /Swiper/)
})
