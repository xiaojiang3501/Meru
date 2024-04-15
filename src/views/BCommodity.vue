<script setup>
import { ref, onMounted, computed, reactive, nextTick, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/product.js'
import { useRule } from '@/store/rule.js'

const { products } = storeToRefs(useProduct());
const { rule } = storeToRefs(useRule());
// ===============Other===================================
import axios from 'axios'

const apiUrl = 'http://localhost:4000/backstage';
const search_info = ref('');
const showAdd = ref(false);
const showEdit = ref(false);
const FormRef = ref();
const uploadRef = ref(null);
const newProduct = reactive({
	Product_ID:'',
    image:'',
    product_name: '', 
    ingredient: '',
    allergen: '',
    price: '',
    inventory: '',
    product_suspend: ''
});

const editProduct = reactive({
	Product_ID:'',
    image:'',
    product_name: '', 
    ingredient: '',
    allergen: '',
    price: '',
    inventory: '',
    product_suspend: ''
});


const dialogVisible = ref(false);
const fileList = ref([]);
const fileList2 = ref([]);
const objClass = ref({
	upLoadShow: true,
	upLoadHide: false,
});
const objClass2 = ref({
	upLoadShow: true,
	upLoadHide: false,
});


onMounted(() => {
    fetchData()
})

// 關閉新增彈窗時清除上傳狀態
watch(showAdd, (newValue) => {
    if (!newValue) {
        nextTick(() => {
            uploadRef.value.clearFiles();
            clearUpload();
        });
    }
});

// 關閉编辑彈窗時清除上傳狀態
watch(showEdit, (newValue) => {
    if (!newValue) {
        nextTick(() => {
            uploadRef.value.clearFiles();
            clearUpload2();
        });
    }
});

// 通用的清除上傳狀態的函数
const clearUploadState = (classObj) => {
    classObj.value.upLoadHide = false;
    classObj.value.upLoadShow = true;
};

// 清除上傳狀態的函数1
const clearUpload = () => {
    clearUploadState(objClass);
};

// 清除上傳狀態的函数2
const clearUpload2 = () => {
    clearUploadState(objClass2);
};

// 通用的處理上傳變化的函数
const handleUploadChange = (classObj) => {
    classObj.value.upLoadHide = true;
    classObj.value.upLoadShow = false;
};

// 處理新增上傳變化的函数
const handleAddChange = (file, fileList) => {
    handleUploadChange(objClass);
};

// 處理删除新增圖片後的函数
const handleRemove = (file, fileList) => {
    clearUploadState(objClass);
};

// 處理编辑上傳變化的函数
const handleEditChange = (file, fileList) => {
    handleUploadChange(objClass2);
};

// 處理刪除编辑圖片後的函数
const handleRemove2 = (file, fileList) => {
    clearUploadState(objClass2);
};


// // 点击预览图的放大按钮后会触发handlePictureCardPreview
// const handlePictureCardPreview = (file) => {
// 	newProduct.image = file.url;
//   	dialogVisible.value = true;
// };

const beforeAvatarUpload = (rawFile) => {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('Avatar picture must be JPG format!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('Avatar picture size cannot exceed 2MB!');
		return false;
	}
	return true;
}



//抓資料
const fetchData = async () => {
	const response = await axios.post(apiUrl + '/product');
    products.value = response.data.data;
}

//快速搜尋篩選
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
		// uploadRef.value.clearFiles(); // 清空 el-upload 的文件列表
    });
	// fileList.value = [];
	console.log(newProduct.image)
	// newProduct.image = '';
    newProduct.product_name = '';
    newProduct.ingredient = '';
    newProduct.allergen = '';
    newProduct.price = '';
    newProduct.inventory = '';
};

const addCommodity = async (file) => {
    console.log(file.file)
	FormRef.value.validate(async (valid) => {
		if (valid) {
			const newProductID = products.value.length + 1;
			console.log(newProductID)
			const formData = new FormData();
			formData.append('file', file.file);
			formData.append('newProductID', newProductID);
			formData.append('product_name', newProduct.product_name);
			formData.append('ingredient', newProduct.ingredient);
			formData.append('allergen', newProduct.allergen);
			formData.append('price', newProduct.price);
			formData.append('inventory', newProduct.inventory);
			formData.append('product_suspend', newProduct.product_suspend);

			const response = await axios.post(apiUrl + '/create-product', formData);

			await fetchData();


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
const showEditForm = (row) => {
    showEdit.value = true;
    nextTick(() => {
        FormRef.value.clearValidate();
    });
	editProduct.Product_ID = row.Product_ID;
    editProduct.image = row.image;
    editProduct.product_name = row.product_name;
    editProduct.ingredient = row.ingredient;
    editProduct.allergen = row.allergen;
    editProduct.price = row.price;
    editProduct.inventory = row.inventory;
	editProduct.product_suspend = row.product_suspend;
};

const editCommodity = async (file) => {
	FormRef.value.validate(async (valid) => {
		if (valid) {

			const formData = new FormData();
			formData.append('file', file.file);
			formData.append('Product_ID', editProduct.Product_ID);
			formData.append('product_name', editProduct.product_name);
			formData.append('ingredient', editProduct.ingredient);
			formData.append('allergen', editProduct.allergen);
			formData.append('price', editProduct.price);
			formData.append('inventory', editProduct.inventory);
			formData.append('product_suspend', editProduct.product_suspend);
			console.log(formData);

			const response = await axios.put(`${apiUrl}/edit-product/${editProduct.Product_ID}`, formData);

			await fetchData();


			ElMessage({
				type: 'success',
				message: '商品已更新',
			});
			// 關窗口
			showEdit.value = false;
		}
  	});

};

//停權
const toggleSuspendStatus = async (row) => {
	const Product_ID = row.Product_ID;
    const newStatus = row.product_suspend;

	await axios.put(`${apiUrl}/toggle-product/${Product_ID}`, {
		product_suspend: newStatus,
	});

    // 只在成功更新后，將新的狀態赋值给 suspend 属性
    row.product_suspend = newStatus;
};


//刪除
const handleDelete = async (Product_ID) => {

	await ElMessageBox.confirm('確定要刪除？', '提示', { //內容,標題
        confirmButtonText: '確定', //按鈕
        cancelButtonText: '取消',
        icon: markRaw(Delete)
    });

    await axios.delete(`${apiUrl}/delete-product/${Product_ID}`);
    // products.value = products.value.filter((product) => product.Product_ID !== Product_ID);

	await fetchData();
    ElMessage.success('删除成功');

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
					<!-- !-- 使用插槽自定列的内容 -->
					<template #default="{ row }">
						<img :src="`../public/products/${row.image}`" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
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
					@click="handleDelete(row.Product_ID)">刪除</el-button>
				</template>
				</el-table-column>
				
			</el-table>

			<!-- 下面頁碼 -->
			<div class="paginationBox">
				<el-pagination
				:page-size="pageSize"
				:current-page="currentPage"
				:total=products.length
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
				/>
			</div>

			<!-- 新增彈窗 -->
			<el-dialog 
			v-model="showAdd" 
			title="新增商品">
				<el-form 
				ref="FormRef"
				label-width="70px"
				:rules="rule"
				:model="newProduct"
				@submit.prevent="addCommodity">
					<el-upload
					ref="uploadRef"
					action="#"
					list-type="picture-card"
					:class="objClass"
					:auto-upload="false"
					:file-list="fileList"
					:limit="1"
					:show-file-list="true"
					:http-request="addCommodity"
					:on-remove="handleRemove" 
					:on-change="handleAddChange"
					:before-upload="beforeAvatarUpload">
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
						@click="uploadRef.submit()">保存</el-button>
					</span>
				</template>
			</el-dialog>

			<!-- 編輯彈窗 -->
			<el-dialog 
			v-model="showEdit" 
			title="編輯商品">
				<el-form 
				ref="FormRef"
				label-width="70px"

				:model="editProduct"
				@submit.prevent="editCommodity">
					<el-upload
					ref="uploadRef"
					action="#"
					list-type="picture-card"
					:class="objClass2"
					:auto-upload="false"
					:file-list="fileList2"
					:limit="1"
					:show-file-list="true"
					:http-request="editCommodity"
					:on-remove="handleRemove2" 
					:on-change="handleEditChange" 
					:before-upload="beforeAvatarUpload">

					<img :src="`../public/products/${editProduct.image}`"  class="avatar" />
					</el-upload>

					<el-form-item 
					label="名字" 
					prop="product_name" >
						<el-input 
						v-model="editProduct.product_name" 
						style="width: 200px;"/>
					</el-form-item>
					<el-form-item 
					label="成分" 
					prop="ingredient" >
						<el-input 
						type="textarea" 
						v-model="editProduct.ingredient" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="過敏原" 
					prop="allergen" >
						<el-input 
						type="textarea" 
						v-model="editProduct.allergen" 
						:autosize="{ minRows: 2, maxRows: 4}"/>
					</el-form-item>
					<el-form-item 
					label="價格" 
					prop="price" >
						<el-input 
						v-model="editProduct.price" 
						style="width: 150px;"/>
					</el-form-item>
					<el-form-item 
					label="庫存" 
					prop="inventory" >
						<el-input 
						v-model="editProduct.inventory" 
						style="width: 150px;"/>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button 
						type="primary" 
						@click="uploadRef.submit()">保存</el-button>
					</span>
				</template>
			</el-dialog>

		</el-row>
	</el-card>
</template>


<style lang="scss" scoped>
.commodity{
    height: 100vh;
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
.avatar{
	width: 140px;
}



</style>