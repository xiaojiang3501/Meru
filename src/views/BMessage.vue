<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { markRaw } from 'vue'
import { Delete, Search } from '@element-plus/icons-vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
// import { storeToRefs } from 'pinia'
// import { useMember } from '@/store/member.js'
// const getmemdata = useMember();
// const { members } = storeToRefs(getmemdata);

import axios from 'axios'

const apiUrl = 'http://localhost:3000/messages';
const tabValue = ref("1")  //預設第一個
const search_info = ref('');
const showAnswer = ref(false);
const messages = ref([])
const selectedRow = ref(null);
const newMessage = reactive({
    FAQ_date:'',
    user_name: '', 
    account: '',
    question: '',
    answer: '',

});

onMounted(() => {
    fetchData()
})

//抓資料
const fetchData = async () => {
    const response = await axios.get(apiUrl);
    messages.value = response.data;
};

// 快速搜尋篩選
const filteredTableData = computed(() => {
    return messages.value.filter((item) =>
        !search_info.value ||
        item.user_name.toLowerCase().includes(search_info.value.toLowerCase()) ||
        item.account.toLowerCase().includes(search_info.value.toLowerCase()) 
    );
});

//回覆
const showAnswerForm = (row) => {
    showAnswer.value = true;
    newMessage.user_name = row.user_name
    newMessage.account = row.account
    newMessage.question_type = row.question_type
    newMessage.question_title = row.question_title
    newMessage.question = row.question
};



//分頁
const pageSize = ref(10) // 10個項目為一頁
const currentPage = ref(1) // 初始顯示第幾頁
const handleCurrentChange = (page) => {
    currentPage.value = page;  // 每次點擊分頁按鈕發生變化
}

</script>

<template>
    <el-card>
        <!-- 搜尋 -->
        <div class="search">
            <el-input
            v-model="search_info"
            placeholder="搜尋"
            :suffix-icon="Search"
            />
        </div>
        <el-tabs v-model="tabValue">
            <el-tab-pane label="未讀" name="1" class="message-noread">
                <el-table 
                :default-sort="{ prop: 'date',order: 'descending' }"
				:header-cell-style="{color:'#596580',textAlign: 'center'}"
                :cell-style="{ textAlign: 'center' }"
                :data="filteredTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">

                    <el-table-column type="selection" width="55">
					</el-table-column>
                    <el-table-column prop="FAQ_date" label="日期" width="120" />
                    <el-table-column prop="user_name" label="姓名" 
                    width="150"/>
                    <el-table-column prop="account" label="帳號"  
                    width="150"/>
                    <el-table-column prop="question_type" label="問題類型" />
                    <el-table-column prop="question_title" label="問題" />
                    <el-table-column fixed="right" label="操作" width="120" class="edit">
                    <template #default="{ row }">
                        <el-button
                        link
                        size="small"
                        type="primary"
                        @click="showAnswerForm(row)">回覆</el-button>
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
                    :total=messages.length
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    />
                </div>
            </el-tab-pane>

            <el-tab-pane label="已讀" name="2" class="message-read">
                <el-form>

                    <!-- 下面頁碼 -->
                    <div class="paginationBox">
                    <el-pagination
                    :page-size="pageSize"
                    :current-page="currentPage"
                    :total=messages.length
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentChange"
                    />
                </div>
                    
                </el-form>
            </el-tab-pane>
        </el-tabs>


        <!-- 回覆彈窗 -->
        <el-dialog 
        v-model="showAnswer" 
        title="回覆信件">
            <div class="message-answer">
                <h4 class="name"> {{ newMessage.question_title }}</h4>


                <h6 class="name">姓名 &nbsp {{ newMessage.user_name }}</h6>
                <h6 class="account">帳號 &nbsp {{ newMessage.account }}</h6>

                <el-divider content-position="left"></el-divider>
                <h6>{{ newMessage.question_type }}</h6>
                <p class="question">{{ newMessage.question }}</p>
                <el-input 
                type="textarea" 
                v-model="newMessage.answer" 
                class="answer"
                :autosize="{ minRows: 10, maxRows: 4}"/>
            </div>


            <template #footer>
                <span class="dialog-footer">
                    <el-button 
                    type="primary" 
                    @click="reply">發送</el-button>
                </span>
            </template>
        </el-dialog>
        
    </el-card>


</template>


<style lang="scss" scoped>

.search{
    width: 300px;
}
.message-noread{
    .paginationBox{
        margin: 10px auto;
    }

}

.message-answer{

    .question{

    }
    .answer{
        margin-top: 5% ;
    }
}



</style>
  