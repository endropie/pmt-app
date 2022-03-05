
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './auth'


export const useApiWithAuth = () => {
  const { access_token } = useAuth()

  const token = access_token?.value

  return useApi(token)
}

export const useApi = (access_token?: string) => {
  const router = useRouter()
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8800',
    headers: {
      Authorization: access_token ? `Bearer ${access_token}` : undefined,
    }
  })

  const data = ref()
  const loading = ref(false)
  const error = ref<AxiosError>()

  const request = <T = unknown>(request: AxiosRequestConfig) => {
    loading.value = true
    error.value = undefined

    return api.request(request)
      .then(response => {
        data.value = response.data as T
      })
      .catch((e: AxiosError) => {
        error.value = e

        throw e
      })
      .finally(() => loading.value = false)
  }

  const get = <T = unknown>(url: string, config: AxiosRequestConfig) => {
    return request<T>({
      ...config,
      url,
      method: 'GET',
    })
  }

  const post = <T = unknown>(url: string, config: AxiosRequestConfig) => {
    return request<T>({
      ...config,
      url,
      method: 'POST',
    })
  }

  const errorMessage = computed(() => {
    console.log('?? compute', error.value);

    return error.value?.message
  })

  const errorDetails = computed(() => {
    return ((error.value?.response?.data) as Record<string, string[]>) || null
  })

  watch([error], () => {
    // If 401 Unauthorised, force user to buy a new subscription
    if (error.value?.response?.status === 401 && router) {
      void router.push('/subscribe')
    }
  })

  return {
    request,
    post,
    get,
    loading,
    data,
    error,
    errorMessage,
    errorDetails,
  }
}
