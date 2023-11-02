<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useMember } from '@/store/member.js'
const getmemdata = useMember();
const { memData } = storeToRefs(getmemdata);


onMounted(() => {
    fetchData()

})

const fetchData = () => {
    fetch('api/member')
    .then(data => data.json())
    .then(data => {
        // console.log(data.member); 
        memData.value = data.member;

    })
}

const dialogFormVisible = ref(false);
const dialogType = ref('add');
const search_info = ref('');
const form = reactive({});
const isFormValid = ref(true);
const FormRef = ref(null); 

//表單驗證規則
const rule = ref({
    user_name: [
        { required: true, message: '请输入名字', trigger: 'blur' }
    ],
    account: [
        { required: true, message: '请输入帳號', trigger: 'blur' },
        { min: 6, max: 20, message: '請輸入6-20位字符長度', trigger: 'blur' }
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
    return memData.value.filter((item) =>
        !search_info.value ||
        item.user_id.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.account.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.phone.toLowerCase().includes(search_info.value.toLowerCase()) 
    );
});


//新增
const handleAdd = () => {
	dialogFormVisible.value = true;
    dialogType.value = 'add';

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以加1並補齊為兩位
    const day = String(today.getDate()).padStart(2, '0');

    form.user_id = '';
    form.register_date = `${year}-${month}-${day}`;
    form.user_name = '';
    form.account = '';
    form.address = '';
    form.phone = '';
    form.user_suspend = true;

};

//編輯
const handleEdit = (row) => {
    dialogFormVisible.value = true;
    dialogType.value = 'edit';
    nextTick(() => {
        FormRef.value.clearValidate();
    });
    // console.log(row);
	form.user_id = row.user_id;
    form.register_date = row.register_date;
    form.user_name = row.user_name;
    form.account = row.account;
    form.address = row.address;
    form.phone = row.phone;
    form.user_suspend = row.user_suspend;

}

//確認
const handleConfirm = () => {
    FormRef.value.validate(valid => {
        if (valid){
            isFormValid.value = true;
            dialogFormVisible.value = false;
            if (dialogType.value === 'add') {
                memData.value.push({
                id: (memData.value.length +1).toString(),
                ...form
                });
                ElMessage({
                    type: 'success',
                    message: '商品已新增',
                });
            } else {
                let index = memData.value.findIndex(item => item.user_id === form.user_id);
                memData.value[index] = form
                ElMessage({
                    type: 'success',
                    message: '商品已編輯',
                });
            };
            
        }

    
    });

};


//刪除
const handleDelete = ({user_id}) => {
	ElMessageBox.confirm('確定要刪除？', '刪除', { //內容,標題
    confirmButtonText: '確定', //按鈕
    icon: markRaw(Delete),
    callback: function(action) { //按鈕完出現的訊息
		if (action === 'confirm') {
        let index = memData.value.findIndex(item => item.user_id == user_id);
        memData.value.splice(index, 1);
        ElMessage({
          type: 'success',
          message: '已刪除',
        });
      }
    },
  });
}


//關閉視窗
const handleClose = () => {
	dialogFormVisible.value = false;
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
                    @click="handleAdd()">新增會員</el-button>

                </div>

                <el-table 
                :default-sort="{ prop: 'date',order: 'descending' }"
                :header-cell-style="{textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                :data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                style="width: 100%">
                    <!-- <el-table-column fixed sortable prop="user_id" label="ID" width="80" /> -->
                    <el-table-column prop="register_date" label="註冊日期" width="120" />
                    <el-table-column prop="user_name" label="名字" width="100" />
                    <el-table-column prop="account" label="帳號"  />
                    <el-table-column prop="address" label="地址"  />
                    <el-table-column prop="phone" label="電話" width="120" />

                    <el-table-column prop="user_suspend" label="啟用狀態" width="80">
                        <template #default="{ row }">
                            <el-switch v-model="row.user_suspend" /> <!-- 使用 row.suspend 绑定每行的停權狀態 -->
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="120" class="edit">
                    <template #default="{ row }">
                        <el-button
                        link
                        size="small"
                        type="primary"
                        @click="handleEdit(row)">編輯</el-button>
                        <el-button
                        link
                        size="small"
                        type="danger"
                        @click="handleDelete(row)">刪除</el-button>
                    </template>
                    </el-table-column>
                    
                </el-table>
				
				<!-- 下面頁碼 -->
                <div class="paginationBox">
                    <el-pagination
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total=memData.length
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    />
                </div>

                
            <!-- 彈窗 -->
            <el-dialog 
            v-model="dialogFormVisible" 
            :title="dialogType === 'add'? '新增': '編輯'">
            <el-form 
            ref="FormRef"
            label-width="70px"
            :model="form"
            :rules="rule"
            @close="handleClose">

                <el-form-item 
                label="名字" 
                prop="user_name" 
                :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.user_name" 
                    style="width: 150px;"/>
                </el-form-item>
                <el-form-item 
                label="帳號" 
                prop="account" 
                :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.account" 
                    style="width: 300px;"/>
                </el-form-item>
                <el-form-item 
                label="地址" 
                prop="address" 
                :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.address" 
                    style="width: 400px;"/>
                </el-form-item>
                <el-form-item 
                label="電話" 
                prop="phone" 
                :label-width="formLabelWidth">
                    <el-input 
                    v-model="form.phone" 
                    style="width: 150px;"/>
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">確定</el-button>
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