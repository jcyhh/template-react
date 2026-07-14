import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('icon component provides a local inline svg icon contract', async () => {
    const [component, config, styles, entry, readme] = await Promise.all([
        readFile('src/components/Icon/Icon.tsx', 'utf8'),
        readFile('src/components/Icon/config.ts', 'utf8'),
        readFile('src/components/Icon/Icon.scss', 'utf8'),
        readFile('src/components/Icon/index.ts', 'utf8'),
        readFile('src/components/Icon/README.md', 'utf8'),
    ])

    assert.match(component, /name:\s*IconName/)
    assert.match(component, /getIconDefinition\(name\)/)
    assert.match(component, /return null/)
    assert.match(component, /fill="currentColor"/)
    assert.match(component, /className=\{iconClassName\}/)
    assert.match(component, /aria-hidden/)
    assert.match(component, /<title>\{title\}<\/title>/)
    assert.match(component, /normalizeIconSize\(size\)/)

    assert.match(config, /ICON_DEFINITIONS/)
    assert.match(config, /'arrow'/)
    assert.match(config, /'arrow-left'/)
    assert.match(config, /'arrow-up'/)
    assert.match(config, /'arrow-down'/)
    assert.match(config, /'cross'/)
    assert.match(config, /'scan'/)
    assert.match(config, /paths:\s*IconPathDefinition\[\]/)
    assert.match(config, /viewBox/)
    assert.match(config, /getIconDefinition/)

    assert.match(styles, /\.app-icon\s*\{/)
    assert.match(styles, /width:\s*1em;/)
    assert.match(styles, /height:\s*1em;/)
    assert.match(styles, /color:\s*currentColor;/)

    assert.match(entry, /export \{ Icon \} from '\.\/Icon\.tsx'/)
    assert.match(entry, /export type \{ IconName, IconProps \} from '\.\/Icon\.tsx'/)
    assert.match(readme, /currentColor/)
    assert.match(readme, /Vant/)
})
