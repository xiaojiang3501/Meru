import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useCart = defineStore('cartData', () => {
    const cartData = ref([]); //購物車數據
    const total_price = ref(0)
    const pay = ref('')
    const ship = ref('')

    const payee = ref('')
    const payee_phone = ref('')
    const payment_address = ref('')

    return { cartData, total_price, pay, ship, payee, payee_phone, payment_address}
},

    {
        persist: {
            key: 'Cart',
            storage: localStorage
        }
    }
)
