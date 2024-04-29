<script setup>
import { ref } from 'vue'


</script>

<template>
    <el-row>
    	<el-col class="FAQ-title">FAQ</el-col>
		<el-col :xs="20" :sm="16" :md="16" :lg="14" class="FAQ-collapse">
			<el-collapse v-model="activeNames" @change="handleChange" >
				<el-collapse-item title="馬卡龍的主要成分是什麼？" name="1">
					<div class="FAQ-content">
						馬卡龍餅乾成份有杏仁粉、糖、蛋白和食用色素。 馬卡龍內餡主要成分是巧克力、乳製品（奶油/鮮奶油）、果醬和其他根據不同口味的各種材料。 請參閱每種口味的完整成分說明的口味清單頁面。
					</div>
				</el-collapse-item>
				<el-collapse-item title="如何保存馬卡龍？" name="2">
					<div class="FAQ-content">
						馬卡龍需冷藏保存，可保存一周，冷凍保存長達一個月（需使用塑膠薄膜或盒子包裝）。
					</div>
				</el-collapse-item>
				<el-collapse-item title="馬卡龍是素食可食用嗎？" name="3">
					<div class="FAQ-content">
						馬卡龍都是用乳製品，雞蛋製成的，有些口味含有吉利丁。 有關完整的成分說明，請參閱口味清單頁面。
					</div>
				</el-collapse-item>
				<el-collapse-item title="線上購物付款方式?" name="4">
					<div class="FAQ-content">
						ATM轉帳付款。
					</div>
				</el-collapse-item>
				<el-collapse-item title="我可以退貨嗎?" name="5">
					<div class="FAQ-content">
						食品類不適用七天鑑賞期，請於收到產品後立即拆開檢查，若非因品質異常或運送導致嚴重外型損壞者，恕無法退換貨。若商品有瑕疵，請拍照記錄，保留原包裝及置於冷藏設備保存，並請通知本公司，本公司將盡速協助您處理。
					</div>
				</el-collapse-item>
				<el-collapse-item title="我可以更改我的訂單資訊嗎？" name="6">
					<div class="FAQ-content">
						可以在下單時間後三天聯繫客服更改訂單。
					</div>
				</el-collapse-item>
				<el-collapse-item title="配送台灣離島嗎？" name="7">
					<div class="FAQ-content">
						由於我們無法保證貨物的新鮮度，我們不運送台灣離島。
					</div>
				</el-collapse-item>
			</el-collapse>

		</el-col>
    </el-row>
  </template>

<style lang="scss" scoped>


.FAQ-title{
	font-size: 2.5rem;
	font-weight: bold;
	margin: 3% 0;
	text-align: center;

}
.FAQ-collapse{
	margin: 0 auto 10%;
	.FAQ-content{
		color: black;
		padding: 10px 10px;
		font-size: 0.8rem;
		// background-color: #FEF4E2;
	}
}

</style>