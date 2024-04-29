<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faInstagram, faLine)


</script>

<template>
    <el-row class="footer-container">
        <el-col :xs="24" :sm="20" :md="16" :lg="10" class="footer-content">
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
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.footer-container{
    // background-color: #EF7C8E;
    background-color: #e9c8ce;
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    padding: 3% 0;
    mask: 
        radial-gradient(13.45px at 50% calc(0% + 19px), #000 99%, transparent 101%) calc(50% - 20px) 0/40px 100%,
        radial-gradient(13.45px at 50% calc(0% - 9px), transparent 99%, #000 101%) 50% calc(0% + 10px)/40px 100% repeat-x;
    .footer-content{
        display: flex;
        margin: 0 auto;
    }

    .footer-icon{
        img{
            width: 100px;
        }

    }
    .footer-privacy{
        margin: 0 5%;
        width: 25%;
        // border: 1px solid red;
        a{
            color: white;
        }
    }
    .footer-info{
        color: white;
        font-weight: bold;
        width: 60%;
        // border: 1px solid red;
        .icon{
            margin: 2.5% 4%;
        }
        
    }
}

@media screen and (max-width: 767px) {
    .footer-container{
        padding: 8% 0;
        .footer-icon{
            img{
                display: none;
            }
        }
        .footer-privacy{
            width: 30%;
        }
        .footer-info{
            width: 60%;  
        }
    }
}

</style>