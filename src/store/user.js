import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore('userData', () => {
    const userData = ref({})
    const setToken = (token) => {

    }
    const clearToken = () => {
        user
    }

    return { userData,  setToken, clearToken}
    },
    {
        persist: {
            key: 'User',
            storage: localStorage
        }
    }
)
