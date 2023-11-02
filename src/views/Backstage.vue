<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"
import sha256 from 'sha256'

const router = useRouter()
const account = ref('')
const password = ref('')



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
        password: sha256(password.value),
    }
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_data),
    })
    .then(data => {
        sessionStorage.setItem("token", "xj");
        login_text.value = false
        router.push({
            name: 'home'
        })
    })


}
</script>
<template>
    <div class="backstage-outter">
        <el-form 
        class="backstage-container" 
        ref="form" 
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
                    type="primary" 
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
.backstage-container {
    box-sizing: border-box;
    width: 400px;
    border: 1px solid #eaeaea;
    background-color: white;
    border-radius: 10px;
    padding: 0 0 2%;
    filter: drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.15));
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index:11;
    .backstage-main {
        display: flex;
        flex-direction: column;
        margin: 5% 10%;
    }

    .backstage-title {
        font-size: 2vw;
        margin: 3% 0;
        text-align: center;
    }
    .backstage-input {
        width: 100%;
        height: 80%;
        margin: 5% 0 0;
        border: 1px solid #9DA5B1;
        border-radius: 5px;
    }

    .backstage-button {
        display: block;
        width: 140px;
        height: 40px;
        font-size: 20px;
        margin: 10px auto 20px;
        border-radius: 4px;
    }
}

.el-form-item{
    margin: 1% auto;
    width: 300px;
}


</style>