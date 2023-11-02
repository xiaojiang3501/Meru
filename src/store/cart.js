import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useCart = defineStore('cartData', () => {
    const cartData = ref([]); //購物車數據



    return { cartData }
},

    {
        persist: {
            key: 'Cart',
            storage: sessionStorage
        }
    }
)
