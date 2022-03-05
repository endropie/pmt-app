
import { reactive, toRefs } from 'vue'
import { AxiosError } from 'axios'
import { api, setHeader, unsetHeader } from 'src/boot/axios'
import { Notify, LocalStorage } from 'quasar'
import { LoginCredentials, UserRegister, LoginResponse, AuthState, User, UserResponse, AuthInstance } from 'src/types/auth'
import { useError } from 'src/types/error'

const AUTH_KEY = 'auth-token',
  AUTH_HEADER_KEY = 'Authorization',
  AUTH_LOGIN_URI = '/api/auth/login',
  AUTH_REGISTER_URI = '/api/auth/register',
  AUTH_USER_URI = '/api/auth/user'

if (LocalStorage.getItem(AUTH_KEY)) {
  setHeader(AUTH_HEADER_KEY, LocalStorage.getItem(AUTH_KEY) as string)
}

const state = reactive<AuthState>({
  user: undefined,
  expired_at: undefined,
  access_token: undefined,
  loading: false,
})

export const useAuth = (): AuthInstance => {

  const token = LocalStorage.getItem(AUTH_KEY) as string

  const { error } = useError()

  const expiring = (): void => {
    LocalStorage.remove('authorization')
    state.user = undefined
  }

  const setAuthToken = (data: LoginResponse): void => {
    // console.warn('SET TOKEN', data.access_token);
    if (data.access_token) {
      setHeader(AUTH_HEADER_KEY, `Bearer ${data.access_token}`)
      LocalStorage.set(AUTH_KEY, data.access_token)
    }
  }

  const setUser = (user: User): void => {
    state.user = user
  }

  const authenticated = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log('AUTHENRICATED', state.user?.name)

      if (state.user) resolve(true)

      else if (token) {
        state.loading = true

        api.get<UserResponse>(AUTH_USER_URI, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            setHeader(AUTH_HEADER_KEY, `Bearer ${token}`)
            setUser(response.data.data)
            resolve(true)
          })
          .catch((e: AxiosError) => {
            console.error(e.response || e);
            resolve(false)
            if (e.response?.status === 401) {
              expiring()
            }
            if (e.response?.status === 422) {
              error.value.response.set(e.response.data as Record<string, string[]>)
            }
          })
          .finally(() => {
            state.loading = false
          })
      }

      else resolve(false)
    })
  }

  const register = (data: UserRegister) => {

    return new Promise((resolve, reject) => {
      state.loading = true

      api.post<LoginResponse>(AUTH_REGISTER_URI, data)
        .then((response) => {
          setUser(response.data.user)
          resolve(response.data)
        })
        .catch((e: AxiosError) => {
          console.error(e.response || e)
          Notify.create({ message: 'REGISTER FAILED', caption: e.message, color: 'negative' })
          if (e.response?.status === 422) {
            error.value.response.set(e.response.data as Record<string, string[]>)
          }
          reject(e)
        })
        .finally(() => {
          state.loading = false
        })
    })
  }

  const login = (data: LoginCredentials) => {

    return new Promise((resolve, reject) => {

      state.loading = true

      api.post<LoginResponse>(AUTH_LOGIN_URI, data)
        .then((response) => {
          console.warn('LOGIN', response)
          setAuthToken(response.data)
          resolve(response.data)
        })
        .catch((e: AxiosError) => {
          console.error('LOGIN', e.response?.data || e)
          Notify.create({
            message: 'LOGIN FAILED',
            classes: 'text-medium',
            caption: e.message,
            color: 'negative'
          })
          reject(e)
        })
        .finally(() => {
          state.loading = false
        })
    })
  }

  const logout = (): Promise<void> => {
    unsetHeader(AUTH_HEADER_KEY)
    LocalStorage.remove(AUTH_KEY)
    return Promise.resolve(state.user = undefined)
  }

  return {
    error,
    login,
    logout,
    register,
    authenticated,
    ...toRefs(state),
  }

}
