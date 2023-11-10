<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useOrder } from '@/store/order.js'
const getordata = useOrder();
const { orders } = storeToRefs(getordata);

import axios from 'axios'

const apiUrl = 'http://localhost:3000/orders';
const search_info = ref(''); // 快速搜尋篩選
const search_time = ref(''); //查詢時間
const dialogFormVisible = ref(false);
const dialogType = ref('add');
const form = reactive({});
const FormRef = ref(null); 


onMounted(() => {
    fetchData()
})


const fetchData = () => {
    fetch('api/order')
    .then(data => data.json())
    .then(data => {
		// console.log(data.order); 
        orders.value = data.order;
    })
}


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
	// console.log(orderData.value); 
	return orders.value.filter((item) =>
		!search_info.value ||
		item.order_id.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.account.toLowerCase().includes(search_info.value.toLowerCase()) 
	);
});

//編輯
const handleCheck = (row) => {
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
            dialogFormVisible.value = false;
            if (dialogType.value === 'add') {
                orders.value.push({
                id: (memData.value.length +1).toString(),
                ...form
                });
                ElMessage({
                    type: 'success',
                    message: '商品已新增',
                });
            } else {
                let index = orderData.value.findIndex(item => item.user_id === form.user_id);
                orders.value[index] = form
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
        let index = orderData.value.findIndex(item => item.user_id == user_id);
        orderData.value.splice(index, 1);
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
const pageSize = ref(10) // 10個項目為一頁
const currentPage = ref(1) // 初始顯示第幾頁
const handleCurrentChange = (page) => {
    currentPage.value = page;  // 每次點擊分頁按鈕發生變化
}


</script>
<template>

        <el-card class="order">
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

					<!-- 查詢時間 -->
					<div class="search-time">
						<span style="margin-right: 10px;">訂單日期查詢:</span>
						<el-date-picker
						v-model="search_time"
						type="daterange"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
						:disabled-date="disabledFutureDates"
						start-placeholder="開始時間"
						end-placeholder="結束時間"
						range-separator="To"
						style="width: 300px;"
						/>
					</div>

				</div>
				<el-table 
				:default-sort="{ prop: 'date',order: 'descending' }"
				:header-cell-style="{color:'#596580',textAlign: 'center'}"
				:cell-style="{ textAlign: 'center' }"
				:data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
					<el-table-column type="selection" width="55">
					</el-table-column>

					<el-table-column fixed sortable prop="order_id" label="訂單編號" width="150" />
					<el-table-column fixed prop="order_date" label="訂單日期" sortable width="150" />
					<el-table-column prop="user_name" label="會員名字"  width="150" />
					<el-table-column prop="account" label="帳號" />
					<el-table-column prop="total_price" label="總金額"  width="100" />

					<el-table-column
					prop="state"
					label="訂單狀態"
					width="100"
					>
					<template #default="{ row }">
						<el-tag
						:type="row.state === '成功' ? 'success' : 'danger'"
						disable-transitions
						>{{ row.state }}</el-tag
						>
					</template>
					
					</el-table-column>

					<el-table-column
					prop="state"
					label="交易狀態"
					width="100"
					>
					<template #default="{ row }">
						<el-tag
						:type="row.state === '成功' ? 'success' : 'danger'"
						disable-transitions
						>{{ row.state }}</el-tag
						>
					</template>
					
					</el-table-column>

					<el-table-column fixed="right" label="操作" width="150" class="edit">
					<template #default="{ row }">
						<el-button 
						link
						size="small" 
						type="primary"
						@click="handleCheck(row)">詳情</el-button>
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
				:total=orders.length
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
				/>
				</div>

				<!-- 彈窗 -->
				<el-dialog 
				width="80%"
				v-model="dialogFormVisible" 
				:title="dialogType === 'add'? '新增': '訂單資料'">
					<el-table 
					:default-sort="{ prop: 'date',order: 'descending' }"
					:header-cell-style="{color:'#596580',textAlign: 'center'}"
					:cell-style="{ textAlign: 'center' }"
					:data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
					class="order-details">
						<el-table-column fixed sortable prop="order_id" label="訂單編號" width="150" />
						<el-table-column fixed prop="order_date" label="訂單日期" sortable width="150" />

						<el-table-column prop="account" label="交易方式" />
						<el-table-column prop="total_price" label="總金額"  width="100" />
						<el-table-column prop="account" label="收件地址" />

					</el-table>

					<el-table 
					border
					:default-sort="{ prop: 'date',order: 'descending' }"
					:header-cell-style="{background:'#ecf5ff',color:'#606266',textAlign: 'center'}"
					:cell-style="{ textAlign: 'center' }"
					:data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
					class="order-details2">
						<el-table-column  prop="order_id" label="訂單編號" width="150" />
						<el-table-column prop="name" label="名字" />
						<el-table-column label="數量"  width="180"/>

						<el-table-column prop="total_price" label="單價" />
						<el-table-column prop="account" label="收件地址" />

					</el-table>


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
.order{
    height: 100%;
    .top{
        width: 100%;
		margin-bottom: 20px;
        display: flex;
      .search{
        width: 180px;
		margin-right: 20px;
      }

    }
}
.paginationBox{
    margin: 10px auto;
}

.order-details{
	margin-bottom: 3%;

}
.order-details2{

}

</style>