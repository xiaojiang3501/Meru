<template>
    <div>
      <h1>会员列表</h1>
      <el-button @click="showAddForm" type="primary">添加会员</el-button>
  
      <el-dialog v-model="showAdd" title="添加会员">
        <el-form 
        @submit.prevent="addMember" 
        label-position="top"
        :rules="rules"
		:model="newMember"
        ref="formRef">
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="newMember.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" >
            <el-input v-model="newMember.email"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addMember">保存</el-button>
        </el-form>
      </el-dialog>

	  <el-dialog v-model="showEdit" title="編輯会员">
        <el-form 
        @submit.prevent="editMember" 
        label-position="top"
        :rules="rules"
		:model="newMember"
        ref="formRef">
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="newMember.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" >
            <el-input v-model="newMember.email"></el-input>
          </el-form-item>
          <el-button type="primary" @click="editMember">保存</el-button>
        </el-form>
      </el-dialog>
  
      <el-table :data="members" style="width: 100%">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
		<el-table-column prop="suspend" label="停權" width="80">
			<template #default="{ row }" >
				<el-switch  v-model="row.suspend" @change="toggleSuspendStatus(row)" /> <!-- 使用 row.suspend 绑定每行的停權狀態 -->
			</template>
		</el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="showEditForm(row)" type="text">编辑</el-button>
            <el-button @click="deleteMember(row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, nextTick } from 'vue';
  import axios from 'axios';


  const apiUrl = 'http://localhost:3000/test';
  const showAdd = ref(false);
  const showEdit = ref(false);
  const newMember = reactive({ name: '', email: '', suspend: ''});
  const members = ref([]);
  const editedMember = ref(null); 
  const formRef = ref(null);

//   const suspend = ref(false); // 初始化为适当的值


const showAddForm= () =>{
	// 清空用+開窗口
    showAdd.value = true;
	newMember.name = '';
  	newMember.email = '';
	newMember.suspend = true;
	nextTick(() => {
        formRef.value.clearValidate();
    });
}

  const fetchMembers = async () => {
    const response = await axios.get(apiUrl);
    members.value = response.data;
  };
  
  const addMember = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			const response = await axios.post(apiUrl, newMember);
			members.value.push(response.data);
			// 關窗口
			showAdd.value = false;
		} 
	})

  };
  
const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 1, max: 20, message: '姓名长度应在2到20个字符之间', trigger: 'blur' },
  ],
	email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
});

const showEditForm = (member) => {

  // 设置编辑模式，将会员信息填充到表单中
  editedMember.value = member;
  newMember.name = member.name;
  newMember.email = member.email;
  newMember.suspend = member.suspend;
//   suspend.value = member.suspend;
  showEdit.value = true;
  nextTick(() => {
        formRef.value.clearValidate();
    });

//   console.log(newMember)
};

const editMember = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
        // 编辑会员，发送更新请求
        const memberId = editedMember.value.id;
		const response = await axios.put(`${apiUrl}/${memberId}`, newMember);
        const index = members.value.findIndex((member) => member.id === memberId);
        if (index !== -1) {
          members.value[index] = response.data;
        }
		//關窗口
      showEdit.value = false;
    }
  });
};

const toggleSuspendStatus = async (member) => {
	console.log(member.name)
    // 发送 axios.put 请求来更新停权状态
    const memberId = member.id;
    const newStatus = member.suspend;
	 await axios.put(`${apiUrl}/${memberId}`, {
		name: member.name,
		email: member.email,
		suspend: newStatus,
	});

    // // 只在成功更新后，将新的状态赋值给成员的 suspend 属性
    member.suspend = newStatus;
};



  const deleteMember = async (memberId) => {
    await axios.delete(`${apiUrl}/${memberId}`);
    members.value = members.value.filter((member) => member.id !== memberId);
  };
  
  onMounted(() => {
    fetchMembers();
  });
  </script>