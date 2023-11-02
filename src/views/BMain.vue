<script setup>
import CommonAside from '@/components/Back/BAside.vue';
import CommonHeader from '@/components/Back/BHeader.vue';

</script>

<template>
    <el-container style="height: 100vh;  background-color: #F2F3F5">

        <!-- 左邊菜單 -->
        <CommonAside />

        <!-- 右邊 -->
        <el-container>
            <!-- 右邊header -->
            <el-header>
                <CommonHeader />
            </el-header>

            <!-- 右邊main -->
            <el-main style="max-width: 100%;">
                <router-view />
            </el-main>
        </el-container>
        
    </el-container>
</template>



<style lang="scss">
.el-header{
    background-color: white;
}
.title{
    font-size: 20px;
    font-weight: bold;
    color: gray;
}
</style>