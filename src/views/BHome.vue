<script setup>
import { ref, onMounted, watch, reactive, computed } from 'vue'
import * as echarts from 'echarts'

import axios from 'axios'


const apiUrl = 'http://localhost:4000/backstage/home';
const tableData = reactive([])
const tabDate = ref('month'); //預選顯示
const echartRef = ref(null); //圖表
const pickertime = ref(new Date); //選擇時間v-model
const datePickerType = ref('month'); //時間樣式
const datePickerFormat = ref('YYYY-MM'); //時間格式
const disabledFutureDates = ref((time) => time.getTime() > Date.now()); //禁止選未來時間
const now = new Date() //現在時間
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //抓當下月的天數



const today_pay = ref('');
const today_nopay = ref('');
const today_income = ref('');
const today_member = ref('');


// 月年切換
watch(tabDate, async() => {
    updatePickertime() 
    tabDate.value = tabDate.value 
    await SHistory(); 
})
onMounted( async () => {
    updatePickertime() 
    updateChart(tabDate.value)
    await SHistory()
});


// 選擇時間格式input
function updatePickertime() {
    switch (tabDate.value) {
        case 'month':
        datePickerType.value = 'month';
        datePickerFormat.value = 'YYYY-MM';
        break;
        case 'year':
        datePickerType.value = 'year';
        datePickerFormat.value = 'YYYY';
        break;
    }
}


// 查詢時間
async function SHistory(year, month) {
    if (pickertime.value) {
        year = pickertime.value.getFullYear();
        month = ("0" + (pickertime.value.getMonth() + 1)).slice(-2);
    }
    
  const timedata = await getDataWithParams(year, month);
  return timedata;  
}

// 把參數寫入
async function getDataWithParams(year, month) {   
    const hisparams = new URLSearchParams({
        time_mode: tabDate.value,
        year: year,
        month: month
    });
    const timedata = await axios.post(apiUrl , hisparams);
    // console.log(timedata.data.chart_data)
    today_pay.value = timedata.data.today_pay;
    today_nopay.value = timedata.data.today_nopay;
    today_income.value = timedata.data.today_income;
    today_member.value = timedata.data.today_member;

    const monthSalesData = timedata.data.month_sales;
    
    tableData.length = 0;
    tableData.push(...Object.keys(monthSalesData).map(name => ({
        name,
        number: monthSalesData[name]
    })));


    switch (tabDate.value) {
        case 'month':
            parseData(timedata.data.chart_data.history, data.month);
            break;
        case 'year':
            parseData(timedata.data.chart_data.history, data.year);
            break;
        default:
            break;
    }
    updateChart(tabDate.value, data)
    return timedata; 
}

// 把數據循環並放進data（圖表）
function parseData(dataArray, targetObject) {
    if (!dataArray || dataArray.length === 0) {
        targetObject.Income.fill(0);
        targetObject.Expense.fill(0);
        targetObject.Sales.fill(0);
        targetObject.Member.fill(0);
        targetObject.xAxisData.fill(0);
        return;
    }
    for (let i = 0; i < dataArray.length; i += 5) {
        const index = i / 5; // 6個循環
        targetObject.Income[index] = parseFloat(dataArray[i]) || 0; //收入
        targetObject.Expense[index] = parseFloat(dataArray[i + 1]) || 0; //支出
        targetObject.Sales[index] = parseFloat(dataArray[i + 2]) || 0; //銷售
        targetObject.Member[index] = parseFloat(dataArray[i + 3]) || 0; //會員
        targetObject.xAxisData[index] = parseFloat(dataArray[i + 4]) || 0; //X軸
    }
}

//圖表data
const data = {
    month: {
        xAxisData: Array.from(Array(daysInMonth).keys()).map(i => `${i + 1}`),
        Income: Array.from({length: daysInMonth}).fill(null),
        Expense: Array.from({length: daysInMonth}).fill(null),
        Member: Array.from({length: daysInMonth}).fill(null),
        Sales: Array.from({length: daysInMonth}).fill(null),
    },
    year: {
        xAxisData: Array.from(Array(12).keys()).map(i => `${i + 1}`), //X軸顯示內容
        Income: Array.from({length: 12}).fill(null),
        Expense: Array.from({length: 12}).fill(null),
        Member: Array.from({length: 12}).fill(null),
        Sales: Array.from({length: 12}).fill(null),
    }
}

//圖表
function updateChart(value) {

    const { xAxisData, Income, Expense, Sales, Member } = data[value]
    const myChart = echarts.getInstanceByDom(echartRef.value)
    if (myChart) {
        myChart.dispose()  
    }
    const newChart = echarts.init(echartRef.value)

    newChart.setOption({
        legend: {
            data: ['總銷售','收入','支出','加入會員數'] //最上面篩選
        },
        grid: { 
            left: '5%',
            right: '5%',
            bottom: '7%',
            containLabel: true //圖表不會超出區域
        },
        tooltip: {
            trigger: 'axis' //滑鼠移到點上顯示資訊
        },
        xAxis: {
            name: value === 'month' ? '天' : value === 'year' ? '月': 'year',  //點選不同時段會做切換
            nameLocation: 'middle', //name的位置
            nameGap: 40, //name的距離
            type: 'category', //圖表類型
            boundaryGap: false, //對齊
            data: xAxisData, //X軸數據
            axisLabel: {
                margin: 20 // 與X軸距離
            }
        },
        yAxis: [
            {
                name: '元',
                type: 'value',
                axisLabel: {
                    margin: 10, // 調整數據和 Y 軸的距離，根據需要調整數值
                },
                axisLine: { // 顯示Ｙ軸線
                    show: true
                },
                splitLine: { // 顯示網格線
                    show: true
                }

            },
            {
                name: '個',
                type: 'value',
                axisLabel: {
                    margin: 10, // 調整數據和 Y 軸的距離，根據需要調整數值
                },
                axisLine: { // 顯示Ｙ軸線
                    show: true
                },
                splitLine: { // 顯示網格線
                    show: true
                }

            }

        ],
        series: [
        {
                name: '總銷售',
                type: 'line',
                data: Sales, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'green',
                color: 'green'
                },
                barWidth: 5
            }, 
            {
                name: '收入',
                type: 'line',
                data: Income, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'orange',
                color: 'orange'
                },
                barWidth: 5
            },  
            {
                name: '支出',
                type: 'line',
                data: Expense, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'red',
                color: 'red'
                },
                barWidth: 5
            },     
            {
                name: '加入會員數',
                type: 'line',
                data: Member, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'SkyBlue',
                color: 'SkyBlue'
                },
                barWidth: 5
            },         

        ]
    });
}


</script>
<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card class="home-top" :body-style="{ display: 'flex'}">
                <div class="home-top-icon" style=" background-color: #30C7C8;">
                    <el-icon  color="white" class="home-icon"><SuccessFilled /></el-icon>
                </div>
                <div class="home-top-detail">
                    <h6>今日支付訂單</h6>
                    <h3>{{ today_pay }}<span>筆</span></h3>
                </div>
            </el-card>      
        </el-col>
        <el-col :span="6">
            <el-card class="home-top" :body-style="{ display: 'flex'}">
                <div class="home-top-icon" style=" background-color: #f89898;">
                    <el-icon  color="white" class="home-icon"><WarningFilled /></el-icon>
                </div>
                <div class="home-top-detail">
                    <h6>今日未支付訂單</h6>
                    <h3>{{ today_nopay }}<span>筆</span></h3>
                </div>
            </el-card>      
        </el-col>
        <el-col :span="6">
            <el-card class="home-top" :body-style="{ display: 'flex'}">
                <div class="home-top-icon" style=" background-color: #eebe77;">
                    <el-icon  color="white" class="home-icon"><Money /></el-icon>
                </div>
                <div class="home-top-detail">
                    <h6>今日收入</h6>
                    <h3>{{ today_income }}<span>元</span></h3>
                </div>
            </el-card>      
        </el-col>
        <el-col :span="6">
            <el-card class="home-top" :body-style="{ display: 'flex'}">
                <div class="home-top-icon" style=" background-color: #409EFF;">
                    <el-icon  color="white" class="home-icon"><UserFilled /></el-icon>
                </div>
                <div class="home-top-detail">
                    <h6>今日成為會員數</h6>
                    <h3>{{ today_member }}<span>個</span></h3>
                </div>
            </el-card>      
        </el-col>

        <el-col :span="18">
            <el-card>
                <div class="home-chat-header">
                    <span class="title">數據圖表</span>

                    <!-- 查詢時間 -->
                    <div class="block">
                        <el-date-picker 
                        class="date_picker"
                        v-model="pickertime"
                        :type="datePickerType"
                        :format="datePickerFormat"
                        :disabled-date="disabledFutureDates"
                        :clearable="false"
                        style="width: 160px;"
                        />
                    <el-button type="primary" style="margin-left:10px;" @click="SHistory">查詢</el-button>
                    </div>
                    <!-- 月年 -->
                    <el-radio-group 
                    v-model="tabDate" 
                    size="default" 
                    class="home-date-filter hidden-sm-and-down">
                        <el-radio-button label="month">月</el-radio-button>
                        <el-radio-button label="year">年</el-radio-button>
                    </el-radio-group>

                </div>


                <div ref="echartRef" class="echart"></div>

            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <span class="title">本月商品銷售量</span>
                <el-table 
                :default-sort="{ prop: 'number',order: 'descending' }"
                :data="tableData" 
                class="home-table">
                    <el-table-column prop="name" label="商品名字"  />
                    <el-table-column sortable prop="number" label="數量"  />

                </el-table>
            </el-card>
        </el-col>



    </el-row>


</template>


<style lang="scss" scoped>
.el-col{
    margin-bottom: 20px;
}
.home-top{ 
    --el-card-padding: 0px;
    height: 80px;

    .home-top-icon{
        width: 80px;
        height: 80px;
        .home-icon{
            width: 100%;
            height: 100%;
            font-size: 40px;
            margin:  auto;
        }

    }
    .home-top-detail{
        text-align: center;
        padding: 10px;
        color: gray;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        // border: 1px solid gray;
        span{
            font-size: 20px;
        }
    }

}
.home-chat-header{
    display: flex;
    justify-content: space-between;
}
.home-date-filter{
}
.echart{
    width: 100%; 
    height: 380px; 
    // border: 1px solid red;
    margin: 10px auto;
}

.home-table{
    width: 100%; 
    height: 400px;
}

</style>
  