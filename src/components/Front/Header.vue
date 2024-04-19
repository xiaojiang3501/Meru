<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const { cartData } = storeToRefs(useCart());

const userLink = () => {
    let token = sessionStorage.getItem('token');
    return token ? '/user' : '/login';

}

</script>
<template>
    <el-row class="header-container">
        <el-col :span="4" class="header-left">
                <router-link to="/" >
                    <img src="../../assets/logo.png">
                </router-link>
        </el-col>
        <el-col :span="8" class="header-right">
            <li><router-link to="/products" >Prouducts</router-link></li>
            <li><router-link to="/FAQ" >FAQ</router-link></li> 
            <li>
                <router-link to="/cart" >
                    <el-badge 
                    :value="cartData.length" 
                    :hidden="cartData.length === 0"
                    class="item" 
                    type="danger" >
                        <el-icon size="35px">
                            <ShoppingCart color="#6c6b6c" />
                        </el-icon>
                    </el-badge>
                </router-link>
            </li>
            <li>            
                <router-link :to="userLink()">
                    <el-icon size="35px">
                        <UserFilled color="#6c6b6c" />
                    </el-icon>
                </router-link>
            </li>

        </el-col>



    </el-row>
  </template>
  
  
<style lang="scss" scoped>
.header-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: center;
    background-color: white;
    position: relative;
}

.header-container::after {
    content: '';
    position: absolute;
    bottom: -20px; /* 調整波浪的高度 */
    left: 0;
    width: 100%;
    height: 40px; /* 調整波浪的高度 */
    background-image: radial-gradient(circle at 0 100%, transparent 20px, white 21px);
    mask: 
        radial-gradient(13.45px at 50% calc(100% - 19px), #000 99%, transparent 101%) calc(50% - 20px) 0/40px 100%,
        radial-gradient(13.45px at 50% calc(100% + 9px), transparent 99%, #000 101%) 50% calc(100% - 10px)/40px 100% repeat-x;
}
.header-left{
    margin: 1%;
    // border: 1px solid red;
    img{
        width: 45px;
    }
}
.header-right{
    display: flex;
    // border: 1px solid red;
    li{
        margin: 5%;
        line-height: 40px;
        font-size: 24px;
        a{
            color: #6c6b6c;
        }
        // border: 1px solid red;
    }
}

</style>