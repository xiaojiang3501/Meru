<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useOrder } from '@/store/order.js'
const getordata = useOrder();
const { orderData } = storeToRefs(getordata);


onMounted(() => {
    fetchData()
})

const fetchData = () => {
    fetch('api/order')
    .then(data => data.json())
    .then(data => {
        console.log(data.order); 
        orderData.value = data.order;
		console.log(orderData.value); 

    })
}


// const tableData = reactive([
//   {
//     id: '1',
//     date: '2023-09-21',
//     name: '草莓',
//     price: '60',
//     account: '10',
//     state: '成功'
    
//   },
//   {
//     id: '2',
//     date: '2023-09-22',
//     name: '藍莓',
//     price: '60',
//     account: '10',
//     state: '失敗'
//   },
//   {
//     id: '3',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '4',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '3',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '4',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '3',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '4',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '3',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '4',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '3',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
//   {
//     id: '4',
//     date: '2023-09-28',
//     name: '小醬',
//     price: '60',
//     account: '10',
//     state: '成功'
//   },
// ])


// 搜尋

const search_info = ref('');

const filteredTableData = computed(() => {
	// console.log(orderData.value); 
	return orderData.value.filter((item) =>
		!search_info.value ||
		item.order_id.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.account.toLowerCase().includes(search_info.value.toLowerCase()) 
	);
});

//查詢時間
const search_time = ref('');

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
				border
				:default-sort="{ prop: 'date',order: 'descending' }"
				:header-cell-style="{background:'#ecf5ff',color:'#606266',textAlign: 'center'}"
				:cell-style="{ textAlign: 'center' }"
				:data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
				style="width: 100%">
					<el-table-column fixed sortable prop="order_id" label="訂單編號" width="120" />
					<el-table-column fixed prop="order_date" label="訂單日期" sortable width="120" />
					<el-table-column prop="user_name" label="會員名字"  width="150" />
					<el-table-column prop="account" label="帳號" />
					<el-table-column prop="price" label="金額"  width="100" />
					<el-table-column
					prop="state"
					label="狀態"
					width="100"
					:filters="[
						{ text: '成功', value: '成功' },
						{ text: '失敗', value: '失敗' },
					]"
					:filter-method="filterTag"
					filter-placement="bottom-end"
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
						@click="handleCheck(scope.$index, scope.row)">查看</el-button>
						<el-button
						link
						size="small"
						type="primary"
						@click="handleEdit(row)">編輯</el-button>
						<el-button
						link
						size="small"
						type="primary"
						@click="handleDelete(row)">刪除</el-button>
					</template>
					</el-table-column>
					
				</el-table>

				<!-- 下面頁碼 -->
				<div class="paginationBox">
				<el-pagination
				:page-size="pageSize"
				:current-page="currentPage"
				:total=orderData.length
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
				/>
				</div>



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

</style>