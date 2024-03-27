<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useOrder } from '@/store/order.js'
import { useRule } from '@/store/rule.js'
const getordata = useOrder();
const { orders } = storeToRefs(getordata);
const { rule } = storeToRefs(useRule());

import axios from 'axios'



const activeName = ref('123')
const handleClick = () => {

}

onMounted(() => {


})



</script>

<template>

        <!-- <el-card class="order">
            <el-row :gutter="10">
				<el-tabs 
				v-model="activeName" 
				type="border-card"
				class="demo-tabs"
				@tab-click="handleClick">
					<el-tab-pane label="待處理" payee="123">

					</el-tab-pane>
					<el-tab-pane label="已處理" payee="second">

					</el-tab-pane>
				</el-tabs>


            </el-row>
        </el-card> -->


  <el-tabs type="border-card">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>

</template>


<style lang="scss" scoped>



</style>


  