import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useProduct = defineStore('proData', () => {
    const products = ref([])


    return { products,  }
    },
    {
        persist: {
            key: 'Products',
            storage: sessionStorage
        }
    }
)
