import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

test('tabbar first-level pages keep matching page directories and files', () => {
    const firstLevelPages = [
        {
            dir: 'home',
            component: 'HomePage',
        },
        {
            dir: 'user',
            component: 'UserPage',
        },
    ]

    for (const page of firstLevelPages) {
        assert.equal(existsSync(`src/pages/${page.dir}`), true)
        assert.equal(existsSync(`src/pages/${page.dir}/${page.component}.tsx`), true)
        assert.equal(existsSync(`src/pages/${page.dir}/${page.component}.scss`), true)
    }

    assert.equal(existsSync('src/pages/sidebar/SidebarPage.tsx'), false)
    assert.equal(existsSync('src/pages/tabbar/TabbarPage.tsx'), false)
})
