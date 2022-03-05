
import { reactive, toRefs } from 'vue'
import { AxiosError } from 'axios'
import { api, setHeader, unsetHeader } from 'src/boot/axios'
import { Notify, LocalStorage } from 'quasar'
import { AccessState, AccessCredentials, AccessResponse } from 'src/types/access'

const ACCESS_KEY = 'accessable-token',
  ACCESS_TYPE_KEY = 'accessable-type',
  ACCESS_HEADER_KEY = 'X-Accessable',
  ACCESS_STORE_URI = '/api/common/accessable',
  ACCESS_FETCH_URI = '/api/common/accessable';

if (LocalStorage.getItem(ACCESS_KEY)) {
  setHeader(ACCESS_HEADER_KEY, LocalStorage.getItem(ACCESS_KEY) as string)
}

const state = reactive<AccessState>({
  data: undefined,
  type: undefined,
  access_token: undefined,
})

export const useAccessable = () => {

  const token = LocalStorage.getItem(ACCESS_KEY) as string

  const setAccess = (data: AccessResponse): void => {
    console.warn('setAccessAbility', data);
    state.data = data.data
  }

  const setToken = (data: AccessResponse): void => {
    console.warn('setAccessToken', data);
    if (data.access_token) {
      setHeader(ACCESS_HEADER_KEY, `Accessable ${data.access_token}`)
      LocalStorage.set(ACCESS_KEY, data.access_token)
      LocalStorage.set(ACCESS_TYPE_KEY, data.type)
    }
  }

  const accessabled = async () => {
    return new Promise((resolve) => {
      console.log('Accessbilited', state.data?.name)

      if (state.data) resolve(true)

      else if (token) {
        api.get<AccessResponse>(ACCESS_FETCH_URI, { headers: { 'X-Accessable': `Accessable ${token}` } })
          .then((response) => {
            setHeader(ACCESS_HEADER_KEY, `${response.data.type} ${token}`)
            setAccess(response.data)
            resolve(true)
          })
          .catch((error: AxiosError) => {
            console.error(error.response || error);
            if (error?.response?.status === 401) {
              clear()
            }
            resolve(false)
          })
      }

      else return resolve(false)
    })
  }

  const access = (data: AccessCredentials) => {
    console.warn('ACCESS', data);

    return new Promise((resolve, reject) => {

      api.post<AccessResponse>(ACCESS_STORE_URI, data)
        .then((response) => {
          console.warn('ACCESS', response)
          setToken(response.data)
          resolve(response.data)
        })
        .catch((error: AxiosError) => {
          console.error('ACCESS', error.response || error)
          Notify.create({
            message: 'LOGIN FAILED',
            classes: 'text-medium',
            caption: error.message,
            color: 'negative'
          })
          reject(error)
        })
    })
  }

  const clear = () => {
    LocalStorage.remove(ACCESS_HEADER_KEY)
    LocalStorage.remove(ACCESS_TYPE_KEY)
    unsetHeader(ACCESS_KEY)
  }

  return {
    clear,
    access,
    accessabled,
    ...toRefs(state),
  }

}
