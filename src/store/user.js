import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore('userData', () => {
    const userData = ref({})

    const clearToken = () => {
        // access_token.value = ""
        // userData = {}
    }

    return { userData, clearToken}
    },
    {
        persist: {
            key: 'User',
            storage: localStorage
        }
    }
)
