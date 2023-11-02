<script setup>
import { ref, onMounted, computed, watch } from "vue";
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()

</script>

<template>
    <el-col :span="4">
      <el-menu
        class="aside"
        default-active="bhome"
        router='true'
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#545c64"
        @open="handleOpen"
        @close="handleClose">

        <h5 class="aside-title">後台管理系統</h5>

        <el-menu-item index="home">
            <span><el-icon><Menu /></el-icon>首頁</span>
        </el-menu-item>
        <el-menu-item index="commodity">
            <span><el-icon><GoodsFilled /></el-icon>商品</span>
        </el-menu-item>
        <el-menu-item index="order">
            <span><el-icon><Tickets /></el-icon>訂單</span>
        </el-menu-item>
        <el-menu-item index="member">
            <span><el-icon><Avatar /></el-icon>會員</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  

</template>


<style lang="scss" scoped>
.el-menu{
    border: 0;
}
.aside{
    height: 100vh;
    .aside-title{
        color: white;
        text-align: center;
        padding: 20px 0;

    }
    span{
        font-size: 18px;
    }
}

</style>
  