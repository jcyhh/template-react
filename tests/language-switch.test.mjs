import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('language switch exposes a reusable children wrapper module', async () => {
    const [component, entry, readme] = await Promise.all([
        readFile('src/components/LanguageSwitch/LanguageSwitch.tsx', 'utf8'),
        readFile('src/components/LanguageSwitch/index.ts', 'utf8'),
        readFile('src/components/LanguageSwitch/README.md', 'utf8'),
    ])

    assert.match(component, /children:\s*ReactNode/)
    assert.match(component, /useState\(false\)/)
    assert.match(component, /import \{ Picker/)
    assert.match(component, /APP_LANGUAGES/)
    assert.match(component, /changeAppLanguage/)
    assert.match(component, /useAppStore/)
    assert.match(component, /useTranslation/)
    assert.match(component, /useRef/)
    assert.match(component, /onClick=\{handleOpenLanguageSwitch\}/)
    assert.match(component, /setShowLanguagePopup\(true\)/)
    assert.match(component, /setShowLanguagePopup\(false\)/)
    assert.match(component, /<Picker\s+show=\{showLanguagePopup\}/)
    assert.match(component, /options=\{LANGUAGE_PICKER_OPTIONS\}/)
    assert.match(component, /value=\{pendingLanguageIndex\}/)
    assert.match(component, /onChange=\{handleLanguagePickerChange\}/)
    assert.match(component, /onConfirm=\{handleLanguagePickerConfirm\}/)
    assert.match(component, /onAfterClose=\{handleLanguagePopupAfterClose\}/)
    assert.match(component, /confirmedLanguageCodeRef\.current = option\.value/)
    assert.match(component, /closeLanguageSwitch\(\)/)
    assert.match(component, /async function handleLanguagePopupAfterClose/)
    assert.match(component, /const languageCodeToChange = confirmedLanguageCodeRef\.current/)
    assert.match(component, /const hasLanguageChanged = option\.value !== languageCode/)
    assert.match(component, /if \(!hasLanguageChanged\) return/)
    assert.match(component, /window\.location\.reload\(\)/)
    assert.match(component, /\{children\}/)
    assert.match(entry, /export \{ LanguageSwitch \} from '\.\/LanguageSwitch\.tsx'/)
    assert.match(readme, /children/)
    assert.match(readme, /Vue slot/)
    assert.match(readme, /Picker/)
    assert.match(readme, /reloads the page/)
})
