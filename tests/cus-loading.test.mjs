import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('cus loading wraps popup and renders the old gooey svg loader', async () => {
    const [component, styles, entry, readme] = await Promise.all([
        readFile('src/components/CusLoading/CusLoading.tsx', 'utf8'),
        readFile('src/components/CusLoading/CusLoading.scss', 'utf8'),
        readFile('src/components/CusLoading/index.ts', 'utf8'),
        readFile('src/components/CusLoading/README.md', 'utf8'),
    ])

    assert.match(component, /import \{ Popup \} from '@\/components\/Popup'/)
    assert.match(component, /show:\s*boolean/)
    assert.match(component, /const LOADING_DOTS = Array\.from\(\{ length: 7 \}/)
    assert.match(component, /<Popup\s+show=\{show\}/)
    assert.match(component, /position="center"/)
    assert.match(component, /contentPreset=\{false\}/)
    assert.match(component, /closeOnOverlayClick=\{false\}/)
    assert.match(component, /enterAnimation="fadeIn"/)
    assert.match(component, /leaveAnimation="fadeOut"/)
    assert.match(component, /<svg/)
    assert.match(component, /<linearGradient[\s\S]*id="cus-loading-gradient"/)
    assert.match(component, /stopColor="#50D6FC"/)
    assert.match(component, /stopColor="#1989F5"/)
    assert.match(component, /filter id="cus-loading-gooey"/)
    assert.match(component, /feGaussianBlur/)
    assert.match(component, /feColorMatrix/)
    assert.match(component, /LOADING_DOTS\.map/)
    assert.match(component, /cus-loading__dot/)
    assert.match(component, /<circle/)

    assert.match(styles, /\.cus-loading-popup/)
    assert.match(styles, /z-index:\s*1000000/)
    assert.match(styles, /\.cus-loading\s*\{/)
    assert.match(styles, /width:\s*300px/)
    assert.match(styles, /height:\s*300px/)
    assert.match(styles, /animation:\s*cus-loading-rotate 3s ease-in-out infinite/)
    assert.match(styles, /animation-delay:\s*calc\(0\.2s \* var\(--i\)\)/)
    assert.match(styles, /@keyframes cus-loading-rotate/)

    assert.match(entry, /export \{ CusLoading \} from '\.\/CusLoading\.tsx'/)
    assert.match(readme, /Popup/)
    assert.match(readme, /SVG/)
})
