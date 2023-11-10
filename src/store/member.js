import { ref, onMounted, computed, reactive } from 'vue'
import { defineStore } from "pinia";

export const useMember = defineStore('memData', () => {
    const members = ref([]); 



    return { members }
},

    {
        persist: {
            key: 'Member',
            storage: sessionStorage
        }
    }
)