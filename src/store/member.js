import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useMember = defineStore('memData', () => {
    const memData = ref(); 



    return { memData }
},

    {
        persist: {
            key: 'Member',
            storage: sessionStorage
        }
    }
)