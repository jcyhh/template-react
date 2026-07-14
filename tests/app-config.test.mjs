import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
    APP_CONFIG,
    APP_LAYOUT_MENU_TYPE,
    APP_LAYOUT_MENU_TYPE_OPTIONS,
} from '../src/config/app.ts'
import { DEFAULT_LANGUAGE_CODE } from '../src/i18n/config.ts'
import { STORAGE_DEFAULT } from '../src/services/storage/config.ts'

test('app config stores project-level startup options', () => {
    assert.equal(APP_CONFIG.name, '')
    assert.equal(APP_CONFIG.routeBase, '/h5/')
    assert.equal(APP_CONFIG.routerBasename, '/h5')
    assert.equal(APP_CONFIG.homeRouteName, 'home')
    assert.equal(APP_CONFIG.defaultLayoutMenuType, APP_LAYOUT_MENU_TYPE.sidebar)
    assert.equal(APP_CONFIG.defaultLanguageCode, 'zh-Hans')
})

test('layout menu type is a mutually exclusive project-level choice', () => {
    assert.deepEqual(APP_LAYOUT_MENU_TYPE_OPTIONS, [
        APP_LAYOUT_MENU_TYPE.tabbar,
        APP_LAYOUT_MENU_TYPE.sidebar,
    ])
    assert.equal(
        APP_LAYOUT_MENU_TYPE_OPTIONS.includes(APP_CONFIG.defaultLayoutMenuType),
        true,
    )
})

test('app config reads the app name from the Vite env', async () => {
    const source = await readFile(new URL('../src/config/app.ts', import.meta.url), 'utf8')

    assert.match(source, /name:\s*import\.meta\.env\?\.VITE_APP_NAME\s*\?\?\s*''/)
})

test('feature modules read shared project defaults from app config', () => {
    assert.equal(DEFAULT_LANGUAGE_CODE, APP_CONFIG.defaultLanguageCode)
    assert.equal(STORAGE_DEFAULT.language, APP_CONFIG.defaultLanguageCode)
})
