<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { CircleCheck } from '@element-plus/icons-vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
import { useCart } from '@/store/cart.js'
const { userData } = storeToRefs(useUser());
const { cartData, total_price, pay, ship, payee, payee_phone, payment_address } = storeToRefs(useCart());
// ===============Other===================================
import axios from 'axios'


const apiUrl = 'http://localhost:4000/user';

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
    ship_state: '未出貨',
    items: cartData.value,
});



//步驟條
const active = ref(2)
const prev = () => {
    if (active.value-- > 2) active.value = 1
    router.push({
        path: "/form",
    })
}
const completed = () => {
    if (active.value++ > 2) active.value = 2

    axios.post(apiUrl + '/create-order', newOrder)
    console.log(newOrder)
    
    ElMessageBox.alert('將跳回首頁', '訂單已成功送出', { //內容,標題
        showConfirmButton: false,
        type: 'success',
        center: true,
        icon: markRaw(CircleCheck),
	});
    localStorage.clear();
    cartData.value = [];
    total_price.value = 0;
    pay.value = '';
    ship.value = '';
    payee.value = '';
    payee_phone.value = '';
    payment_address.value = '';

    router.push({path: "/",})
    
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
                <el-table-column prop="image" label="商品圖片" width="100" >
					<!-- !-- 使用插槽自定义列的内容 -->
					<template #default="{ row }">
						<img :src="`../public/products/${row.image}`" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
					</template>
				</el-table-column>
                <el-table-column prop="product_name" label="商品名稱" />
                <el-table-column prop="quantity" label="數量"  width="100" />

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
        background-color: white;
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

.el-message-box__headerbtn{
    border: 1px solid  red;
}
.el-button{
    color: #ef7d8d;
    --el-button-hover-border-color:#ef7d8d;
    --el-button-hover-bg-color:#fcf0f2;
    --el-button-active-border-color:#ef7d8d;
}

@media screen and (max-width: 767px) {
    .form{
        width: 90%;
        margin: 5% auto;
        .form-step{
            margin: 3% auto;

        }
        .form-buttom{
            justify-content: center;
            margin: 3% auto;
            .form-next{
                margin-left: 10px;
            }

        }
        .form-detail{
            margin: 5% auto;
            padding: 5%;
            h6{
                margin: 3% 0;
            }
            span{
                margin-left: 3%;
            }
        }
    }
}
</style>
  