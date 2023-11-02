<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
// ===============Router===================================
import { useRouter } from "vue-router";
const router = useRouter()
// ===============Pinia===================================
import { storeToRefs } from 'pinia'
import { useCart } from '@/store/cart.js'
const getcartdata = useCart();
const { cartData } = storeToRefs(getcartdata);


//合計
const sum = ref(0);
const handleSum = (selectedItems) => {
    // console.log(selectedItems)
    if (Array.isArray(selectedItems)) {
        sum.value = 0;
        selectedItems.forEach((item) => {
            sum.value += item.price * item.count;
        });
    }
}


//刪除
const handleDelete = (i) => {
    cartData.value.splice(i, 1);
    handleSum();
};

//步驟條
const active = ref(0)
const next = () => {
    if (active.value++ > 2) active.value = 0
    router.push({
        path: "/form",
    })
}


</script>

<template>
    <el-row>
        <div class="cart-container">
            <!-- 步驟條 -->
            <el-steps 
            :active="active" 
            finish-status="success" 
            align-center 
            class="cart-step">
                <el-step title="購物車" />
                <el-step title="填寫資料" />
                <el-step title="訂單確認" />
            </el-steps>

            <el-table 
            :default-sort="{ prop: 'date',order: 'descending' }"
            :header-cell-style="{background:'#ecf5ff',color:'#606266',textAlign: 'center'}"
            :cell-style="{ textAlign: 'center' }"
            :data="cartData"
            @selection-change="handleSum" 
            class="cart-table"
            >

                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column prop="image" label="商品圖片" width="150" >
					<!-- !-- 使用插槽自定义列的内容 -->
					<template #default="{ row }">
						<img :src="row.image" alt="商品圖片" style="max-width: 60px; max-height: 60px;" />
					</template>
				</el-table-column>

                <el-table-column prop="name" label="名字" />

                <el-table-column label="數量"  width="180">
                    <template #default="{ row }">
                        <el-input-number 
                        v-model="row.count"  
                        :min="1" 
                        :max="row.inventory"
                        @change="handleQuantityChange(row)" />
                    </template>
                </el-table-column> 

                <el-table-column prop="price" label="單價">
                    <template #default="{ row }">
                        <span>{{row.price}}</span>
                    </template>
                </el-table-column> 

                <el-table-column label="金額">
                    <template  #default="{ row }">
                        <span>{{row.price*row.count}}</span>
                    </template>
                </el-table-column> 

                <el-table-column fixed="right" label="操作" width="150" class="edit">
                <template  #default="{ row }">
                    <el-button
                    link
                    size="large"
                    type="danger"
                    @click="handleDelete(row)">刪除</el-button>
                </template>
                </el-table-column>
                    
            </el-table>
            <div class="cart-buttom">
                <div class="cart-sum">
                    合計：<span class="sum">{{sum}}</span>
                </div>
                <div class="cart-next">
                    <el-button @click="next">下一步</el-button>
                </div>

            </div>
        </div>
    </el-row>

</template>


<style lang="scss" scoped>
.cart-container{
    width: 70%;
    margin: 5% auto;
    .cart-step{
        margin: 3% auto;

    }
    .cart-buttom{
        display: flex;
        justify-content: flex-end;
        margin: 3% auto;

    }
    .cart-sum{
        margin: 0 3%;
        font-size: 20px;
    }
    .sum{
        color: red;
    }

}
</style>
  