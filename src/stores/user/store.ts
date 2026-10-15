import { create } from 'zustand'

import { getToken } from '../../services/storage/token.ts'

import type { UserStoreState } from './types.ts'

export const useUserStore = create<UserStoreState>()((set) => ({
    isAuthenticated: Boolean(getToken()),
    isSessionReady: !getToken(),
    markSessionReady: () => set({ isSessionReady: true }),
    markSignedIn: () => set({ isAuthenticated: true, isSessionReady: true }),
    markSignedOut: () => set({ isAuthenticated: false, isSessionReady: true }),
}))
