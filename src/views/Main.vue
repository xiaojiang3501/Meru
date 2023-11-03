<script setup>
import CommonHeader from '@/components/Front/Header.vue';
import CommonFooter from '@/components/Front/Footer.vue';

</script>

<template>
    
    <el-container style="height: 100%;">

            <!-- header -->
            <el-header>
                <CommonHeader />
            </el-header>

            <!-- main -->
            <el-main style="max-width: 100%;">
                <router-view />
            </el-main>

            <!-- footer-->
            <el-footer>
                <CommonFooter />
            </el-footer>

    </el-container>
</template>

<style lang="scss">
.el-header {
    height: 100px;
    padding: 0;
    display: flex;
    
}
.el-main{
    padding: 0;
}


.el-footer{
    padding: 0;
    width: 100%;
    height: 150px;
    background-color: gray;

}


</style>
