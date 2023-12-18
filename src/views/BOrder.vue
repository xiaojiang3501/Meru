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

const apiUrl = 'http://localhost:4000/backstage/order';
const search_info = ref(''); // 快速搜尋篩選
const search_time = ref(''); //查詢時間
const showCheck = ref(false);

const FormRef = ref(null); 
const form = reactive({});


onMounted(() => {
    fetchData()
})


//抓資料
const fetchData = async () => {
    const response = await axios.post(apiUrl);
    orders.value = response.data;

};


// 快速搜尋篩選
const filteredTableData = computed(() => {

	return orders.value.filter((item) =>
		!search_info.value ||
		item.order_id.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
		item.account.toLowerCase().includes(search_info.value.toLowerCase()) 
	);
});

//詳情
const handleCheck = (row) => {
    showCheck.value = true;

    // console.log(row);
	form.user_id = row.user_id;
	form.order_id = row.order_id;
    form.order_date = row.order_date;
    form.user_name = row.user_name;
    form.account = row.account;
	form.address = row.address;
    form.phone = row.phone;
	form.total_price = row.total_price;
	form.pay = row.pay;
	form.items = row.items;

}


//刪除
const handleDelete = async (orderId) => {
	await ElMessageBox.confirm('確定要刪除？', '刪除', { //內容,標題
    confirmButtonText: '確定', //按鈕
    icon: markRaw(Delete),
	});
	await axios.delete(`${apiUrl}/${orderId}`);
    orders.value = orders.value.filter((order) => order.id !== orderId);
    ElMessage.success('删除成功');

}



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
					prop="order_state"
					label="訂單狀態"
					width="100"
					>
					<template #default="{ row }">
						<el-tag
						:type="row.order_state === '成功' ? 'success' : 'danger'"
						disable-transitions
						>{{ row.order_state }}</el-tag
						>
					</template>
					
					</el-table-column>

					<el-table-column
					prop="pay_state"
					label="交易狀態"
					width="100"
					>
					<template #default="{ row }">
						<el-tag
						:type="row.pay_state === '成功' ? 'success' : 'danger'"
						disable-transitions
						>{{ row.pay_state }}</el-tag
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
				v-model="showCheck" 
				title="詳情">
					<!-- 上面 -->
					<el-table 
					:default-sort="{ prop: 'date',order: 'descending' }"
					:header-cell-style="{color:'#596580',textAlign: 'center'}"
					:cell-style="{ textAlign: 'center' }"
					:data="[form]"
					class="order-details">
						<el-table-column fixed sortable prop="order_id" label="訂單編號" width="150" />
						<el-table-column fixed prop="order_date" label="訂單日期" sortable width="150" />

						<el-table-column prop="pay" label="交易方式" />
						<el-table-column prop="total_price" label="總金額"  width="100" />
						<el-table-column prop="address" label="收件地址" />

					</el-table>
					<!-- 下面 -->
					<el-table 
					border
					:header-cell-style="{background:'#ecf5ff',color:'#606266',textAlign: 'center'}"
					:cell-style="{ textAlign: 'center' }"
					:data="form.items"
					class="order-details2">
						<el-table-column  prop="product_image" label="商品圖片" width="150" />
						<el-table-column prop="product_name" label="商品名字" />
						<el-table-column prop="quantity" label="數量"  width="180"/>

						<el-table-column prop="price" label="單價" />

					</el-table>


					<template #footer>
						<span class="dialog-footer">
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