<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
const getuserdata = useUser();
const { userData } = storeToRefs(getuserdata);
// ===============Other===================================
import axios from 'axios'

const apiUrl = 'http://localhost:4000/user';
const tabValue = ref("1")  //預設第一個
const showAnswer = ref(false);
const updateData = reactive({
    Member_ID: userData.value.user.Member_ID,
    account: userData.value.user.account,
    password: userData.value.user.password,
    name: userData.value.user.name,
    phone: userData.value.user.phone,
    address: userData.value.user.address,
});

const orderData = ref()
const showCheck = ref(false);
const form = reactive({});

onMounted(() => {
    updateOrder()
})

//更新資料
const updateUser = () => {
    axios.put(apiUrl + '/edit-user', updateData);
    ElMessage({
        type: 'success',
        message: '更改成功',
    });
    userData.value.user.password = updateData.password
    userData.value.user.name = updateData.name
    userData.value.user.phone = updateData.phone
    userData.value.user.address = updateData.address
}

// 重置 updateData 為原始數據
const cancelUpdate = () => {
    updateData.password = userData.value.user.password;
    updateData.name = userData.value.user.name;
    updateData.phone = userData.value.user.phone;
    updateData.address = userData.value.user.address;
};

//訂單資料
const updateOrder = async () => {
    const Member_ID = userData.value.user.Member_ID
    const response = await axios.post(`${apiUrl}/user-order/${Member_ID}`)
    orderData.value = response.data.data;
    console.log(orderData.value)

}

//詳情
const handleCheck = (row) => {
    showCheck.value = true;
    form.payee = row.payee;
	form.payment_address = row.payment_address;
    form.payee_phone = row.payee_phone;
	form.total_price = row.total_price;
	form.pay = row.pay;
	form.ship = row.ship;
	form.items = row.items;
    console.log(form.items)

}

//密碼
const passwordType = ref(false)


// 提問新訊息--------------
const question = () => {
    showAnswer.value = true;
}

const newMessage = ref()
const newMessage_content = ref()
const option = ref('')
const options = [
  {
    value: '商品問題',
    label: '商品問題',
  },
  {
    value: '付款問題',
    label: '付款問題',
  },
  {
    value: '訂單問題',
    label: '訂單問題',
  },
  {
    value: '帳戶問題',
    label: '帳戶問題',
  },
  {
    value: '其他問題',
    label: '其他問題',
  },
]

//寄信
const send = () => {
    const message = {
        question_title: newMessage.value,
        question_content: newMessage_content.value,
        question_type: option.value,
        name: name.value,
        account: account.value
    }
    axios.post(apiUrl,message)
}

//回覆
const replyMessage = reactive({
    FAQ_date:'',
    name: '', 
    question_type:'', 
    question_title:'', 
    question_content:'',
    answer: '',

});



// 登出
const Logout = () => {
    sessionStorage.removeItem('User')
    sessionStorage.removeItem('token')
    router.push({ path: "/" })
    alert("成功登出")
}

</script>
<template>
  <el-row>
    <el-tabs v-model="tabValue" class="user-container" tab-position="left">
        <el-tab-pane label="個人資訊" name="1">
            <el-form 
            :model="updateData"  
            :rules="rules"
            class="user-table">
                <el-form-item label="帳號">
                    <el-input :disabled="true" v-model="updateData.account" style="width: 350px;"/>
                </el-form-item>
                <el-form-item label="密碼">
                    <el-input 
                    required 
                    v-model="updateData.password" 
                    :type="passwordType ? 'text' : 'password'" 
                    style="width: 350px;">
                        <template #suffix >
                            <div @click="passwordType = !passwordType" style="cursor: pointer;">
                                <el-icon v-if="passwordType" ><View /></el-icon>
                                <el-icon v-else><Hide /></el-icon>
                            </div>

                        </template>
                    </el-input>

                </el-form-item>
                <el-form-item label="姓名">
                    <el-input required v-model="updateData.name" style="width: 350px;"/>
                </el-form-item>
                <el-form-item label="電話">
                    <el-input required v-model="updateData.phone" style="width: 350px;"/>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input required v-model="updateData.address" style="width: 350px;"/>
                </el-form-item>

                <div class="user-personal-button">

                    <el-button @click="cancelUpdate">重置</el-button>

                    <el-button type="primary"  @click="updateUser" >儲存變更</el-button>

                </div>
            </el-form>
        </el-tab-pane>

        <el-tab-pane label="我的訂單" name="2">
            <el-table 
            border
            :data="orderData" 
            :default-sort="{ prop: 'date',order: 'descending' }"
            :header-cell-style="{color:'#606266',textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            style="width: 90%; margin-left: 50px;">
                <el-table-column fixed prop="Order_ID" label="訂單編號" />
                <el-table-column fixed prop="create_time" label="訂單日期" width="180"/>
                <el-table-column prop="total_price" label="金額"  />
                <el-table-column prop="pay_state" label="交易狀態">
                    <template #default="{ row }">
                        <el-tag :type="row.pay_state === '成功' ? 'success' : 'danger'">{{ row.pay_state }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="詳情" width="150" class="edit">
                    <template #default="{ row }">
                        <el-button 
                        size="small" 
                        type="primary"
                        @click="handleCheck(row)">查看</el-button>
                    </template>
                </el-table-column>
                
            </el-table> 
            <!-- 彈窗 -->
            <el-dialog 
            width="80%"
            v-model="showCheck" 
            title="詳情">
                <!-- 訂單詳情 -->
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
        </el-tab-pane>

    
        <!-- <el-tab-pane label="信息" name="3" >
            <template #label >
                <el-badge 
                :value="userData.length" 
                :hidden="userData.length === 0"
                class="item" 
                type="danger" >
                信息</el-badge>
            </template>
            <div class="user-messages">
                <el-button 
                type="primary" 
                class="user-question"
                @click="question">提問</el-button>
                <el-divider ></el-divider>

                <div class="user-message" v-for="email in emails" :key="email.id">
                    
                </div>

                <el-dialog 
                v-model="showAnswer" >
                    <div class="message-answer">
                        <h6>標題</h6>
                        <div  class="message-top">
                            <el-input v-model="newMessage"></el-input>
                            <el-select v-model="option" class="m-2" placeholder="請選擇問題">
                                <el-option
                                v-for="item in options"
                                :key="item.option"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>

                        </div>

                        <h6>內容</h6>
                        <el-input 
                        type="textarea" 
                        v-model="newMessage_content" 
                        class="answer"
                        :autosize="{ minRows: 10, maxRows: 4}"/>
                    </div>


                    <template #footer>
                        <span class="dialog-footer">
                            <el-button 
                            type="primary" 
                            @click="send">發送</el-button>
                        </span>
                    </template>
                </el-dialog>


            </div>

            
        </el-tab-pane> -->

        <el-tab-pane label="登出"  name="4">
            <template #label >
                <el-button  @click="Logout()">登出</el-button>
            </template>
        </el-tab-pane>

    </el-tabs>

</el-row>


    
</template>
<style lang="scss" scoped>

.user-container{
    width: 70%;
    margin: 5% auto;
    padding: 5% 2%;
    border: 1px solid rgb(184, 184, 184);
    border-radius: 10px;
    .user-table{
        width: 50%;
        margin: 5% auto;
        // border: 1px solid rgb(184, 184, 184);
    }
    .user-personal-button{
        width: 160px;
        display: flex;
        margin: 10% auto 3%;

    }
    .user-messages{
        margin: 0 3%;
        .user-message{
            width: 97%;
            border: 1px solid #e7e7e7;
            height: 120px;
            border-radius: 8px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
            margin: 1% 0 3%;
            padding: 10px;
        
        }
        h6{
            margin: 1% 0;
        }
        .message-top{
            display: flex;
        }
        .el-input{
            margin-right: 30px;
        }
        .user-question{
        }
    }

}


.el-form-item{
    margin-bottom: 20px;
    .el-input{
        margin-left: 50px;
    }
}


</style>