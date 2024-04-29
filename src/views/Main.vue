<script setup>
import CommonHeader from '@/components/Front/Header.vue';
import CommonFooter from '@/components/Front/Footer.vue';

</script>

<template>
    
    <el-container>
        
            <!-- header -->
            <el-header>
                <CommonHeader />
            </el-header>

            <!-- main -->
            <el-main>
                <router-view />
            </el-main>

            <!-- footer-->
            <el-footer>
                <CommonFooter />
            </el-footer>

    </el-container>
</template>

<style lang="scss">
#app{
    min-width: 100%;
}
.el-container{
    height: 100%; 
    background-color: #dbe6e9;
    // background-color: #e9c8ce;
}

.el-header {
    height: 100px;
    padding: 0;
    display: flex;
}
.el-main{
    padding: 0;
    width: 100%;
}
.el-footer{
    padding: 0;

}
@media screen and (max-width: 767px) {
    .el-main{
        min-height: 400px;
    }
}

@media screen and (max-width: 1025px) {
    .el-header {
        height: 80px;
    }
    .el-main{
        min-height: 1100px;
    }
}
</style>
