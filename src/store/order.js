import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useOrder = defineStore('orderData', () => {
    const orders = ref([]); //購物車數據



    return { orders }
},

    {
        persist: {
            key: 'Order',
            storage: sessionStorage
        }
    }
)