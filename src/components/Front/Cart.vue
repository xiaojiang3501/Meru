<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const { cartData, total_price, pay, ship } = storeToRefs(useCart());

const options1 = [
    { value: 'ATM轉帳', label: 'ATM轉帳', },
]
const options2 = [
    { value: '宅配', label: '宅配',},
]

onMounted(() => {
    pay.value = '';
    ship.value = '';
    total_price.value = 0;
});

//小計
const subtotal = ref(0);
const selectedItems = ref([]);
const handleSubtotal = (items) => {
    selectedItems.value = items;
    if (Array.isArray(items)) {
        subtotal.value = 0;
        items.forEach((item) => {
            subtotal.value += item.price * item.quantity;
        });
    }
}

//運費
const freight = ref(0);
watch(ship, (newOption, oldOption) => {
    if (!newOption) {
    // 如果 ship 的新值是空字符串， freight 等於 0
    freight.value = 0;
    } else if (newOption === 'Option1' || newOption === 'Option2') {
        freight.value = 60;
    } else {
        freight.value = 80;
    }
});

//優惠碼
const promo = ref(0);
const promoCode = ref('');
const handlePromo = () => {
    promo.value = promoCode.value === 'meru' ? 50 : 0;
};

watch(promoCode, () => {
    handlePromo();
});

//合計
const handleSum = () => {
    total_price.value = subtotal.value + freight.value - promo.value 
}

watch([subtotal, freight, promo], () => {
  handleSum();
});


//刪除
const handleDelete = (i) => {
    cartData.value.splice(i, 1);
    handleSubtotal();
};

//步驟條
const active = ref(0)
const next = () => {
    // console.log(selectedItems.value.length)
    if(selectedItems.value.length == 0){
        ElMessage.error('請勾選商品');
        return; 
    }else{
        if(pay.value && ship.value ){
            if (active.value++ > 2) active.value = 0
            router.push({ path: "/form"})
        }else{
            ElMessage({
                type: 'error',
                message: '請選擇付款方式和運送方式',
            });
        }
    }


}


</script>

<template>
    <el-row>
        <el-col :xs="24" :sm="22" :md="18" :lg="16" class="cart-container">
            <!-- 步驟條 -->
            <el-steps 
            :active="active" 
            finish-status="success" 
            align-center 
            class="cart-step">
                <el-step title="購物車" />
                <el-step title="填寫資料" />
                <el-step title="訂單確認" />
            </el-steps>

            <el-table 
            class="cart-table"
            :default-sort="{ prop: 'date',order: 'descending' }"
            :header-cell-style="{background:'#e9c8ce',color:'white',textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="cartData" 
            @selection-change="handleSubtotal">

                <el-table-column type="selection" width="55" >
                </el-table-column>

                <el-table-column prop="image" label="商品圖片" width="100" >
					<!-- !-- 使用插槽自定义列的内容 -->
					<template #default="{ row }">
						<img :src="`../public/products/${row.image}`" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
					</template>
				</el-table-column>

                <el-table-column prop="product_name" label="商品名稱" />

                <el-table-column label="數量"  width="180">
                    <template #default="{ row }">
                        <el-input-number 
                        v-model="row.quantity"  
                        :min="1" 
                        @change="handleQuantityChange(row)" />
                    </template>
                </el-table-column> 

                <el-table-column prop="price" label="單價">
                    <template #default="{ row }">
                        <span>{{row.price}}</span>
                    </template>
                </el-table-column> 

                <el-table-column label="小計">
                    <template  #default="{ row }">
                        <span>{{row.price*row.quantity}}</span>
                    </template>
                </el-table-column> 

                <el-table-column fixed="right" label="操作" width="80" class="edit">
                <template  #default="{ row }">
                    <el-button
                    link
                    size="large"
                    type="danger"
                    @click="handleDelete(row)">刪除</el-button>
                </template>
                </el-table-column>
                    
            </el-table>

            <div class="cart-center">
                <div class="cart-info">
                    <div class="cart-header">選擇付款及運送方式</div>
                    <div class="cart-select">
                        <span>付款方式</span>
                        <el-select v-model="pay" class="m-2" placeholder="請選擇"
                        style="width: 70%">
                            <el-option
                            v-for="item in options1"
                            :key="item.pay"
                            :label="item.label"
                            :value="item.value"/>
                        </el-select>

                    </div>
                    <div class="cart-select">
                        <span>運送方式</span>
                        <el-select v-model="ship" class="m-2" placeholder="請選擇"
                        style="width: 70%">
                            <el-option
                            v-for="item in options2"
                            :key="item.ship"
                            :label="item.label"
                            :value="item.value"/>
                        </el-select>

                    </div>
                    <div class="cart-select">
                        <span>優惠碼</span>
                        <el-input v-model="promoCode" style="width: 75%"></el-input>

                    </div>    
                </div>


                <div class="cart-price">
                    <div class="cart-header">訂單金額計算</div>
                    <div class="cart-sum">
                    
                        <div class="price">
                            <span>小記</span>
                            <span>{{subtotal}}</span>
                        </div>
                        <div class="price">
                            <span>運費</span>
                            <span>{{freight}}</span>
                        </div>
                        <div class="price">
                            <span>優惠金</span>
                            <span>{{promo}}</span>
                        </div>
                        <div class="cart-line"></div>
                        <div class="price">
                            <span>合計</span>
                            <span>{{total_price}}</span>
                        </div>
                        
                    </div>
    
                </div>

            </div>

            <div class="cart-buttom">
                <div class="cart-next">
                    <el-button  @click="next">下一步</el-button>
                </div>
            </div>

        </el-col>
    </el-row>

</template>


<style lang="scss" scoped>
.cart-container{
    margin: 5% auto;
}

.cart-step{
    margin: 5% auto;
}
.cart-center{
    display: flex;
    justify-content: space-between;
    margin: 2% 0;
    font-size: 1rem;
    color: #606266;
}
.cart-header{
    width: 100%;
    height: 35px;
    background-color: #e9c8ce;
    color: white;
    font-weight: bold;
    text-align: center;
    line-height: 35px;
}
.cart-info{
    background-color: white;
    width: 49%;

    .cart-select{
        margin: 25px 40px;
        span{
            margin-right: 15px;
        }
    }
}
.cart-price{
    background-color: white;
    width: 49%;
    .cart-sum{
        margin: 20px 40px;
        .price{
            display: flex;
            justify-content: space-between;
        }
        span{
            margin: 1% 0;
        }
    }
}
.cart-line{
    border: 1px solid #ebeef5;
    margin: 2% 0;
}
.cart-buttom{
    display: flex;
    justify-content: flex-end;
    margin: 3% auto;
}
.el-button{
    color: #ef7d8d;
    --el-button-hover-border-color:#ef7d8d;
    --el-button-hover-bg-color:#fcf0f2;
    --el-button-active-border-color:#ef7d8d;
}

@media screen and (max-width: 767px) {
    .el-table-column[label="商品圖片"] {
        width: 60px;
    }
    .cart-container{
        margin: 0;
        padding: 5%;
    }
    .cart-center{
        display: block;
        margin: 5% 0;
    }
    .cart-info{
        width: 100%;
        height: 250px;
        margin: 5% 0;
        .cart-select{
            margin: 25px 40px;
            span{
                margin-right: 15px;
            }
        }
    }
    .cart-price{
        width: 100%;
        height: 200px;
        .cart-sum{
            margin: 20px 40px;
            .price{
                display: flex;
                justify-content: space-between;
            }
            span{
                margin: 1% 0;
            }
        }
    }
    .cart-buttom{
        justify-content: center;
    }

}


</style>
  