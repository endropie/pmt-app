import { reactive, toRefs } from 'vue'
import { ErrorInstance, ErrorState } from './utils'


export const useError = (): ErrorInstance => {
  const state = reactive<ErrorState>({
    error: {
      response: {
        items: {},
        has(key: string) {
          return Boolean(typeof this.items[key] !== 'undefined')
        },
        first(key: string) {
          if (this.items[key]) {
            return this.items[key][0] || null
          }
          return null
        },
        set(items: Record<string, string[]>) {
          this.items = items
        },
        reset() {
          this.items = {}
        },
      }
    }
  })


  return {
    ...toRefs(state),
  }
}
