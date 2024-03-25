import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useCart = defineStore('cartData', () => {
    const cartData = ref([]); //購物車數據
    const sum = ref(0)
    const pay = ref('')
    const ship = ref('')


    return { cartData, sum, pay, ship }
},

    {
        persist: {
            key: 'Cart',
            storage: localStorage
        }
    }
)
