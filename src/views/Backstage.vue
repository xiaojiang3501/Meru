<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// ===============Router===================================
import { useRouter } from "vue-router"
const router = useRouter()
// ===============Other===================================
import sha256 from 'sha256'
import axios from 'axios'

const account = ref('')
const password = ref('')

const apiUrl = 'http://localhost:4000/backstage/login';
// 登入異常訊息
const errmsg = ref('')
const login_text = ref(false)



const Login = () => {
    if (!account.value) {
        login_text.value = true
        errmsg.value = '請輸入帳號'
        return
    }
    if (!password.value) {
        login_text.value = true
        errmsg.value = '請輸入密碼'
        return
    }
    const login_data = {
        account: account.value,
        // password: sha256(password.value),
        password: password.value,
    }

    axios.post(apiUrl,login_data)
    .then(response => {
        if(response.data.success){

            sessionStorage.setItem("auth", response.data.Auth_token);

            router.push({  path: "/home" }) 

        }else {
            ElMessage({
                type: 'error',
                message: '帳號或密碼錯誤',
            });
        }

    })

}


</script>
<template>
    <div class="backstage-wrapper">
        <div class="backstage-circle"></div>
        <div class="backstage-circle2"></div>
        <el-form 
        class="backstage-container" 
        label-position="left" 
        :inline="true" 
        label-width="100px"
        >
            <div class="backstage-main">
                <!-- Logo -->
                <div class="backstage-logo">
                    <img src="" alt="">
                    <!-- 標題 -->
                    <h4 class="backstage-title ">後台管理系統</h4>
                </div>

                <!-- 帳號 -->
                <el-form-item prop="username">
                    <el-input 
                    class="backstage-input" 
                    v-model="account"
                    placeholder="請輸入帳號"
                    @keyup.enter.native="Login"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <UserFilled />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 密碼 -->
                <el-form-item prop="password" style="padding-bottom:32px">
                    <el-input 
                    class="backstage-input" 
                    v-model="password" 
                    type="password" 
                    placeholder="請輸入密碼"
                    @keyup.enter.native="Login"
                    >
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 登入按鈕 -->
                <el-form-item>
                    <el-button 
                    class="backstage-button" 
                    @click="Login" >登入</el-button>
                </el-form-item>
            </div>
            <el-alert 
            :center='true' 
            :title="errmsg" 
            type="error" 
            :closable="false" 
            v-show=login_text 
            />
        </el-form>
    </div>
    
</template>
<style lang="scss" scoped>
//logo
.el-input__prefix-inner {
    background-color: gray;
}


// -------------------------
.backstage-wrapper{
    background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);
    height: 100vh;
    position: relative;
    .backstage-circle{
        width: 300px;
        height: 300px;
        border-radius: 40%;
        background-color: rgb(236, 215, 220);
        box-shadow:0 0 80px 80px rgba(236, 215, 220, 1);
        position: absolute;
        left: 55%;
        top: 5%;

    }
    .backstage-circle2{
        width: 300px;
        height: 300px;
        border-radius: 40%;
        background-color: rgb(236, 215, 220);
        box-shadow:0 0 80px 80px rgba(236, 215, 220, 1);
        position: absolute;
        left: 20%;
        top: 45%;

    }
}
.backstage-container {
    box-sizing: border-box;
    width: 400px;
    border: 1px solid white;
    border-radius: 10px;
    padding: 0 0 2%;
    background: rgba(255, 255, 255, .3);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .backstage-container:after {
        content: "";
        backdrop-filter: invert(10px);
    }

    .backstage-main {
        display: flex;
        flex-direction: column;
        margin: 5% 10%;
    }

    .backstage-title {
        font-size: 2vw;
        margin: 3% 0;
        text-align: center;
        color: #737272;
    }
    .backstage-input {
        width: 100%;
        height: 80%;
        margin: 5% 0 0;
        border-radius: 5px;
    }

    .backstage-button {
        display: block;
        width: 140px;
        height: 40px;
        font-size: 20px;
        margin: 10px auto 20px;
        border-radius: 20px;
        background-color: #b6b2b2;
        border: none;
        color: white;
    }
}

.el-form-item{
    margin: 1% auto;
    width: 300px;
}


</style>