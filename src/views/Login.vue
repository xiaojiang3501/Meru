<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
import { useRule } from '@/store/rule.js'
const { userData } = storeToRefs(useUser());
const { rule } = storeToRefs(useRule());
// ===============FontAwesome===================================
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
library.add(faFacebook, faInstagram, faLine)
// ===============Other===================================
// import sha256 from 'sha256'
import axios from 'axios'

const apiUrl = 'http://localhost:4000/user';
const account = ref('')
const password = ref('')
const name = ref('')
const email = ref('')
const newaccount = ref('')
const newpassword = ref('')
const FormRef = ref(null); 

//登入
const Login = () => {
    const login_data = {
        account: account.value,
        password: password.value,
    }

    axios.post(apiUrl + '/login',login_data)
    .then(response => {
        if(response.data.success){
            userData.value = response.data;
            sessionStorage.setItem("token",  response.data.user.Auth_token);

            router.push({ path: "/user" }) 


        }else {
            ElMessage({
                type: 'error',
                message: '帳號或密碼錯誤',
            });
        }

    })
}

//註冊
const Register = () => {
    if (!name.value) {
        ElMessage({
            type: 'error',
            message: '請輸入姓名',
        });
        return
    }
    if (!newaccount.value && !newpassword.value) {
        ElMessage({
            type: 'error',
            message: '請輸入帳號和密碼',
        });
        return
    }

    const register_data = {
        name: name.value,
        email: email.value,
        account: newaccount.value,
        password: newpassword.value
    }

    axios.post(apiUrl + '/register',register_data)
    .then(response => {
        if(response.data.success){
            ElMessage({
                type: 'success',
                message: '成功註冊,請進行登入',
            });
            name.value = '';
            email.value = '';
            newaccount.value = '';
            newpassword.value = '';

        }else {
            ElMessage({
                type: 'error',
                message: '帳號已存在',
            });
        }
    })

}



//動畫
const signUp = () => {
    document.querySelector('.container').classList.add('right-panel-active');
}

const signIn = () => {
    document.querySelector('.container').classList.remove('right-panel-active');
}

</script>

<template>
    <el-row class="login-wrpper">
        <div class="container">

            <!-- 註冊 -->
            <div class="form-container sign-up-container">
                <el-form 
                ref="FormRef"
                :rules="rule"
                @submit.prevent="Register">
                    <h1>註冊</h1>
                    <el-form-item prop="name" >
                        <el-input v-model="name"  placeholder="姓名"  style="width: 250px;" />
                    </el-form-item>
                    <el-form-item prop="email" >
                        <el-input v-model="email"  placeholder="信箱"  style="width: 250px;" />
                    </el-form-item>
                    <el-form-item prop="account" >
                        <el-input v-model="newaccount"  placeholder="6-20 位數帳號"  style="width: 250px;" />
                    </el-form-item>
                    <el-form-item prop="password" >
                        <el-input v-model="newpassword"  placeholder="6-20 位數密碼"  style="width: 250px;" />
                    </el-form-item>

                    <el-button  
                    class="login-btn" 
                    @click="Register()">註冊</el-button >

                </el-form>
            </div>

            <!-- 登入 -->
            <div class="form-container sign-in-container">
                <el-form >
                    <h1>登入</h1>
                    <el-form-item >
                        <el-input v-model="account"  placeholder="帳號"  style="width: 250px;" />
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model="password"  type="password" placeholder="密碼"  style="width: 250px;" />
                    </el-form-item>
                    <a href="#" class="login-forget">忘記密碼</a>
                    <el-button class="login-btn" @click="Login()">登入</el-button>
                </el-form>
            </div>

            <!-- 頁面切換 -->
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <button class="login-btn2" @click="signIn">已有帳號，直接登入！</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <button class="login-btn2" @click="signUp">沒有帳號嗎？點擊註冊</button>
                    </div>
                </div>
            </div>

        </div>
    </el-row>

    <el-row>
        <el-tabs type="border-card" class="login-app" stretch>
            <el-tab-pane label="登入">
                <el-form >
                    <h3>登入</h3>
                    <el-form-item >
                        <el-input v-model="account"  placeholder="帳號"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item >
                        <el-input v-model="password"  type="password" placeholder="密碼"  style="width: 200px;" />
                    </el-form-item>
                    <a href="#" class="login-forget">忘記密碼</a>
                    <el-button class="login-btn" @click="Login()">登入</el-button>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="註冊">
                <el-form 
                ref="FormRef"
                :rules="rule"
                @submit.prevent="Register">
                    <h3>註冊</h3>
                    <el-form-item prop="name" >
                        <el-input v-model="name"  placeholder="姓名"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item prop="email" >
                        <el-input v-model="email"  placeholder="信箱"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item prop="account" >
                        <el-input v-model="newaccount"  placeholder="6-20 位數帳號"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item prop="password" >
                        <el-input v-model="newpassword"  placeholder="6-20 位數密碼"  style="width: 200px;" />
                    </el-form-item>

                    <el-button  
                    class="login-btn" 
                    @click="Register()">註冊</el-button >

                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>

<style lang="scss" scoped>

.login-wrpper{
    width: 50%;
    margin: 2% auto 5%;
}
.login-app{
    display: none;
}
.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 500px;
    margin: 3%;
    .form-container{
        position: absolute;
        top: 0;
        height: 100%;
        transition: all .6s ease-in-out;
        .el-form {
            background: #fff;
            display: flex;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            h1{
                margin-bottom: 10%;
                color: gray;
            }

        }

    }

}
.login-forget{
    color: gray;
    font-size: 14px;
    text-decoration: none;
    margin: 5px 0;
}
.login-btn{
    width: 120px;
    height: 40px;
    border-radius: 30px;
    border: 1px solid #e9c8ce;
    background: #e9c8ce;
    color: #fff;
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}
.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}
.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}
.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
    .overlay {
        background: linear-gradient(to right, #e9c8ce, #e9c8ce) no-repeat 0 0 / cover;
        background-image: url("../assets/p4.jpg");
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: transform .6s ease-in-out;
        .overlay-panel {
            position: absolute;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 50%;
            text-align: center;
            transform: translateX(0);
            transition: transform .6s ease-in-out;
        }
        .overlay-right {
            right: 0;
            transform: translateX(0);
        }
        .overlay-left {
            transform: translateX(-20%);
        }

    }
}

.login-btn2{
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 20px;
}
.login-btn:active,.login-btn2:active {
    transform: scale(.95);
}

.login-btn:focus,.login-btn2:focus {
    outline: none;
}

/* Move signin to right */
.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

/* Move overlay to left */
.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

/* Bring signup over signin */
.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

/* Move overlay back to right */
.container.right-panel-active .overlay {
    transform: translateX(50%);
}

/* Bring back the text to center */
.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

/* Same effect for right */
.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}


@media screen and (max-width: 1025px) {
    .login-wrpper{
        width: 100%;
    }
}

@media screen and (max-width: 767px) {
    .login-wrpper{
        display: none;
    }
    .login-app{
        display: block;
        width: 100%;
        margin: 3%;
        box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
        text-align: center;
        .el-form {
            background: #fff;
            display: flex;
            flex-direction: column;
            padding: 5% 5% 10%;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;
            h3{
                color: gray;
                margin-bottom: 5%;
            }

        }
    }


}

</style>