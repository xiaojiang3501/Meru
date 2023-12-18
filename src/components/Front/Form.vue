<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
import { useUser } from '@/store/user.js'
import { useRule } from '@/store/rule.js'

const { userData } = storeToRefs(useUser());
const { cartData } = storeToRefs(useCart());
const { rule } = storeToRefs(useRule());


import axios from 'axios'

const apiUrl = 'http://localhost:4000/orders';
const FormRef = ref(null);
const checked = ref(false)

const form1 = reactive({
    user_name: userData.value.personal.user_name,
    address: userData.value.personal.address,
    phone: userData.value.personal.phone

}) //收件人

const form2 = reactive({
    user_name:'',
    address:'',
    phone: ''

}) //收件人

const recipient = {
    user_name:form2.user_name,
    address:form2.address,
    phone: form2.phone
}

onMounted(() => {

})

const same = () => {
    if (!checked.value) {
        form2.user_name = userData.value.personal.user_name;
        form2.phone= userData.value.personal.phone;
        form2.address = userData.value.personal.address;
    } else {
        form2.user_name = '';
        form2.phone = '';
        form2.address = '';
    }
};

//步驟條
const active = ref(1)

const next =  () => {
    FormRef.value.validate( (valid) => {
        if (valid) {
            if (active.value++ > 2) active.value = 0;
            router.push({
            path: '/completed'
            });
        }else {
            console.log("error submit!!");
        }
    });
    
};

const prev = () => {
    if (active.value-- > 2) active.value = 0
    router.push({ path: "/cart"})
}


</script>

<template>
    <el-row>
        <div class="form-container">
            <!-- 步驟條 -->
            <el-steps 
            :active="active" 
            finish-status="success" 
            align-center 
            class="-step">
                <el-step title="購物車" />
                <el-step title="填寫資料" />
                <el-step title="訂單確認" />
            </el-steps>

            <div class="form-table">
                <el-form 
                :model="form1" 
                :rules="rule" 
                ref="FormRef" 
                class="form1" >
                    <h5 class="form-title">訂購人</h5>
                    <el-form-item label="姓名" prop="user_name" >
                        <el-input v-model="userData.personal.user_name" />
                    </el-form-item>
                    <el-form-item label="電話" prop="phone">
                        <el-input v-model="userData.personal.phone"/>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="userData.personal.address" />
                    </el-form-item>
                </el-form>


                <el-form 
                :model="form2" 
                class="form2">
                    <el-checkbox v-model="checked" class="form-same" @click="same">同上</el-checkbox>
                    <h5 class="form-title">收件人</h5>
                    <el-form-item label="姓名">
                        <el-input v-model="form2.user_name" />
                    </el-form-item>
                    <el-form-item label="電話">
                        <el-input v-model="form2.phone"/>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form2.address" />
                    </el-form-item>
                </el-form>
            </div>

            <div class="form-buttom">
                <div class="form-sum">
                    合計：<span class="sum">{{sum}}</span>
                </div>
                <div class="form-next">
                    <el-button @click="prev">上一步</el-button>
                </div>
                <div class="form-next">
                    <el-button @click="next(FormRef)">下一步</el-button>
                </div>

            </div>
        </div>
    </el-row>

</template>


<style lang="scss" scoped>
.form-container{
    width: 70%;
    margin: 5% auto;

    .form-step{
        margin: 3% auto;

    }
    .form-table{
        display: flex;
        margin: 5% auto;
        background-color: white;
        border: 1px solid #ebeef5;

        border-radius: 10px;
        .form1, .form2{
            margin: 5%;
            padding: 5%;
            width: 50%;
            // border: 1px solid red;
            position: relative;

        }
        .form-title{
            margin-bottom: 5%;
        }
    }

    .form-buttom{
        display: flex;
        justify-content: flex-end;
        margin: 3% auto;
        .form-sum{
        margin: 0 3%;
        font-size: 20px;
        }
        .sum{
            color: red;
        }
        .form-next{
            margin-left: 10px;
        }

    }

}
.form-same{
    position: absolute;
    top: 10px;
}
</style>
  