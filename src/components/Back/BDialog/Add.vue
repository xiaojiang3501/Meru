<script setup>
import { ref, onMounted, computed, defineEmits, reactive, defineProps } from 'vue'

const emits = defineEmits(['update:modelValue'])

const { tableData } = defineProps(['tableData']); // Receive tableData prop

const handleClose = () =>{
    emits('update:modelValue', false);
}
const handleConfirm = () =>{
    tableData.push({
        image: '../public/products/1.png',
        name: form.name,
        price: form.price,
        inventory: form.inventory,
        suspend: ref(true)
    });
    emits('confirmed');

    // Reset the form fields and close the dialog
    form.name = '';
    form.price = '';
    form.inventory = '';
    emits('update:modelValue', false);
}
const formRef = ref(0)
const form = reactive({
    name:'',
    price:'',
    inventory:''
})
</script>

<template>
    <!-- 新增 -->
    <el-dialog :model-value="dialogFormVisible" title="新增商品">
    <el-form 
    label-width="70px"
    ref="formRef" 
    :model="form"
    @close="handleClose">

        <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-form-item label="名字" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="成分" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="庫存" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="價格" prop="price" :label-width="formLabelWidth">
            <el-input v-model="form.price" style="width: 200px;"/>
        </el-form-item>
        <el-form-item label="庫存" prop="inventory" :label-width="formLabelWidth">
            <el-input v-model="form.inventory" style="width: 200px;"/>
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

<style lang="scss">



</style>
