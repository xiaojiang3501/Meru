<script setup>
import { ref, onMounted, computed } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router"
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useMessage } from '@/store/message.js'
const { messages } = storeToRefs(useMessage());

import axios from 'axios'


const apiUrl = 'http://localhost:4000/backstage/message';
const numMessage = ref(messages.value.length) //信息



onMounted(() => {
    fetchData()
})


//抓資料
const fetchData = async () => {
    const response = await axios.post(apiUrl);
    messages.value = response.data;

};


//信息
const goMessage = () => {
    router.push({ name: 'message' })
}

// 登出
const Logout = () => {
    sessionStorage.clear();
    localStorage.removeItem('auth')
    router.push({ name: 'backstage' })
    alert("成功登出")
}

// // 監聽使用者活動
// onMounted(() => {
//   window.addEventListener('mousemove', resetActivityTimer);
//   window.addEventListener('keypress', resetActivityTimer);

//   // 定期檢查是否需要自動登出
//   setInterval(checkLogout, 30000); // 每30秒檢查一次
// });


// let lastActivityTime = new Date().getTime();
// // 重置使用者活動時間
// const resetActivityTimer = () => {
//     lastActivityTime = new Date().getTime();
// };  

// // 檢查是否需要自動登出
// const checkLogout = () => {
//   const currentTime = new Date().getTime();
//   const idleTime = currentTime - lastActivityTime;

//   // 如果超過30分鐘沒有動作，自動登出
//   if (idleTime > 30 * 60 * 1000) {
//     Logout();
//   }
// };



</script>
<template>
  <el-row :gutter="20">
        <el-col class="header">

            <!-- 信件 -->
            <div class="header-message" @click="goMessage">
                <el-badge
                :value= numMessage
                type="danger" 
                class="num">
                </el-badge>
                <el-icon  size="25px"><Message /></el-icon>
            </div>

            <!-- 登出 -->
            <div class="header-logout" @click="Logout">
                <el-icon  size="25px"><Avatar /></el-icon>
            </div>
        </el-col>
</el-row>
  

</template>


<style lang="scss" scoped>
.header{
    color: #737272;
    margin: 20px auto;
    display: flex; 
    justify-content: flex-end; 
    .header-message,.header-logout{
        background-color: white;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        position: relative;
        .num{
            right: -5px;
            top: -5px;
            position: absolute;
        }
        .el-icon{
            margin: 10px 10px;

        }
    }
    .header-message:hover,.header-logout:hover{
        background-color: #ef7d8d;
        color: white;
    }

    .header-logout{
        margin: 0 20px;
    }

}

</style>
  