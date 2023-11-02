<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router"

// 登出
const router = useRouter()
const Logout = () => {

    sessionStorage.clear();
    router.push({ name: 'backstage' })
}



</script>
<template>
  <el-row :gutter="20">
        <el-col   class="header">
            <!-- 登出 -->
            <span class="header_logout" @click="Logout">登出</span>
        </el-col>
</el-row>
  

</template>


<style lang="scss" scoped>
.header{

    margin: 20px auto;
    display: flex; 
    justify-content: flex-end; 
    .header_logout{
        cursor: pointer;

    }

}

</style>
  