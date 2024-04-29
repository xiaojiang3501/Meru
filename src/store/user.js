import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUser = defineStore('userData', () => {
    const userData = ref({})



    return { userData}
    },

    {
        persist: {
            key: 'User',
            storage: localStorage
        }
    }

)
