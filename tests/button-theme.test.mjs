import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('button structures consume the project skin and optional skins compose with either structure', async () => {
    const [mixins, utilities, tokens] = await Promise.all([
        readFile('src/styles/mixins.scss', 'utf8'),
        readFile('src/styles/common/common.scss', 'utf8'),
        readFile('src/styles/color.scss', 'utf8'),
    ])
    assert.equal((mixins.match(/\$bg:\s*var\(--app-btn-bg\)/g) ?? []).length, 2)
    assert.match(tokens, /--app-btn-bg:/)
    for (const skin of ['solid', 'gradient', 'gradient-border']) {
        assert.match(utilities, new RegExp(`\\.btn-${skin}\\s*\\{`))
    }
    assert.match(utilities, /\.full-btn\s*\{\s*@include full-button/)
    assert.match(utilities, /\.auto-btn\s*\{\s*@include auto-button/)
})
