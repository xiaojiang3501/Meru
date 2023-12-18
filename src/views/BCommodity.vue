<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/product.js'
import { useRule } from '@/store/rule.js'
const { products } = storeToRefs(useProduct());
const { rule } = storeToRefs(useRule());

import axios from 'axios'

const apiUrl = 'http://localhost:4000/backstage/product';
const search_info = ref('');
const showAdd = ref(false);
const showEdit = ref(false);
const FormRef = ref();
const newProduct = reactive({
    image:'',
    product_name: '', 
    ingredient: '',
    allergen: '',
    price: '',
    inventory: '',
    product_suspend: ''

});
const editedProduct = ref(null);  


onMounted(() => {
    fetchData()
})

//抓資料
const fetchData = async () => {
	const response = await axios.post(apiUrl);
    products.value = response.data;
}


// // 快速搜尋篩選
const filteredTableData = computed(() => {
	return products.value.filter((item) =>
		!search_info.value ||
		item.product_name.toLowerCase().includes(search_info.value.toLowerCase())
	);
});


//新增
const showAddForm = () => {
	// 清空用+開窗口
	showAdd.value = true;
	nextTick(() => {
        FormRef.value.clearValidate();
    });
    newProduct.image = '';
    newProduct.product_name = '';
    newProduct.ingredient = '';
    newProduct.allergen = '';
    newProduct.price = '';
    newProduct.inventory = '';
    newProduct.product_suspend = true;
};

const addCommodity = async () => {
	FormRef.value.validate(async (valid) => {
    if (valid) {
        const response = await axios.post(apiUrl, newProduct);
        products.value.push(response.data);
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
const showEditForm = (product) => {
    showEdit.value = true;
    nextTick(() => {
        FormRef.value.clearValidate();
    });
	editedProduct.value = product;
    newProduct.image = product.image;
    newProduct.product_name = product.product_name;
    newProduct.ingredient = product.ingredient;
    newProduct.allergen = product.allergen;
    newProduct.price = product.price;
    newProduct.inventory = product.inventory;
    newProduct.product_suspend = product.product_suspend;
};

const editCommodity = () => {
	FormRef.value.validate(async (valid) => {
		if (valid) {
			const productId = editedProduct.value.id;
			const response = await axios.put(`${apiUrl}/${productId}`, newProduct );
			const index = products.value.findIndex((product) => product.id === productId);
			if (index !== -1) {
				products.value[index] = response.data;
			}

			//關窗口
			showEdit.value = false;
		}
	});
};

//停權
const toggleSuspendStatus = async (product) => {
    const productId = product.id;

    const newStatus = product.user_suspend;
	await axios.put(`${apiUrl}/${productId}`, {
		image: product.image,
		product_name: product.product_name,
		ingredient: product.ingredient,
		allergen: product.allergen,
		price: product.price,
		inventory: product.inventory,
		product_suspend: product.product_suspend,
	});

    // 只在成功更新后，將新的狀態赋值给 suspend 属性
    product.suspend = newStatus;
};



//刪除
const handleDelete = async (productId) => {

	await ElMessageBox.confirm('確定要刪除？', '提示', { //內容,標題
        confirmButtonText: '確定', //按鈕
        cancelButtonText: '取消',
        icon: markRaw(Delete)
    });

    await axios.delete(`${apiUrl}/${productId}`);
    products.value = products.value.filter((product) => product.id !== productId);
    ElMessage.success('删除成功');

}


//圖片
function beforeAvatarUpload(rawFile) {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('Avatar picture must be JPG format!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size cannot exceed 2MB!');
		return false;
	}
	return true;
}

//分頁
const pageSize = ref(5) // 5個項目為一頁
const currentPage = ref(1) // 初始顯示第幾頁
const handleCurrentChange = (page) => {
    currentPage.value = page;  // 每次點擊分頁按鈕發生變化
}

</script>
<template>
    <el-card class="commodity">
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
				@click="showAddForm()">新增商品</el-button>

			</div>

			<el-table 
			:header-cell-style="{color:'#596580',textAlign: 'center'}"
			:cell-style="{ textAlign: 'center' }"                
            :data="filteredTableData.slice((currentPage - 1) * pageSize, 
            currentPage * pageSize)"
			style="width: 100%">
				<el-table-column fixed prop="image" label="商品圖片" width="100" >
					<!-- !-- 使用插槽自定义列的内容 -->
					<template #default="{ row }">
						<img :src="row.image" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
					</template>
				</el-table-column>
				
				<el-table-column prop="product_name" label="商品名字"  width="100" />
				<el-table-column prop="ingredient" label="成分"  />
				<el-table-column prop="allergen" label="過敏原" width="150"/>
				<el-table-column prop="price" label="價格"  width="100" />
				<el-table-column prop="inventory" label="庫存" width="100" />

				<el-table-column prop="product_suspend" label="商品上架" width="80">
					<template #default="{ row }" >
						<el-switch  v-model="row.product_suspend" @change="toggleSuspendStatus(row)" /> <!-- 使用 row.suspend 绑定每行的停權狀態 -->
					</template>
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="150" class="edit">
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
				:total= products.length
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
				/>
			</div>

			<!-- 新增彈窗 -->
			<el-dialog 
			v-model="showAdd" 
			title="新增會員">
				<el-form 
				ref="FormRef"
				label-width="70px"
				:rules="rule"
				:model="newProduct"
				@submit.prevent="addCommodity">
					<el-upload
					class="form-upload"
					ref="addCommodity"
					action="#"
					list-type="picture-card"
					:http-request="uploadSubmit"
					:auto-upload="false"
					:limit="1"
					:show-file-list="true"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					@success="handleUploadSuccess"
					>
					<img v-if="newProduct.image" :src="newProduct.image" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>

					<el-form-item 
					label="名字" 
					prop="product_name" >
						<el-input 
						v-model="newProduct.product_name" 
						style="width: 200px;"/>
					</el-form-item>
					<el-form-item 
					label="成分" 
					prop="ingredient" >
						<el-input 
						type="textarea" 
						v-model="newProduct.ingredient" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="過敏原" 
					prop="allergen" >
						<el-input 
						type="textarea" 
						v-model="newProduct.allergen" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="價格" 
					prop="price" >
						<el-input 
						v-model="newProduct.price" 
						style="width: 150px;"/>
					</el-form-item>
					<el-form-item 
					label="庫存" 
					prop="inventory" >
						<el-input 
						v-model="newProduct.inventory" 
						style="width: 150px;"/>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button 
						type="primary" 
						@click="addCommodity">保存</el-button>
					</span>
				</template>
			</el-dialog>

			<!-- 編輯彈窗 -->
			<el-dialog 
			v-model="showEdit" 
			title="編輯會員">
				<el-form 
				ref="FormRef"
				label-width="70px"
				:rules="rule"
				:model="newProduct"
				@submit.prevent="editCommodity">
					<el-upload
					class="form-upload"
					ref="editCommodity"
					action="#"
					list-type="picture-card"
					:http-request="uploadSubmit"
					:auto-upload="false"
					:limit="1"
					:show-file-list="true"
					:before-upload="beforeAvatarUpload"
					:on-exceed="handleExceed"
					@success="handleUploadSuccess"
					>
					<img v-if="newProduct.image" :src="newProduct.image" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>

					<el-form-item 
					label="名字" 
					prop="product_name" >
						<el-input 
						v-model="newProduct.product_name" 
						style="width: 200px;"/>
					</el-form-item>
					<el-form-item 
					label="成分" 
					prop="ingredient" >
						<el-input 
						type="textarea" 
						v-model="newProduct.ingredient" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="過敏原" 
					prop="allergen" >
						<el-input 
						type="textarea" 
						v-model="newProduct.allergen" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="價格" 
					prop="price" >
						<el-input 
						v-model="newProduct.price" 
						style="width: 150px;"/>
					</el-form-item>
					<el-form-item 
					label="庫存" 
					prop="inventory" >
						<el-input 
						v-model="newProduct.inventory" 
						style="width: 150px;"/>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button 
						type="primary" 
						@click="editCommodity">保存</el-button>
					</span>
				</template>
			</el-dialog>

		</el-row>
	</el-card>
</template>


<style lang="scss" scoped>
.commodity{
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
.form-upload{
	margin: 0 0 20px 20px;
	.avatar{
		width: 140px;
	}
}

.paginationBox{
    margin: 10px auto;
}

</style>