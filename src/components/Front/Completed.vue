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



//步驟條
const active = ref(2)
const next = () => {
    if (active.value++ > 2) active.value = 2
}
const prev = () => {
    if (active.value-- > 2) active.value = 1
    router.push({
        path: "/cart",
    })
}


</script>

<template>
    <el-row>
        <div class="form">
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
            

            <div class="form-buttom">
                <div class="form-sum">
                    合計：<span class="sum">{{sum}}</span>
                </div>
                <div class="form-next">
                    <el-button @click="prev">上一步</el-button>
                </div>
                <div class="form-next">
                    <el-button @click="next">完成</el-button>
                </div>

            </div>
        </div>
    </el-row>

</template>


<style lang="scss" scoped>
.form{
    width: 70%;
    margin: 5% auto;
    .form-step{
        margin: 3% auto;

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
  