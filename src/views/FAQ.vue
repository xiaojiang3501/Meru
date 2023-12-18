<script setup>
import { ref } from 'vue'


</script>

<template>
    <div class="demo-collapse">
    <div class="FAQ-title">FAQ</div>
      <el-collapse v-model="activeNames" @change="handleChange" >
        <el-collapse-item title="馬卡龍的主要成分是什麼？" name="1">
          <div class="FAQ-content">
            馬卡龍餅乾成份有杏仁粉、糖、蛋白和食用色素。 馬卡龍內餡主要成分是巧克力，乳製品（奶油/鮮奶油），果醬和其他根據不同口味的各種材料。 請參閱每種口味的完整成分說明的口味清單頁面。
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何保存馬卡龍？" name="2">
          <div class="FAQ-content">
            馬卡龍需冷藏保存，可保存一周，冷凍保存長達一個月（需使用塑膠薄膜或盒子包裝）。
          </div>
        </el-collapse-item>
        <el-collapse-item title="如何購買你們的產品？" name="3">
          <div class="FAQ-content">
            Easy to identify: the interface should be straightforward, which helps
            the users to identify and frees them from memorizing and recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="線上購物付款方式?" name="4">
          <div class="FAQ-content">
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
        <el-collapse-item title="我可以退貨嗎?" name="5">
          <div class="FAQ-content">
            食品類不適用七天鑑賞期，請於收到產品後立即拆開檢查，若非因品質異常或運送導致嚴重外型損壞者，恕無法退換貨。若商品有瑕疵，請拍照記錄，保留原包裝及置於冷藏設備保存，並請通知本公司，本公司將盡速協助您處理。
          </div>
        </el-collapse-item>
        <el-collapse-item title="線上購物付款方式?" name="6">
          <div class="FAQ-content">
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>

<style lang="scss" scoped>
.demo-collapse{
    width: 50%;
    margin: 5% auto 10%;
    button{
        border-radius: 0px;
    }
    .FAQ-title{
        font-size: 40px;
		margin:  5%;
        text-align: center;
    }
    .FAQ-content{
        color: black;
        padding: 10px 10px;
        // background-color: #FEF4E2;
    }
    .el-collapse{
        --el-collapse-header-font-size: 16px;
		--el-collapse-header-bg-color: grey;
		--el-collapse-header-text-color:  white;
		--el-collapse-content-bg-color: #FEF4E2;

		
		.el-collapse-item{
			margin-bottom: 1%;

		}

		:deep(.el-collapse-item__header) {
			border-radius: 0px;
			padding: 10px;

		}
		:deep(.el-collapse-item__header:hover) {
			color: #FEF4E2;
		}




    }
}

</style>