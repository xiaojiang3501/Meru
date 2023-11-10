<script setup>
import { ref, onMounted, watch, reactive, computed } from 'vue'
import * as echarts from 'echarts'


const tabDate = ref('month'); //預選顯示
const echartRef = ref(null); //圖表
const pickertime = ref(new Date); //選擇時間v-model
const datePickerType = ref(''); //時間樣式
const datePickerFormat = ref('YYYY-MM'); //時間格式
const disabledFutureDates = ref((time) => time.getTime() > Date.now()); //禁止選未來時間
const now = new Date() //現在時間
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); //抓當下月的天數
const today_pay = ref('');
const today_nopay = ref('');
const today_income = ref('');
const today_member = ref('');

// 月年切換
watch(tabDate, () => {
    updatePickertime() 
    tabDate.value = tabDate.value 
})
onMounted( () => {
    updatePickertime() 
    updateChart(tabDate.value)
    fetchData()
});


const fetchData = () => {
    fetch('api/home')
    .then(data => data.json())
    .then(data => {
        // console.log(data.home[0].today_pay); 
        today_pay.value = data.home[0].today_pay;
        today_nopay.value = data.home[0].today_nopay;
        today_income.value = data.home[0].today_income;
        today_member.value = data.home[0].today_member;
    })
}
const tableData = [
  {
    name: '草莓',
    number: 5,
  },
  {
    name: '檸檬',
    number: 8,
  },
  {
    name: '巧克力',
    number: 11,
  },
  {
    name: '香草',
    number: 12,
  },
]

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

// 圖表data
const data = {
    month: {
        xAxisData: Array.from(Array(daysInMonth).keys()).map(i => `${i + 1}`),
        Income: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        Expense: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        Member: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        Sales: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        // Income: Array.from({length: daysInMonth}).fill(null),

    },
    year: {
        xAxisData: Array.from(Array(12).keys()).map(i => `${i + 1}`), //X軸顯示內容
        Income: Array.from(Array(12).keys()).map(i => Math.floor(Math.random() * 100)),
        Expense: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        Member: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        Sales: Array.from(Array(daysInMonth).keys()).map(i => Math.floor(Math.random() * 100)),
        // Income: Array.from({length: 12}).fill(null),
    }
 }
//  function parseData(dataArray, targetObject) {
//         for (let i = 0; i < dataArray.length; i += 6) {
//             const index = i / 6; // 6個循環
//             targetObject.Income[index] = parseFloat(dataArray[i + 1]); //桶盤里
//             targetObject.xAxisData[index] = parseFloat(dataArray[i + 5]); //X軸
//         }
// }


//圖表
function updateChart(value) {
    // console.log(value);
    const { xAxisData, Income, Expense, Sales, Member } = data[value]
    const myChart = echarts.getInstanceByDom(echartRef.value)
    if (myChart) {
        myChart.dispose()  
    }
    const newChart = echarts.init(echartRef.value)

    newChart.setOption({
        legend: {
            data: ['收入','支出','總銷售','加入會員數'] //最上面篩選
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
                name: '收入',
                type: 'line',
                data: Income, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'SkyBlue',
                color: 'SkyBlue'
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
                name: '加入會員數',
                type: 'line',
                data: Member, //資料
                symbol:'circle', //點樣式
                itemStyle: {
                borderColor: 'orange',
                color: 'orange'
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
  