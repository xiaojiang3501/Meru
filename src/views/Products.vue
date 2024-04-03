<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/product.js'
const { products } = storeToRefs(useProduct());
// ===============Other===================================
import axios from 'axios'


const apiUrl = 'http://localhost:4000/backstage/product';

onMounted(() => {
    fetchData()
})

//抓資料
const fetchData = async () => {
	const response = await axios.post(apiUrl);
    products.value = response.data.data;
}


const filteredProducts = computed(() => products.value.filter(item => item.product_suspend === true));

//跳轉頁面
const goDetail = (Product_ID) => {
    router.push({
        path: "/productsdetail",
        query:{
            Product_ID
        }

    })
}


</script>

<template>
    <el-row>
        <div class="products-benner"></div>
        <div class="products-wrapper">
            
            <div 
            v-for="item in filteredProducts" 
            :key="item.Product_ID" 
            class="item" 
            @click="goDetail((item.Product_ID))">
                <img :src="`../public/products/${item.image}`" alt="">
                <h5>{{ item.product_name }}</h5>
            </div>

        </div>
        
    </el-row>
    
</template>

<style lang="scss" scoped>
.products-benner{
    width: 100%;
    height: 50px;
    background-color: palevioletred;
}
.products-wrapper{
    display: flex;
    flex-wrap: wrap;
    margin: 5% auto;
    width: 80%;
    // border: 1px solid black;
    .item{
        width: 180px;
        margin: 20px;
        text-align: center;
        cursor: pointer;
        // border: 1px solid red;
        img{
            margin: 0 auto;
            display: block;
            width: 150px;
            height: 150px;

        }

    }
    .item:hover{
        transform: scale(1.1);
        color: gray;
    }
}

</style>