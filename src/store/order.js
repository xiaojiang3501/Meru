import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useOrder = defineStore('orderData', () => {
    const orderData = ref([]); //購物車數據



    return { orderData }
},

    {
        persist: {
            key: 'Order',
            storage: sessionStorage
        }
    }
)