<script setup>


</script>

<template>
    <el-row class="home-top">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" class="home-benner">
            <div>
                <img src="../assets/macaron.png" alt="" class="home-benner-image">
            </div>

        </el-col>


    </el-row>
    <el-row class="home-center">
        <el-col>

        </el-col>
        <el-col :xs="24" :sm="20" :md="20" :lg="20" class="home-cook">

        </el-col>
        <div  class="home-cook-image">
            <img src="../assets/chef.png" alt="" class="home-cook-image">
        </div>


    </el-row>



    <el-row class="home-bottom">
        <el-col :span="8">
            <div class="home-card">
                <img src="../assets/suger.jpg" alt="" class="home-card-image suger">
                <p>少糖</p>
            </div>

        </el-col>
        <el-col :span="8">
            <div class="home-card">
                <img src="../assets/milk.jpg" alt="" class="home-card-image milk">
                <p>植物性牛奶</p>
            </div>

        </el-col>
        <el-col :span="8">
            <div class="home-card">
                <img src="../assets/gluten.jpg" alt="" class="home-card-image glute">
                <p>無麩質麵粉</p>
            </div>

        </el-col>
    </el-row>


</template>

<style lang="scss" scoped>
.home-top{
    // border: 1px solid blueviolet;
    .home-benner{
        margin: 5% auto;
        .home-benner-image{
            width: 400px;
        }
    }
}

.home-center{
    // border: 1px solid green;
    background-color: #fffbef;
    height: 350px;
    position: relative;
    .home-cook{
        margin: 0 auto;
    }
    .home-cook-image{
        z-index: 2;
        position: absolute;
        right: 5%;
        bottom: 0;
        // border: 1px solid black;

    }
}
.home-bottom{
    width: 780px;
    margin: 10% auto;
    // border: 1px solid red;
    .home-card{
        // border: 1px solid orange;
        .home-card-image{
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin: 0 30px;
            object-fit: cover;

        }
        .suger{
            object-position: -60px 0px;
        }
        .glute{
            object-position: -25px 0px;
        }
        p{
            text-align: center;
            font-weight: bold;
            margin-top: 10px;
        }
    }

}

</style>