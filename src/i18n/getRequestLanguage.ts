import { getLanguage } from '../services/storage/index.ts'
import {
    DEFAULT_LANGUAGE_CODE,
    findAppLanguage,
} from './config.ts'

export function getRequestLanguage(): string {
    const language = findAppLanguage(getLanguage())
        ?? findAppLanguage(DEFAULT_LANGUAGE_CODE)
    return language?.code ?? DEFAULT_LANGUAGE_CODE
}
