import { create } from 'zustand'

import type { UserStoreState } from './types.ts'

export const useUserStore = create<UserStoreState>()(() => ({}))
