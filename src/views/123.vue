<template>
	<el-input v-model="inputContent" style="width: 200px;"></el-input>
	<el-date-picker
	v-model="selectedDate"
	type="date"
	placeholder="選擇開始時間"
	format="YYYY-MM-DD"
	value-format="YYYYMMDD"
	style="width: 160px;"/>

	<el-button @click="addHoliday" type="primary">新增</el-button>

	<el-calendar>
		<template #date-cell="{data}">
		<div>
			<div >
			{{ data.day.split('-').slice(2).join('')}}
			</div>

			<div>
				<span class="remark-text" v-for="(item, index) in dealMyDate(data.day)" :key="index">
					{{ item }}
					<el-button 
					link 
					size="small"
					@click="deleteItem(data.day)" 
					style="color: gray;">X</el-button>
				</span>
			</div>
			 
			 
		</div>
		</template>
	</el-calendar>

</template>

<script setup>
import { ref, reactive } from 'vue';


const inputContent = ref('');
const selectedDate = ref('');
const resDate = reactive([
    { date: '20240430', content: '放假' },
    { date: '20240401', content: '放假' },
]);

const dealMyDate = (v) => {
    let res = [];
    for (let index = 0; index < resDate.length; index++) {
        if (resDate[index].date === v) {
            res.push(resDate[index].content);
        }
    }
    return res;
};

// 增加行事曆行程
const addHoliday = () => {
    if (calendarContent.value && calendarDate.value) {
        resDate.push({ date: calendarDate.value.replace(/-/g, ''), content: calendarContent.value });
        calendarContent.value = '';
        calendarDate.value = '';
    }
};

// 刪除行事曆行程
const deleteHoliday = (date) => {
    const index = resDate.findIndex((item) => item.date === date);
    if (index !== -1) {
        resDate.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped>
.remark-text {
	color: DodgerBlue;
}
</style>
