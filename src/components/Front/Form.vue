<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'

import { useCart } from '@/store/cart.js'
const getcartdata = useCart();
const { cartData } = storeToRefs(getcartdata);



//合計

const form = reactive({
    name: '', 
    address: '',
    phone: ''
})

const form2 = reactive({
    name: '', 
    address: '',
    phone: ''
})

//步驟條
const active = ref(1)
const next = () => {
    if (active.value++ > 2) active.value = 0
    router.push({
        path: "/completed",
    })
}
const prev = () => {
    if (active.value-- > 2) active.value = 0
    router.push({
        path: "/cart",
    })
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
                <el-form :model="form" class="form1">
                    <h5>填寫資料</h5>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="電話">
                        <el-input v-model="form.phone"/>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address" />
                    </el-form-item>
                </el-form>

                <el-checkbox class="form-same">同上</el-checkbox>

                <el-form :model="form2" class="form2">
                    <h5>收件人</h5>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="電話">
                        <el-input v-model="form.phone"/>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address" />
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
                    <el-button @click="next">下一步</el-button>
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
        padding: 5%;
        border: 1px solid rgb(184, 184, 184);
        .form1, .form2{
            padding: 5%;
            width: 50%;
            border: 1px solid red;
        }
    }

    .form-buttom{
        display: flex;
        justify-content: flex-end;
        margin: 3% auto;

    }
    .form-sum{
        margin: 0 3%;
        font-size: 20px;
    }
    .sum{
        color: red;
    }

}
</style>
  