<script setup>
import { ref, onMounted, computed, reactive, nextTick, } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useMember } from '@/store/member.js'
import { useRule } from '@/store/rule.js'

const { members } = storeToRefs(useMember());
const { rule } = storeToRefs(useRule());

import axios from 'axios'

const apiUrl = 'http://localhost:4000/backstage';
const search_info = ref('');
const showAdd = ref(false);
const showEdit = ref(false);
const FormRef = ref(null); 
const newMember = reactive({
    Member_ID:'',
    register_date:'',
    name: '', 
    account: '',
    password: '',
    address: '',
    phone: '',
    user_suspend: ''

});
const editedMember = ref(null);  


onMounted(() => {
    fetchData()
})

//抓資料
const fetchData = async () => {
    const response = await axios.post(apiUrl + '/member');
    members.value = response.data.data;

    
};


// 快速搜尋篩選
const filteredTableData = computed(() => {
    return members.value.filter((item) =>
        !search_info.value ||
        item.name.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.account.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.phone.toLowerCase().includes(search_info.value.toLowerCase()) 
    );
});


//新增
const showAddForm = () => {
	// 清空用+開窗口
    showAdd.value = true;
	nextTick(() => {
        FormRef.value.clearValidate();
    });

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1並補齊為兩位
    const day = String(today.getDate()).padStart(2, '0');
    newMember.register_date = `${year}/${month}/${day}`;

};

const addMember = async () => {
    FormRef.value.validate(async (valid) => {
        if (valid) {
            const response = await axios.post(apiUrl + '/create-member', newMember);
            members.value.push(newMember);
            ElMessage({
                type: 'success',
                message: '會員已新增',
            });
            // 關窗口
            showAdd.value = false;
        }
    });
}

//編輯
const showEditForm = (row) => {
    showEdit.value = true;
    nextTick(() => {
        FormRef.value.clearValidate();
    });
    // console.log(row);
    // 設置編輯模式，將信息填充到表單中
    editedMember.value = row;
    newMember.Member_ID = row.Member_ID;
    newMember.register_date = row.register_date;
    newMember.name = row.name;
    newMember.account = row.account;
    newMember.password = row.password;
    newMember.address = row.address;
    newMember.phone = row.phone;
    newMember.user_suspend = row.user_suspend;

};

const editMember =  () => {
    FormRef.value.validate((valid) => {
        if (valid){
            const Member_ID = editedMember.value.Member_ID;
            const index =  members.value.findIndex((item) => item.Member_ID === Member_ID);
            if (index !== -1) {
                members.value[index] = newMember;
            }
            const response = axios.put(`${apiUrl}/edit-member/${Member_ID}`, newMember);
            // 關窗口
            showEdit.value = false;
        
        }

    });
};


//停權
const toggleSuspendStatus = async (row) => {
    const Member_ID = row.Member_ID;
    const newStatus = row.user_suspend;

	await axios.put(`${apiUrl}/toggle-member/${Member_ID}`, {
		user_suspend: newStatus,
	});

    // 只在成功更新后，將新的狀態赋值给 suspend 属性
    row.user_suspend = newStatus;
};

//刪除
const handleDelete = async (Member_ID) => {

    await ElMessageBox.confirm('確定要刪除？', '提示', { //內容,標題
        confirmButtonText: '確定', //按鈕
        cancelButtonText: '取消',
        icon: markRaw(Delete)
    });

    await axios.delete(`${apiUrl}/delete-member/${Member_ID}`);
    members.value = members.value.filter((member) => member.Member_ID !== Member_ID);
    ElMessage.success('删除成功');
    
};



//分頁
const pageSize = ref(8) // 8個項目為一頁
const currentPage = ref(1) // 初始顯示第幾頁
const handleCurrentChange = (page) => {
    currentPage.value = page;  // 每次點擊分頁按鈕發生變化
}


</script>

<template>
        <el-card class="member">
            <el-row :gutter="10">
                <div class="top">
                    <!-- 搜尋 -->
                    <div class="search">
                        <el-input
                        v-model="search_info"
                        placeholder="搜尋"
                        :suffix-icon="Search"
                        />
                    </div>

                    <el-button
                    size="small"
                    type="primary"
                    class="add"
                    @click="showAddForm()">新增會員</el-button>

                </div>

                <el-table 
                :default-sort="{ prop: 'date',order: 'descending' }"
				:header-cell-style="{color:'#596580',textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                :data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                    <el-table-column prop="register_date" label="註冊日期" width="120" />
                    <el-table-column prop="name" label="姓名" width="100" />
                    <el-table-column prop="account" label="帳號"  />
                    <el-table-column prop="password" label="密碼"  />
                    <el-table-column prop="phone" label="電話" width="120" />
                    <el-table-column prop="address" label="地址"  />
                    <el-table-column prop="user_suspend" label="啟用狀態" width="80">
                        <template #default="{ row }">
                            <el-switch v-model="row.user_suspend" @change="toggleSuspendStatus(row)"/> <!-- 使用 row.suspend 绑定每行的停權狀態 -->
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="120" class="edit">
                    <template #default="{ row }">
                        <el-button
                        link
                        size="small"
                        type="primary"
                        @click="showEditForm(row)">編輯</el-button>
                        <el-button
                        link
                        size="small"
                        type="danger"
                        @click="handleDelete(row.Member_ID)">刪除</el-button>
                    </template>
                    </el-table-column>
                    
                </el-table>
				
				<!-- 下面頁碼 -->
                <div class="paginationBox">
                    <el-pagination
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total=members.length
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    />
                </div>

                <!-- 新增彈窗 -->
                <el-dialog 
                v-model="showAdd" 
                width="40%"
                title="新增會員">
                    <el-form 
                    ref="FormRef"
                    label-width="70px"
                    :rules="rule"
                    :model="newMember"
                    @submit.prevent="addMember">

                    <el-form-item label="姓名" prop="name" >
                        <el-input v-model="newMember.name" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="帳號" prop="account"> 
                        <el-input v-model="newMember.account" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="密碼" prop="password"> 
                        <el-input v-model="newMember.password" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="電話" prop="phone"> 
                        <el-input v-model="newMember.phone"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="newMember.address" style="width: 350px;" />
                    </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button 
                            native-type="submit"
                            type="primary" 
                            @click="addMember">保存</el-button>
                        </span>
                    </template>
                </el-dialog>


                <!-- 編輯彈窗 -->
                <el-dialog 
                v-model="showEdit" 
                width="40%"
                title="編輯會員">
                    <el-form 
                    ref="FormRef"
                    label-width="70px"
                    :rules="rule"
                    :model="newMember"
                    @submit.prevent="editMember">

                    <el-form-item label="姓名" prop="name" >
                        <el-input v-model="newMember.name" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="帳號" prop="account"> 
                        <el-input v-model="newMember.account" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="密碼" prop="password"> 
                        <el-input v-model="newMember.password" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="電話" prop="phone"> 
                        <el-input v-model="newMember.phone"  style="width: 200px;" />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="newMember.address" style="width: 350px;" />
                    </el-form-item>

                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button 
                            type="primary" 
                            @click="editMember">保存</el-button>
                        </span>
                    </template>
                </el-dialog>
                

            </el-row>
        </el-card>
</template>


<style lang="scss" scoped>
.member{
    height: 100%;
    .top{
        width: 100%;
        // border: 1px solid red;
		margin-bottom: 20px;
        display: flex;
        justify-content:space-between;
      .search{
        width: 180px;
      }
      .add{
        height: 30px;

      }

    }
    .paginationBox{
        margin: 10px auto;
    }

}

</style>