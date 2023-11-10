<script setup>
import { ref, onMounted, computed, watch } from "vue";

// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
const activeIndex = ref('');

watch(() => router.path, () => {
  switch (router.path) {
    case '/member':
      activeIndex.value = 'member';
      break;
    case '/order':
      activeIndex.value = 'order';
      break;
    case '/commodity':
      activeIndex.value = 'commodity';
      break;
    default:
      activeIndex.value = 'home';
  }
})

</script>

<template>
    <el-col :span="4">
      <el-menu
        class="aside"
        :default-active="activeIndex"
        :router="true"
        text-color="#737272"
        active-text-color="#e6a23d"
        background-color="#dad4ec">

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
.el-menu-item:hover {
	color:white;
}
.aside{
    height: 100vh;
    background: rgba(255, 255, 255, .6);
    .aside-title{
        color: #737272;
        text-align: center;
        padding: 20px 0;

    }
    span{
        font-size: 18px;
    }

}

</style>
  