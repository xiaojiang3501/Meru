<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"
const router = useRouter()

const numMessage = ref(10) //信息


//信息
const goMessage = () => {
    router.push({ name: 'message' })
}


// 登出
const Logout = () => {
    sessionStorage.clear();
    router.push({ name: 'backstage' })
}



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
            right: -8px;
            top: -8px;
            position: absolute;
        }
        .el-icon{
            margin: 10px 10px;

        }
    }

    .header-logout{
        margin: 0 20px;
    }

}

</style>
  