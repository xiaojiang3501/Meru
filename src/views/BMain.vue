<script setup>
import CommonAside from '@/components/Back/BAside.vue';
import CommonHeader from '@/components/Back/BHeader.vue';

</script>

<template>
    <el-container class="main-container" >

        <!-- 左邊菜單 -->
        <CommonAside />

        <!-- 右邊 -->
        <el-container>
            <!-- 右邊header -->
            <el-header>
                <CommonHeader />
            </el-header>

            <!-- 右邊main -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        
    </el-container>
</template>



<style lang="scss">
.main-container{
    height: 100vh; 
    background-image: linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%);
    
}
.el-header{
    background: transparent;
}
.el-main{
    max-width: 100%;
}

.title{
    font-size: 20px;
    font-weight: bold;
    color: gray;
}
</style>