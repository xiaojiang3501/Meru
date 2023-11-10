<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useMember } from '@/store/member.js'
const getmemdata = useMember();
const { members } = storeToRefs(getmemdata);

import axios from 'axios'

const apiUrl = 'http://localhost:3000/members';
const search_info = ref('');
const showAdd = ref(false);
const showEdit = ref(false);
const FormRef = ref(null); 
const newMember = reactive({
    register_date:'',
    user_name: '', 
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
    const response = await axios.get(apiUrl);
    members.value = response.data;
};

//表單驗證規則
const rule = ref({
    user_name: [
        { required: true, message: '请输入名字', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '请输入帳號', trigger: 'blur' },
        { min: 1, max: 20, message: '請輸入1-20位數字', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密碼', trigger: 'blur' },
        { min: 1, max: 20, message: '請輸入1-20位數字', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入地址', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入電話', trigger: 'blur' },
        { min: 1, max: 20, message: '請輸入1-20位數字', trigger: 'blur' }
    ]
});

// 快速搜尋篩選
const filteredTableData = computed(() => {
    return members.value.filter((item) =>
        !search_info.value ||
        item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
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

    newMember.register_date = `${year}-${month}-${day}`;
    newMember.user_name = '';
    newMember.account = '';
    newMember.password = '';
    newMember.address = '';
    newMember.phone = '';
    newMember.user_suspend = true;

};

const addMember = async () => {
    FormRef.value.validate(async (valid) => {
    if (valid) {
        const response = await axios.post(apiUrl, newMember);
        members.value.push(response.data);
        ElMessage({
            type: 'success',
            message: '商品已新增',
        });
        // 關窗口
        showAdd.value = false;
    }
  });
}

//編輯
const showEditForm = (member) => {
    showEdit.value = true;
    nextTick(() => {
        FormRef.value.clearValidate();
    });
    // 設置編輯模式，將信息填充到表單中
    editedMember.value = member;
    newMember.register_date = member.register_date;
    newMember.user_name = member.user_name;
    newMember.account = member.account;
    newMember.password = member.password;
    newMember.address = member.address;
    newMember.phone = member.phone;
    newMember.user_suspend = member.user_suspend;
};

const editMember = () => {
  FormRef.value.validate(async (valid) => {
    if (valid) {
        const memberId = editedMember.value.id;
        const response = await axios.put(`${apiUrl}/${memberId}`, newMember);
        const index = members.value.findIndex((member) => member.id === memberId);
        if (index !== -1) {
          members.value[index] = response.data;
        }

        //關窗口
        showEdit.value = false;
    }
  });
};

//停權
const toggleSuspendStatus = async (member) => {
    const memberId = member.id;
    const newStatus = member.user_suspend;
	await axios.put(`${apiUrl}/${memberId}`, {
        register_date: member.register_date,
		user_name: member.user_name,
		account: member.account,
        password: member.password,
        address: member.address,
        phone: member.phone,
		user_suspend: newStatus,
	});

    // 只在成功更新后，將新的狀態赋值给 suspend 属性
    member.suspend = newStatus;
};

//刪除
const handleDelete = async (memberId) => {

    await ElMessageBox.confirm('確定要刪除？', '提示', { //內容,標題
        confirmButtonText: '確定', //按鈕
        cancelButtonText: '取消',
        icon: markRaw(Delete)
    });

    await axios.delete(`${apiUrl}/${memberId}`);
    members.value = members.value.filter((member) => member.id !== memberId);
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
                    <el-table-column prop="user_name" label="姓名" width="100" />
                    <el-table-column prop="account" label="帳號"  />
                    <el-table-column prop="password" label="密碼"  />
                    <el-table-column prop="address" label="地址"  />
                    <el-table-column prop="phone" label="電話" width="120" />

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
                        @click="handleDelete(row.id)">刪除</el-button>
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

                    <el-form-item label="姓名" prop="user_name" >
                        <el-input v-model="newMember.user_name" style="width: 200px;" />
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

                    <el-form-item label="姓名" prop="user_name" >
                        <el-input v-model="newMember.user_name" style="width: 200px;" />
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
}

.paginationBox{
    margin: 10px auto;
}

</style>