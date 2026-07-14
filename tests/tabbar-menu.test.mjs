import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const tabbarMenuSource = await readFile(
    new URL('../src/layouts/AppLayout/TabbarMenu.tsx', import.meta.url),
    'utf8',
)
const layoutConfigSource = await readFile(
    new URL('../src/layouts/AppLayout/config.ts', import.meta.url),
    'utf8',
)
const tabbarStyleSource = await readFile(
    new URL('../src/layouts/AppLayout/AppLayout.scss', import.meta.url),
    'utf8',
)

test('tabbar uses the retained home and user icon assets with active variants', () => {
    assert.match(layoutConfigSource, /home\.png/)
    assert.match(layoutConfigSource, /homeAct\.png/)
    assert.match(layoutConfigSource, /user\.png/)
    assert.match(layoutConfigSource, /userAct\.png/)
    assert.match(layoutConfigSource, /layoutMenuIconMap/)
    assert.match(layoutConfigSource, /export const layoutMenuItems = appRouteItems\.map/)
    assert.match(tabbarMenuSource, /layoutMenuItems\.map/)
    assert.match(tabbarMenuSource, /isActive \? item\.activeIcon : item\.icon/)
    assert.match(tabbarMenuSource, /flex-1/)
    assert.match(tabbarMenuSource, /flex-column/)
    assert.match(tabbarMenuSource, /size-24/)
    assert.match(tabbarMenuSource, /app-color/)
    assert.match(tabbarMenuSource, /className="img-44"/)
    assert.match(tabbarMenuSource, /isActive \? 'mt-4' : 'mt-4 opc-5'/)
    assert.doesNotMatch(tabbarMenuSource, /app-tabbar__icon/)
    assert.doesNotMatch(tabbarMenuSource, /app-tabbar__text/)
    assert.doesNotMatch(tabbarMenuSource, /showGap/)
})

test('tabbar keeps the old mobile bottom bar visual style', () => {
    assert.match(tabbarStyleSource, /\.app-tabbar\s*\{/)
    assert.match(tabbarStyleSource, /background:\s*#000000/)
    assert.match(tabbarStyleSource, /border-top:\s*1px solid rgba/)
    assert.match(tabbarStyleSource, /border-radius:\s*30px 30px 0 0/)
    assert.match(tabbarStyleSource, /&__bar\s*\{/)
    assert.match(tabbarStyleSource, /height:\s*100px/)
    assert.doesNotMatch(tabbarStyleSource, /#FFFFFF80/)
    assert.doesNotMatch(tabbarStyleSource, /&__link/)
    assert.doesNotMatch(tabbarStyleSource, /&__icon/)
    assert.doesNotMatch(tabbarStyleSource, /&__text/)
    assert.match(tabbarMenuSource, /gap-100/)
    assert.match(tabbarMenuSource, /safe-bottom/)
})
