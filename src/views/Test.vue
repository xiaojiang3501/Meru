<template>
  <div>
    <h2>文件上传</h2>

	<div>
	  <el-upload
		class="avatar-uploader"
		action="#"
		list-type="picture-card"
		:show-file-list="true"
		:limit="1"
		:http-request="uploadFile">
		<img v-if="imageUrl" :src="imageUrl" class="avatar" alt="Avatar" style="width: 200px; height: 200px;" />
		<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
	  </el-upload>
	</div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Plus } from '@element-plus/icons-vue'

const apiUrl = 'http://localhost:4000/backstage';

const imageUrl = ref(null);

const uploadFile = async (file) => {
	console.log(file)
	// 检查是否已经存在预览的图片，如果存在则先将其删除
	if (imageUrl.value) {
		// 删除操作，根据你的实际需求进行处理
		imageUrl.value = null;
	}

//   const formData = new FormData();
//   formData.append("file", file.file);
//   console.log(imageUrl.value)


//   const response = await axios.post(apiUrl + '/create-product', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//   console.log(response)


}


</script>


  