<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/product.js'
const getprodata = useProduct();
const { products } = storeToRefs(getprodata);

onMounted(() => {
    fetchData()
})

const fetchData = () => {
    // fetch('api/products')
    fetch('http://localhost:3000/products')
    .then(data => data.json())
    .then(data => {
        console.log(data); 
        products.value = data;

    })
}

const filteredProducts = computed(() => products.value.filter(item => item.product_suspend === true));

//跳轉頁面
const goDetail = (product_id) => {
    router.push({
        path: "/productsdetail",
        query:{
            product_id
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
            :key="item.product_id" 
            class="item" 
            @click="goDetail((item.product_id))">
                <img :src="item.image" alt="">
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

        }
    }

}

</style>