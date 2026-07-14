import { create } from 'zustand'

import { DEFAULT_LANGUAGE_CODE, findAppLanguage } from '../../i18n/config.ts'
import { getLanguage } from '../../services/storage/index.ts'
import type { AppStoreState } from './types.ts'

function getInitialLanguageCode(): string {
    const language = findAppLanguage(getLanguage())
        ?? findAppLanguage(DEFAULT_LANGUAGE_CODE)

    return language?.code ?? DEFAULT_LANGUAGE_CODE
}

export const useAppStore = create<AppStoreState>()((set) => ({
    languageCode: getInitialLanguageCode(),

    setLanguageCode(languageCode) {
        const language = findAppLanguage(languageCode)
        if (!language) return

        set({ languageCode: language.code })
    },
}))
