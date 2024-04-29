import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRule = defineStore('Rule', () => {
    //表單驗證規則
    const rule = ref({
        //使用者名字
        name: [
            { required: true, message: '請输入名字', trigger: 'blur' }
        ],
        //使用者帳號
        account: [
            { required: true, message: '請输入帳號', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '請輸入1-20位英數字', trigger: 'blur' }
        ],
        //使用者密碼
        password: [
            { required: true, message: '請输入密碼', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '請輸入6-20位英數字', trigger: 'blur' }
        ],
        //使用者信箱
        email: [
            { required: true, message: '請输入信箱', trigger: 'blur' },
        ],
        //使用者地址
        address: [
            { required: true, message: '請输入地址', trigger: 'blur' },
            { type: 'email', message: '邮箱填写不正确', trigger: 'blur' }
        ],
        //使用者電話
        phone: [
            { required: true, message: '請输入電話', trigger: 'blur' },
            { pattern: /^[0-9]{1,20}$/, message: '請輸入1-20位數字', trigger: 'blur' }
        ],
        //商品名字
        product_name:[
            {required:true, message:'请输入名字', trigger:'blur'},
            {min: 1, max:10, message:'請輸入1-10位字符長度', trigger:'blur'}
        ],
        //成分
        ingredient:[
            {required:true, message:'请输入成分', trigger:'blur'}
        ],
        //過敏原
        allergen:[
            {required:true, message:'请输入過敏原', trigger:'blur'}
        ],
        //價格
        price:[
            {required:true, message:'请输入價格', trigger:'blur'},
            {min:1, max:6, message:'請輸入1-6位數字', trigger:'blur'},
            
        ],
        //庫存
        inventory:[
            {required:true, message:'请输入庫存', trigger:'blur'},
            {min:1, max:6, message:'請輸入1-6位數字', trigger:'blur'}
        ]
    });


    return { rule }
    },
    
)
