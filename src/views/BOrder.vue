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
// ===============Other===================================
import axios from 'axios'

const apiUrl = 'http://localhost:4000/backstage';
const search_info = ref(''); // 快速搜尋篩選
const search_info_completed = ref(''); // 快速搜尋篩選
const search_time = ref(''); //查詢時間
const showCheck = ref(false);
const disabledFutureDates = ref((time) => time.getTime() > Date.now()); //禁止選未來時間

const FormRef = ref(null); 
const form = reactive({});


onMounted(() => {
    fetchData()

})


//抓資料
const fetchData = async () => {
    const response = await axios.post(apiUrl + '/order');
    orders.value = response.data.data;
};

// 待處理快速搜尋篩選
const filteredTableData = computed(() => {
    return orders.value.filter((item) =>
        (item.order_state === '待處理') &&
        (!search_info.value ||
            item.Order_ID.toString().toLowerCase().includes(search_info.value.toLowerCase()) ||
            item.payee.toLowerCase().includes(search_info.value.toLowerCase()) ||
            item.account.toLowerCase().includes(search_info.value.toLowerCase())
        )
    );
});
// 已處理快速搜尋篩選
const completedOrders = computed(() => {
    return orders.value.filter((item) =>
        (item.order_state === '已處理') &&
        (!search_info_completed.value ||
            item.Order_ID.toString().toLowerCase().includes(search_info_completed.value.toLowerCase()) ||
            item.payee.toLowerCase().includes(search_info_completed.value.toLowerCase()) ||
            item.account.toLowerCase().includes(search_info_completed.value.toLowerCase())
        )
    );
});


//詳情
const handleCheck = (row) => {
    showCheck.value = true;

    // console.log(row);
	form.Member_ID = row.Member_ID;
	form.Order_ID = row.Order_ID;
    form.create_time = row.create_time;
    form.payee = row.payee;
    form.account = row.account;
	form.payment_address = row.payment_address;
    form.payee_phone = row.payee_phone;
	form.total_price = row.total_price;
	form.pay = row.pay;
	form.ship = row.ship;
	form.items = row.items;

}
//編輯
const editOrder = () => {

}

//刪除
const handleDelete = async (Order_ID) => {
	await ElMessageBox.confirm('確定要刪除？', '刪除', { //內容,標題
        confirmButtonText: '確定', //按鈕
        cancelButtonText: '取消',
        icon: markRaw(Delete)
	});
	await axios.delete(`${apiUrl}/delete-order/${Order_ID}`);
    orders.value = orders.value.filter((order) => order.Order_ID !== Order_ID);
    ElMessage.success('删除成功');

}

//完成
const handleSuccess = async (Order_ID) => {
	await axios.put(`${apiUrl}/toggle-order/${Order_ID}`, {
		order_state: '已處理',
	});
	// 只在成功更新后，將新的狀態赋值
	row.order_state = '已處理';
}
//取消完成
const handleCancel = async (Order_ID) => {
	await axios.put(`${apiUrl}/toggle-order/${Order_ID}`, {
		order_state: '待處理',
	});
	row.order_state = '待處理';
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
				<el-tabs 
				type="border-card"
				class="demo-tabs">
					<el-tab-pane label="待處理"  >
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
								style="width: 300px; margin-right: 10px;"/>
							</div>

							<div>
								<el-button 
								type="primary" 
								@click="editOrder">查詢</el-button>
							</div>

						</div>
						<el-table 
						:default-sort="{ prop: 'date',order: 'descending' }"
						:header-cell-style="{color:'#596580',textAlign: 'center'}"
						:cell-style="{ textAlign: 'center' }"
						:data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
							<!-- <el-table-column type="selection" width="55">
							</el-table-column> -->

							<el-table-column fixed sortable prop="Order_ID" label="訂單編號" width="150" />
							<el-table-column fixed prop="create_time" label="訂單日期" sortable width="180" />
							<el-table-column prop="payee" label="會員名字"  width="100" />
							<el-table-column prop="account" label="帳號" />
							<el-table-column prop="total_price" label="總金額"  width="100" />

							<el-table-column
							prop="order_state"
							label="訂單狀態"
							width="100">
							<template #default="{ row }">
								<el-tag
								round
								:type="row.order_state === '已處理' ? 'success' : 'danger'"
								disable-transitions>
								{{ row.order_state }}</el-tag>
							</template>
							
							</el-table-column>

							<el-table-column
							prop="pay_state"
							label="交易狀態"
							width="100">
							<template #default="{ row }">
								<el-tag
								round
								:type="row.pay_state === '成功' ? 'success' : 'danger'"
								disable-transitions>
								{{ row.pay_state }}</el-tag>
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
								@click="handleDelete(row.Order_ID)">刪除</el-button>
								<el-button
								link
								size="small"
								type="success"
								@click="handleSuccess(row.Order_ID)">完成</el-button>
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
							@current-change="handleCurrentChange"/>
						</div>
					</el-tab-pane>
					<el-tab-pane label="已處理" >
						<div class="top">
							<!-- 搜尋 -->
							<div class="search">
								<el-input
								v-model="search_info_completed"
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
								style="width: 300px; margin-right: 10px;"/>
							</div>

							<div>
								<el-button 
								type="primary" 
								@click="editOrder">查詢</el-button>
							</div>

						</div>
						<el-table
						:data="completedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
						:default-sort="{ prop: 'create_time', order: 'descending' }"
						:header-cell-style="{ color: '#596580', textAlign: 'center' }"
						:cell-style="{ textAlign: 'center' }">
							<el-table-column fixed sortable prop="Order_ID" label="訂單編號" width="150" />
							<el-table-column prop="create_time" label="訂單日期" sortable width="180" />
							<el-table-column prop="payee" label="會員名字"  width="100" />
							<el-table-column prop="account" label="帳號" />
							<el-table-column prop="total_price" label="總金額"  width="100" />
							<el-table-column
							prop="order_state"
							label="訂單狀態"
							width="100">
							<template #default="{ row }">
								<el-tag
								round
								:type="row.order_state === '已處理' ? 'success' : 'danger'"
								disable-transitions>
								{{ row.order_state }}</el-tag>
							</template>
							
							</el-table-column>

							<el-table-column
							prop="pay_state"
							label="交易狀態"
							width="100">
							<template #default="{ row }">
								<el-tag
								round
								:type="row.pay_state === '成功' ? 'success' : 'danger'"
								disable-transitions>
								{{ row.pay_state }}</el-tag>
							</template>
							
							</el-table-column>

							<el-table-column fixed="right" label="操作" width="180" class="edit">
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
								@click="handleDelete(row.Order_ID)">刪除</el-button>
								<el-button
								link
								size="small"
								type="info"
								@click="handleCancel(row.Order_ID)">取消完成</el-button>
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
							@current-change="handleCurrentChange"/>
						</div>

					</el-tab-pane>
				</el-tabs>

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
						<el-table-column fixed sortable prop="Order_ID" label="訂單編號" width="150" />
						<el-table-column fixed prop="create_time" label="訂單日期" sortable width="180" />
						<el-table-column prop="payee_phone" label="電話" />
						<el-table-column prop="payment_address" label="收件地址" />
						<el-table-column prop="pay" label="交易方式" />
						<el-table-column prop="ship" label="運送方式" />
						<el-table-column prop="total_price" label="總金額"  width="100" />

					</el-table>
					<!-- 下面 -->
					<el-table 
					border
					:header-cell-style="{background:'#ecf5ff',color:'#606266',textAlign: 'center'}"
					:cell-style="{ textAlign: 'center' }"
					:data="form.items"
					class="order-details2">
						<el-table-column fixed prop="image" label="商品圖片" width="200" >
							<template #default="{ row }">
								<img :src="`../public/products/${row.image}`" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
							</template>
						</el-table-column>
						<el-table-column prop="product_name" label="商品名字" />
						<el-table-column prop="quantity" label="數量"  width="180"/>

						<el-table-column prop="price" label="單價" />

					</el-table>

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
	.paginationBox{
		margin: 10px auto;
		width: 300px;
		// border: 1px solid black;
		
	}
}
.demo-tabs{
	width: 100%;
}
// 彈窗
.order-details{
	margin-bottom: 3%;
}
.order-details2{

}

</style>