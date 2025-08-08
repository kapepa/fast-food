import { getCurrentUser } from 'lib/appwrite'
import { User } from 'type'
import { create } from 'zustand'

type AuthStore = {
  user: User | null,
  isLoading: boolean,
  isAuthenticated: boolean,

  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void,
  setIsAuthenticated: (value: boolean) => void,
  fetchAuthenticatedUser: () => Promise<void>,
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true, })
    try {
      const user = await getCurrentUser();

      if (user) set({ isAuthenticated: true, user: user as unknown as User });
      else set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("fetchAuthenticatedUser error", error)
      set({ isAuthenticated: false, user: null })
    } finally {
      set({ isLoading: false, })
    }
  },
}))

export { useAuthStore }