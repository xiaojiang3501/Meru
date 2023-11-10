<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
const getuserdata = useUser();
const { userData } = storeToRefs(getuserdata);

import axios from 'axios'


const apiUrl = 'http://localhost:3000/members';
const tabValue = ref("1")  //預設第一個
const num = ref(10) //我的信息


onMounted(() => {
    fetchData()
})




const fetchData = () => {
    fetch('api/user')
    .then(data => data.json())
    .then(data => {
        // console.log(data); 
        userData.value = data;


    })
}




</script>
<template>
  <el-row>
    <el-tabs v-model="tabValue" class="user-container">
        <el-tab-pane label="個人資訊" name="1">
            <el-form 
            :model="userData"  
            :rules="rules"
            class="user-table">
                <el-form-item label="帳號" >
                    <el-input :disabled="true" v-model="userData.account" style="width: 200px;"/>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input required v-model="userData.password" type="password" style="width: 200px;"/>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input required v-model="userData.name" style="width: 200px;"/>
                </el-form-item>
                <el-form-item label="電話">
                    <el-input required v-model="userData.phone" style="width: 200px;"/>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input required v-model="userData.address" style="width: 300px;"/>
                </el-form-item>

                <div class="user-pbutton">

                    <el-button @click="Login" >取消</el-button>

                    <el-button type="primary"  @click="Login" >儲存變更</el-button>

                </div>


            </el-form>

        </el-tab-pane>

        <el-tab-pane label="我的訂單" name="2">
            <el-table 
                border
                :data="filteredTableData" 
                :default-sort="{ prop: 'date',order: 'descending' }"
                :header-cell-style="{color:'#606266',textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                style="width: 100%;">
                    <el-table-column fixed prop="id" label="訂單編號" />
                    <el-table-column fixed prop="date" label="訂單日期" />
                    <el-table-column prop="price" label="金額"  />
                    <el-table-column prop="state" label="訂單狀態">
                        <template #default="{ row }">
                            <el-tag :type="row.state === '成功' ? 'success' : 'danger'">{{ row.state }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="150" class="edit">
                        <template #default>
                            <el-button 
                            size="small" 
                            type="primary"
                            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    
            </el-table>

        </el-tab-pane>

        <el-tab-pane label="優惠卷" name="3">

        </el-tab-pane>

        <el-tab-pane label="信息" name="8">
            待認領任務
        </el-tab-pane>



    </el-tabs>
</el-row>


    
</template>
<style lang="scss" scoped>
.user-container{
    width: 60%;
    margin: 5% auto;
    padding: 5%;
    border: 1px solid rgb(184, 184, 184);
    border-radius: 10px;
    .user-table{
        width: 60%;
        margin: 5% auto;
        // border: 1px solid rgb(184, 184, 184);
    }
    .user-pbutton{
        width: 160px;
        display: flex;
        margin: 10% auto 3%;

    }
}

</style>