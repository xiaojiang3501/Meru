import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'


export const useMessage = defineStore('mesData', () => {
    const messages = ref([])


    return { messages }
    },

)