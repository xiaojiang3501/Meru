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
    const existingItem = cartData.value.find(item => item.id === selectedProduct.id);
    if (existingItem) {
        existingItem.count += num.value;
    } else {
        const newItem = {
            id: selectedProduct.Product_ID,
            image: selectedProduct.image,
            name: selectedProduct.product_name,
            price: selectedProduct.price,
            inventory: selectedProduct.inventory,
            count: num.value
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
    <el-row class="detail-wrapper">

        <div class="detail-image">
            <img :src="`../public/products/${selectedProduct.image}`" alt="">
        </div>

        <div class="detail-contect" >
            <h4 >馬卡龍-{{ selectedProduct.product_name }}</h4>
            <h5>成分</h5>
            <p>{{ selectedProduct.ingredient }}</p>
            <br/>
            <h5>過敏成分</h5>
            <p>{{ selectedProduct.allergen }}</p>
            <span class="detail-price">價錢:{{ selectedProduct.price }}
            </span>            
            <el-input-number 
            v-model="num" 
            :min="1"
            :max="products.inventory"
            @change="handleChange" 
            class="detail-num"/>
            <button class="detail-button" @click="addCart">加入購物車</button>
        </div>

    </el-row>
    
</template>

<style lang="scss" scoped>
.detail-wrapper {
    width: 80%;
    margin: 5% auto;
    .detail-image{
        width: 50%;
        img{
            display: block;
            width: 350px;
            // border: 1px solid green;
            margin: 0 auto;
        }
    }
    .detail-contect{
        padding: 20px;
        display: flex;
        flex-direction: column;
        h5{
            margin: 1% 0;
        }
        p{
            width: 450px;
        }
        .detail-price{
            margin: 8% 0 3%;
            font-size: 20px;
            color: red;
        }
        .detail-num{
            margin: 5% 0;
            display: flex;
            justify-self: flex-end;
        }
        .detail-button{
            width: 150px;
            background-color: pink;
            color: white;
            border: 0;
        }
        .detail-button:hover{
            border: 0;
            background-color: #EF7C8E;
        }
    }

}

</style>