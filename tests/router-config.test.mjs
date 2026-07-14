import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
    APP_ROUTE_BASE,
    APP_ROUTER_BASENAME,
    DEFAULT_LAYOUT_MENU_TYPE,
    LAYOUT_MENU_TYPE,
    LAYOUT_MENU_TYPE_OPTIONS,
} from '../src/router/config.ts'
import { ROUTE_PATH, appRouteItems } from '../src/router/routes.ts'

test('router uses the fixed h5 base path for history mode', () => {
    assert.equal(APP_ROUTE_BASE, '/h5/')
    assert.equal(APP_ROUTER_BASENAME, '/h5')
})

test('router derives the home path from the project-level home route name', async () => {
    const [routesSource, routerConfigSource] = await Promise.all([
        readFile(new URL('../src/router/routes.ts', import.meta.url), 'utf8'),
        readFile(new URL('../src/router/config.ts', import.meta.url), 'utf8'),
    ])

    assert.equal(ROUTE_PATH.home, '/home')
    assert.match(routerConfigSource, /export const APP_HOME_ROUTE_NAME\s*=\s*APP_CONFIG\.homeRouteName/)
    assert.match(routesSource, /home:\s*`\/\$\{APP_HOME_ROUTE_NAME\}`/)
    assert.doesNotMatch(routesSource, /home:\s*'\/home'/)
})

test('layout exposes the supported menu modes for templates', () => {
    assert.deepEqual(LAYOUT_MENU_TYPE, {
        tabbar: 'tabbar',
        sidebar: 'sidebar',
    })
    assert.deepEqual(LAYOUT_MENU_TYPE_OPTIONS, ['tabbar', 'sidebar'])
    assert.equal(DEFAULT_LAYOUT_MENU_TYPE, 'sidebar')
})

test('route records keep an initial layout route with starter pages', () => {
    assert.equal(ROUTE_PATH.root, '/')
    assert.equal(ROUTE_PATH.referral, '/ref/:ref')
    assert.equal(ROUTE_PATH.home, '/home')
    assert.equal(ROUTE_PATH.user, '/user')
    assert.deepEqual(
        appRouteItems.map(({ path }) => path),
        ['/home', '/user'],
    )
    assert.deepEqual(
        appRouteItems.map(({ title }) => title),
        ['首页', '我的'],
    )
})

test('app starts from the splash page before entering layout pages', async () => {
    const source = await readFile(
        new URL('../src/router/AppRouter.tsx', import.meta.url),
        'utf8',
    )

    assert.match(source, /import \{ SplashPage \}/)
    assert.match(source, /<Route path=\{ROUTE_PATH\.root\} element=\{<SplashPage \/>\} \/>/)
    assert.match(source, /<Route path=\{ROUTE_PATH\.referral\} element=\{<SplashPage \/>\} \/>/)
    assert.match(source, /<Route path="\*" element=\{<Navigate to=\{ROUTE_PATH\.root\} replace \/>\} \/>/)
})
