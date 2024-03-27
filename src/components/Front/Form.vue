<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const { payee, payee_phone, payment_address } = storeToRefs(useCart());
import { useUser } from '@/store/user.js'
const { userData } = storeToRefs(useUser());
import { useRule } from '@/store/rule.js'
const { rule } = storeToRefs(useRule());

const FormRef = ref(null);
const checked = ref(false)
//訂購人
const form1 = reactive({
    name: userData.value.name,
    address: userData.value.address,
    phone: userData.value.phone

}) 

//收件人
const form2 = reactive({
    payee:'',
    payee_phone:'',
    payment_address: ''
}) 

watch(form2, () => {
    payee.value = form2.payee;
    payee_phone.value = form2.payee_phone;
    payment_address.value = form2.payment_address;
}, { deep: true })


const same = () => {
    if (!checked.value) {
        form2.payee = userData.value.user.name;
        form2.payee_phone= userData.value.user.phone;
        form2.payment_address = userData.value.user.address;
    } else {
        form2.payee = '';
        form2.payee_phone = '';
        form2.payment_address = '';
    }
};

//步驟條
const active = ref(1)

const next =  () => {
    FormRef.value.validate((valid) => {
        if (valid) {
            if (active.value++ > 2) active.value = 0;
            router.push({
            path: '/completed'
            });
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
                class="form1" >
                    <h5 class="form-title">訂購人</h5>
                    <el-form-item label="姓名">
                        <el-input disabled v-model="userData.user.name" />
                    </el-form-item>
                    <el-form-item label="電話">
                        <el-input disabled v-model="userData.user.phone"/>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input disabled v-model="userData.user.address" />
                    </el-form-item>
                </el-form>


                <el-form 
                :model="form2" 
                ref="FormRef" 
                :rules="rule" 
                class="form2">
                    <el-checkbox v-model="checked" class="form-same" @click="same">同上</el-checkbox>
                    <h5 class="form-title">收件人</h5>
                    <el-form-item label="姓名" prop="payee">
                        <el-input v-model="form2.payee" />
                    </el-form-item>
                    <el-form-item label="電話" prop="payee_phone">
                        <el-input v-model="form2.payee_phone"/>
                    </el-form-item>
                    <el-form-item label="地址" prop="payment_address">
                        <el-input v-model="form2.payment_address" />
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
  