<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { ElNotification } from 'element-plus'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'

import { useProduct } from '@/store/product.js'
import { useCart } from '@/store/cart.js'
const { products } = storeToRefs(useProduct());
const { cartData } = storeToRefs(useCart());



// 獲取路由參數中的id
const id = parseInt(router.currentRoute.value.query.Product_ID);

// 使用計算屬性找到匹配的id
const selectedProduct = computed(() => products.value.find(product => product.Product_ID === id))


const num = ref(1)
function handleChange(value) {
    num.value = value;
}

const addCart = () => {
    const selectedProduct = products.value.find(product => product.Product_ID === id);
    const existingItem = cartData.value.find(item => item.id === selectedProduct.Product_ID);
    if (existingItem) {
        existingItem.count += num.value;
    } else {
        const newItem = {
            Product_ID: selectedProduct.Product_ID,
            image: selectedProduct.image,
            product_name: selectedProduct.product_name,
            price: selectedProduct.price,
            quantity: num.value,
            inventory: selectedProduct.inventory
        };
        cartData.value.push(newItem);
    }
    ElNotification({
    title: '成功加入購物車',
    // message: 'This is a success message',
    offset: 100,
  })
};

</script>

<template>
    <el-row  class="detail-wrapper">
        <el-col :xs="24" :sm="24" :md="24" :lg="10" class="detail-image">
            <img :src="`../public/products/${selectedProduct.image}`" alt="">
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="14" class="detail-contect" >
            <h4 >馬卡龍-{{ selectedProduct.product_name }}</h4>
            <h5>成分</h5>
            <p>{{ selectedProduct.ingredient }}</p>
            <br/>
            <h5>過敏成分</h5>
            <p>{{ selectedProduct.allergen }}</p>   
            <div style="display: flex;">            
                <span class="detail-price">NTD {{ selectedProduct.price }}
                </span>  
                <el-input-number 
                v-model="num" 
                :min="1"
                :max="selectedProduct.inventory"
                @change="handleChange" 
                class="detail-num" />
            </div>        
            <button class="detail-button" @click="addCart">加入購物車</button>
        </el-col>

    </el-row>
    
</template>

<style lang="scss" scoped>
.detail-wrapper {
    margin: 5% auto;
    width: 70%;
    .detail-image{
        img{
            display: block;
            width: 80%;
            margin: 0 auto;
        }
    }
    .detail-contect{
        padding: 5%;
        display: flex;
        flex-direction: column;
        h4{
            color: #EF7C8E;
        }
        h5{
            margin: 1% 0;
            color: #6c6b6c;
        }
        p{
            color: gray;
            font-weight: bold;
        }
        .detail-price{
            margin: 5% 5% 5% 0;
            font-size: 1.5rem;
            font-weight: bold;
            color: orange;
        }
        .detail-num{
            margin: 5% 0;
            display: flex;
            justify-self: flex-end;
        }
        .detail-button{
            width: 150px;
            background-color: #e9c8ce;
            color: white;
            border: 0;
        }
        .detail-button:hover{
            border: 0;
            background-color: #EF7C8E;
        }
    }
}
@media screen and (max-width: 1025px) {
    .detail-wrapper {
        width: 70%;
        .detail-image{
            img{
                width: 45%;
            }
        }
    }
}

@media screen and (max-width: 767px) {
    .detail-wrapper {
        width: 100%;
    }
}


</style>