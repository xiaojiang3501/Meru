<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faInstagram, faLine)


</script>

<template>
    <el-row class="footer-container">
        <div class="footer-icon">
            <img src="../../assets/logo.png">
        </div>
        <div class="footer-privacy">
            <li><router-link to="FAQ" >FAQ</router-link></li> 
            <li><router-link to="/" >購物須知</router-link></li> 
            <li><router-link to="/" >隱私政策</router-link></li>
            <li><router-link to="/" >客戶服務條款</router-link></li>

        </div>
        <div class="footer-info">
            <font-awesome-icon class="icon" :icon="['fab', 'facebook']" size="2xl"/>
            <font-awesome-icon class="icon" :icon="['fab', 'instagram']" size="2xl"/>
            <font-awesome-icon class="icon" :icon="['fab', 'line']" size="2xl" />
            <p>信箱：meru@gmail.com</p>
            <p>地址：桃園市龜山區文化一路537號8樓之10</p>
        </div>

    </el-row>
</template>

<style lang="scss" scoped>
.footer-container{
    width: 45%;
    margin: 1.5% auto;
    // border: 1px solid #ccc;
    .footer-icon{
        img{
            width: 100px;
        }

    }
    .footer-privacy{
        margin: 0 10%;
        width: 100px;
        // border: 1px solid red;
        a{
            color: white;
        }
    }
    .footer-info{
        color: white;
        font-weight: 500;
        // border: 1px solid red;
        .icon{
            margin: 2.5% 4%;
        }
        
    }
}


</style>