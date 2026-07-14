import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import { APP_LANGUAGES } from '../src/i18n/config.ts'

test('header bar connect button uses the shared i18n link text', async () => {
    const component = await readFile('src/layouts/AppLayout/HeaderBar/HeaderBar.tsx', 'utf8')

    assert.match(component, /useTranslation/)
    assert.match(component, /const \{ t \} = useTranslation\(\)/)
    assert.match(component, /\{t\('链接'\)\}/)
    assert.doesNotMatch(component, />链接</)
})

test('header bar renders the 100px gap by default and allows hiding it', async () => {
    const component = await readFile('src/layouts/AppLayout/HeaderBar/HeaderBar.tsx', 'utf8')

    assert.match(component, /type HeaderBarProps/)
    assert.match(component, /showGap\?: boolean/)
    assert.match(component, /showGap = true/)
    assert.match(component, /showGap \? <div className="gap-100" \/> : null/)
})

test('header menu icon only renders in sidebar layout mode', async () => {
    const component = await readFile('src/layouts/AppLayout/HeaderBar/HeaderBar.tsx', 'utf8')
    const layout = await readFile('src/layouts/AppLayout/AppLayout.tsx', 'utf8')

    assert.match(component, /showSidebarMenu\?: boolean/)
    assert.match(component, /onSidebarMenuClick\?: \(\) => void/)
    assert.match(component, /showSidebarMenu = false/)
    assert.match(component, /showSidebarMenu \? \(/)
    assert.match(component, /src=\{headerMenuUrl\}/)
    assert.match(component, /onClick=\{onSidebarMenuClick\}/)
    assert.match(component, /alt="Menu"/)
    assert.match(layout, /<HeaderBar/)
    assert.match(layout, /showSidebarMenu=\{isSidebarLayout\}/)
    assert.match(layout, /onSidebarMenuClick=\{handleOpenSidebarMenu\}/)
})

test('all enabled common locales include the short link text', async () => {
    const commonMessages = await Promise.all(
        APP_LANGUAGES.map(async ({ code }) => ({
            code,
            messages: JSON.parse(
                await readFile(`src/i18n/locales/common/${code}.json`, 'utf8'),
            ),
        })),
    )

    for (const { code, messages } of commonMessages) {
        assert.equal(
            typeof messages['链接'],
            'string',
            `${code} should include 链接`,
        )
        assert.notEqual(messages['链接'].trim(), '', `${code} 链接 should not be empty`)
    }
})
