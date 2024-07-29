<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const { cartData } = storeToRefs(useCart());


const notLogin = ref(sessionStorage.getItem('token')=== null);

onMounted(() => {
    notLogin.value = sessionStorage.getItem('token') === null;
})

watch(notLogin, (newValue) => {
    console.log('notLogin 的值改變為：', newValue);
});

const userLink = () => {
    let token = sessionStorage.getItem('token');
    return token ? '/user' : '/login';
}


// 登出
const Logout = () => {
    notLogin.value = true;
    sessionStorage.removeItem('User')
    sessionStorage.removeItem('token')
    router.push({ path: "/" })
    alert("成功登出")
}



</script>
<template>
    <el-row class="header-container">
        <el-col :xs="4" :sm="4" :md="4" :lg="4" class="header-left">
                <router-link to="/" >
                    <img src="../../assets/logo.png">
                </router-link>
        </el-col>
        <el-col :xs="19" :sm="12" :md="10" :lg="10" class="header-right">
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
                            <ShoppingCart class="header-icon" />
                        </el-icon>
                    </el-badge>
                </router-link>
            </li>
            <li>            
                <router-link :to="userLink()">
                    <el-icon size="35px">
                        <UserFilled class="header-icon" />
                    </el-icon>
                </router-link>
            </li>
            <li v-if="isLogin">
                <span @click="Logout()">登出</span>
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
    overflow: hidden;
    mask: 
        radial-gradient(13.45px at 50% calc(100% - 19px), #000 99%, transparent 101%) calc(50% - 20px) 0/40px 100%,
        radial-gradient(13.45px at 50% calc(100% + 9px), transparent 99%, #000 101%) 50% calc(100% - 10px)/40px 100% repeat-x;
}

.header-left{
    img{
        width: 80px;
    }
}
.header-right{
    display: flex;
    // border: 1px solid red;
    li{
        margin: 5%;
        line-height: 40px;
        font-size: 1.5rem;
        a,.header-icon,span{
            color: #6c6b6c;
            font-weight: bold;
            cursor: pointer;
        }
        a:hover,.header-icon:hover,span:hover{
            color: #e9c8ce;
        }
        // border: 1px solid red;
        
    }
}

@media screen and (max-width: 767px) {
    .header-container{
        padding: 10px;
    }
    .header-left{
        margin: 0;
    }
    .header-right{
        li{
            margin: 2%;
            line-height: 30px;
            
        }
    }
}

</style>