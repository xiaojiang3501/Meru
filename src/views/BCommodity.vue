<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'

// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/product.js'
const getprodata = useProduct();
const { products } = storeToRefs(getprodata);
import axios from 'axios'

onMounted(() => {
    fetchData()
})

const fetchData = () => {
    // fetch('api/products')
	axios.get('http://localhost:3000/products')
    .then(data => data.json())
    .then(data => {
        // console.log(data); 
        products.value = data;

    })
}

const dialogFormVisible = ref(false);
const dialogType = ref('add');
const search_info = ref('');
const form = reactive({});
const isFormValid = ref(true);
const FormRef = ref();

//表單驗證規則
const rule = ref({
    product_name:[
        {required:true,message:'请输入名字',trigger:'blur'},
		{min:1,max:10,message:'請輸入1-10位字符長度',trigger:'blur'}
    ],
    ingredient:[
        {required:true,message:'请输入成分',trigger:'blur'}
    ],
    allergen:[
        {required:true,message:'请输入過敏原',trigger:'blur'}
    ],
    price:[
        {required:true,message:'请输入價格',trigger:'blur'},
        {min:1,max:6,message:'請輸入1-6位數字',trigger:'blur'}
    ],
	inventory:[
        {required:true,message:'请输入庫存',trigger:'blur'},
        {min:1,max:6,message:'請輸入1-6位數字',trigger:'blur'}
    ]
});


// // 快速搜尋篩選
const filteredTableData = computed(() => {
	return products.value.filter((item) =>
		!search_info.value ||
		item.product_name.toLowerCase().includes(search_info.value.toLowerCase())
	);
});


//新增
const handleAdd = () => {
	dialogFormVisible.value = true;
    dialogType.value = 'add';
    form.image = '';
    form.product_name = '';
    form.ingredient = '';
    form.allergen = '';
    form.price = '';
    form.inventory = '';
    form.product_suspend = true;
};

//編輯
const handleEdit = (row) => {
    dialogFormVisible.value = true;
    dialogType.value = 'edit';
	form.product_id = row.product_id;
    form.image = row.image;
    form.product_name = row.product_name;
    form.ingredient = row.ingredient;
    form.allergen = row.allergen;
    form.price = row.price;
    form.inventory = row.inventory;
    form.product_suspend = row.product_suspend;
	FormRef.value.clearValidate();
};




//確認
const handleConfirm = () => {
    FormRef.value.validate(valid => {
        if (valid){
            isFormValid.value = true;
            dialogFormVisible.value = false;
			if (dialogType.value === 'add') {
				products.value.push({
				product_id: (products.value.length +1).toString(),
				...form
				});
				ElMessage({
					type: 'success',
					message: '商品已新增',
				});

			} else {
				let index = products.value.findIndex(item => item.product_id === form.product_id);
				products.value[index] = form
				ElMessage({
					type: 'success',
					message: '商品已編輯',
				});
			};
        }
    });

};

//刪除
const handleDelete = ({product_id}) => {
	ElMessageBox.confirm('確定要刪除？', '刪除', { //內容,標題
    confirmButtonText: '確定', //按鈕
    icon: markRaw(Delete),
    callback: function(action) { //按鈕完出現的訊息
		if (action === 'confirm') {
        let index = products.value.findIndex(item => item.product_id == product_id);
        products.value.splice(index, 1);
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
				@click="handleAdd()">新增商品</el-button>

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
						<el-switch  v-model="row.product_suspend" /> <!-- 使用 row.suspend 绑定每行的停權狀態 -->
					</template>
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="150" class="edit">
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
				:total= products.length
				layout="total, prev, pager, next, jumper"
				@current-change="handleCurrentChange"
				/>
			</div>

		</el-row>
	</el-card>
    
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
		<el-upload
		class="form-upload"
		ref="handleConfirm"
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
		<img v-if="form.image" :src="form.image" class="avatar" />
  		<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
		</el-upload>
		<el-form-item 
		label="名字" 
		prop="product_name" 
		:label-width="formLabelWidth">
			<el-input 
			v-model="form.product_name" 
			style="width: 150px;"/>
		</el-form-item>
		<el-form-item 
		label="成分" 
		prop="ingredient" 
		:label-width="formLabelWidth">
			<el-input 
			type="textarea" 
			v-model="form.ingredient" 
			:autosize="{ minRows: 2, maxRows: 4}"/>
		</el-form-item>
		<el-form-item 
		label="過敏原" 
		prop="allergen" 
		:label-width="formLabelWidth">
			<el-input 
			type="textarea" 
			v-model="form.allergen" 
			:autosize="{ minRows: 2, maxRows: 4}"/>
		</el-form-item>
		<el-form-item 
		label="價格" 
		prop="price" 
		:label-width="formLabelWidth">
			<el-input 
			v-model="form.price" 
			style="width: 150px;"/>
		</el-form-item>
		<el-form-item 
		label="庫存" 
		prop="inventory" 
		:label-width="formLabelWidth">
			<el-input 
			v-model="form.inventory" 
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