<script setup>
import { ref, onMounted, computed } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
const getuserdata = useUser();
const { userData } = storeToRefs(getuserdata);
// ===============FontAwesome===================================
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faInstagram, faLine)
import sha256 from 'sha256'

onMounted(() => {

})

const account = ref('')
const password = ref('')



// 登入異常訊息
const errmsg = ref('')
const login_text = ref(false)

const Login = () => {
    router.push({
        path: "/user",
    })
    // if (!account.value) {
    //     login_text.value = true
    //     errmsg.value = '請輸入帳號'
    //     return
    // }
    // if (!password.value) {
    //     login_text.value = true
    //     errmsg.value = '請輸入密碼'
    //     return
    // }
    const login_data = {
        account: account.value,
        password: password.value,
    }
    fetch('api/userlogin' ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_data),
    })
    .then(data => {
        console.log(data); 
        userData.value = data;
        sessionStorage.setItem("token", userData.value.access_token);
        login_text.value = false
        router.push({
            path: "/user",
        })
    })
    

}

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
                <form action="#">
                    <h1>註冊</h1>
                    <div class="social-container">
                        <a href="#" class="social">
                            <font-awesome-icon class="icon" :icon="['fab', 'line']" size="2xl" />
                        </a>
                        <a href="#" class="social">
                            <font-awesome-icon class="icon" :icon="['fab', 'line']" size="2xl" />
                        </a>
                        <a href="#" class="social"> 
                            <font-awesome-icon class="icon" :icon="['fab', 'line']" size="2xl" />
                        </a>
                    </div>
                    <span>或者使用您的帳號註冊</span>
                    <input 
                    type="text" 
                    placeholder="Name" />
                    <input 
                    type="phone" 
                    placeholder="Phone" />
                    <input 
                    type="account" 
                    placeholder="Account" />
                    <input 
                    type="password" 
                    placeholder="Password" />
                    <button class="login-btn">註冊</button>

                </form>
            </div>

            <!-- 登入 -->
            <div class="form-container sign-in-container">
                <el-form  action="#" >
                    <h1>登入</h1>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>或者其他方式登入</span>
                    <input 
                    type="account" 
                    v-model="account"  
                    placeholder="Account" />
                    <input 
                    type="password" 
                    v-model="password"  
                    placeholder="Password" />

                    <a href="#" class="login-forget">忘記密碼</a>
                    <button class="login-btn" @click="Login">登入</button>
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
</template>

<style lang="scss" scoped>

.login-wrpper{
    width: 50%;
    margin: 2% auto 5%;
    // border: 1px solid red;
}

.container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
    position: relative;
    overflow: hidden;
    width: 750px;
    height: 500px;
    .form-container{
        position: absolute;
        top: 0;
        height: 100%;
        transition: all .6s ease-in-out;
        form {
            background: #fff;
            display: flex;
            flex-direction: column;
            padding: 0 50px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-align: center;

        }
        input{
            background: #eee;
            border: none;
            padding: 12px 15px;
            margin: 8px 0;
            width: 100%;
        }
        .login-forget{
            color: #333;
            font-size: 14px;
            text-decoration: none;
            margin: 15px 0;
        }

        .social-container {
            margin: 20px 0;
            a{
                border: 1px solid #ddd;
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin: 0 5px;
                height: 40px;
                width: 40px;
            }
            .icon{
                width: 20px;
                color: #ddd;
            }
        }
    }

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
            background: #ff416c;
            background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
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

.login-btn{
    width: 120px;
    border-radius: 30px;
    border: 1px solid #ff4b2b;
    background: #ff445c;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}
.login-btn2{
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 20px;
}
.login-btn,.login-btn2:active {
    transform: scale(.95);
}

.login-btn,.login-btn2:focus {
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


</style>