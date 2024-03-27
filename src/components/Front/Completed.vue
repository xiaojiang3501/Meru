<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
const { userData } = storeToRefs(useUser());
import { useCart } from '@/store/cart.js'
const { cartData, total_price, pay, ship, payee, payee_phone, payment_address } = storeToRefs(useCart());

import axios from 'axios'

const apiUrl = 'http://localhost:4000/user';
console.log(payee.value)

const newOrder = reactive({
    Member_ID: userData.value.user.Member_ID,
    account: userData.value.user.account,
    payee: payee.value, 
    payment_address: payment_address.value,
    payee_phone: payee_phone.value,
    pay: pay.value,
    ship: ship.value,
    total_price: total_price.value,
    order_state: '待處理',
    pay_state: '未支付',
    items: cartData.value,
});

console.log(newOrder)

//步驟條
const active = ref(2)
const completed = () => {
    axios.post(apiUrl + '/create-order', newOrder)
    if (active.value++ > 2) active.value = 2
    // localStorage.clear();

}
const prev = () => {
    if (active.value-- > 2) active.value = 1
    router.push({
        path: "/form",
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


            <div class="form-detail">
                <h6>商品</h6>
                <el-table 
                :default-sort="{ prop: 'date',order: 'descending' }"
                :header-cell-style="{textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                :data="cartData"
                class="cart-table"
                >
                <el-table-column prop="image" label="商品圖片" width="150" >
					<!-- !-- 使用插槽自定义列的内容 -->
					<template #default="{ row }">
						<img :src="`../public/products/${row.image}`" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
					</template>
				</el-table-column>
                <el-table-column prop="name" label="商品名稱" />
                <el-table-column prop="count" label="數量"  width="180" />

                </el-table>
                <h6>配送方式<span >{{ship}}</span></h6>
                <h6>付款方式<span >{{pay}}</span></h6>
                <h6>收件人姓名<span >{{payee}}</span></h6>
                <h6>收件人電話<span >{{payee_phone}}</span></h6>
                <h6>收件人地址<span >{{payment_address}}</span></h6>
                <h6>合計<span >{{total_price}}</span></h6>
            </div>

            

            <div class="form-buttom">

                <div class="form-next">
                    <el-button @click="prev">上一步</el-button>
                </div>
                <div class="form-next">
                    <el-button @click="completed">完成</el-button>
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
        .form-next{
            margin-left: 10px;
        }

    }
    .form-detail{
        border: 1px solid #ebeef5;
        border-radius: 10px;
        margin: 5% auto;
        padding: 5%;
        h6{
            margin: 3% 0;
        }
        span{
            margin-left: 3%;
            color: gray;
        }
    }


}
</style>
  