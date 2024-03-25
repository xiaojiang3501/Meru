<template>

	<el-button
	size="small"
	type="primary"
	class="add"
	@click="showAddForm()">新增商品</el-button>
	<!-- 新增彈窗 -->
	<el-dialog 
	v-model="showAdd" 
	title="新增會員">
		<el-form 
		label-width="70px"
		:model="newProduct"
		@submit.prevent="addCommodity">
			<el-upload
			ref="uploadRef"
			class="form-upload"
			action="#"
			list-type="picture-card"
			:auto-upload="false"
			:limit="1"
            :show-file-list="true"
			:http-request="addCommodity"
			>
			<img v-if="newProduct.image" :src="newProduct.image"  class="avatar" />
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




</template>
  
<script setup>
import { ref, onMounted, computed, reactive, nextTick } from 'vue'
import axios from 'axios';
import { Plus } from '@element-plus/icons-vue'

const apiUrl = 'http://localhost:4000/backstage';
const showAdd = ref(false);
const uploadRef = ref(null);
const imageUrl = ref('');

const newProduct = reactive({
    image:'',
    product_name: '', 
    ingredient: '',
    allergen: '',
    price: '',
    inventory: ''
});

const showAddForm = () => {
	showAdd.value = true;
    imageUrl.value = '';
};

const addCommodity = async (file) => {
    console.log(file.file)

	const formData = new FormData();
	formData.append('file', file.file);
	formData.append('product_name', newProduct.product_name);
	formData.append('ingredient', newProduct.ingredient);
	formData.append('allergen', newProduct.allergen);
	formData.append('price', newProduct.price);
	formData.append('inventory', newProduct.inventory);
	formData.append('product_suspend', newProduct.product_suspend);
	for (const entry of formData.entries()) {
		console.log(entry[0], entry[1]);
	}



	const response = await axios.post(apiUrl + '/create-product', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
	// console.log(response)

	showAdd.value = false;

}


</script>

  <style scoped>
  .avatar-uploader {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	overflow: hidden;
	position: relative;
	width: 120px;
	height: 120px;
  }
  
  .avatar {
	width: 100%;
	height: 100%;
	border-radius: 6px;
  }
  
  .avatar-uploader-icon {
	font-size: 28px;
	color: #999;
  }
  
  </style>
  