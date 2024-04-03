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
                            <ShoppingCart color="#EF7C8E" />
                        </el-icon>
                    </el-badge>
                </router-link>
            </li>
            <li>            
                <router-link :to="userLink()">
                    <el-icon size="35px">
                        <UserFilled color="#EF7C8E" />
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

}
.header-left{
    margin: 1%;
    // border: 1px solid red;
    img{
        width: 60px;
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
            color: #EF7C8E;
        }
        // border: 1px solid red;
    }
}

</style>