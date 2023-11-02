import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useHome = defineStore('homeData', () => {
    const homeData = ref({})


    return { homeData }
    },

)