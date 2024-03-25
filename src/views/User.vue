<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useUser } from '@/store/user.js'
const getuserdata = useUser();
const { userData } = storeToRefs(getuserdata);

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


//更新資料
const updateUser = () => {
    axios.put(apiUrl + '/edit-user', updateData)

}

// 重置 updateData 為原始數據
const cancelUpdate = () => {
    updateData.password = userData.value.user.password;
    updateData.name = userData.value.user.name;
    updateData.phone = userData.value.user.phone;
    updateData.address = userData.value.user.address;
};

// 提問新訊息
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

const reply = () => {


}


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
                    <el-input required v-model="updateData.password" type="password" style="width: 350px;" />
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
                :data="userData.order" 
                :default-sort="{ prop: 'date',order: 'descending' }"
                :header-cell-style="{color:'#606266',textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                style="width: 90%; margin-left: 50px;">
                    <el-table-column fixed prop="order_id" label="訂單編號" />
                    <el-table-column fixed prop="order_date" label="訂單日期" />
                    <el-table-column prop="total_price" label="金額"  />
                    <el-table-column prop="state" label="訂單狀態">
                        <template #default="{ row }">
                            <el-tag :type="row.state === '成功' ? 'success' : 'danger'">{{ row.state }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="150" class="edit">
                        <template #default="{ row }">
                            <el-button 
                            size="small" 
                            type="primary"
                            @click="handleCheck(row)">查看</el-button>
                        </template>
                    </el-table-column>
                    
            </el-table>
            

        </el-tab-pane>

    
        <el-tab-pane label="信息" name="3" >
            <template #label >
                <el-badge 
                :value="userDatalength" 
                :hidden="userDatalength === 0"
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

                <!-- 提問彈窗 -->
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

            
        </el-tab-pane>

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