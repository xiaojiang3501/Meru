<script setup>


</script>

<template>
    <el-row class="home-top">
        <el-col>
            <div class="home-benner">
                <div>
                    <img src="../assets/macaron.png" alt="" class="home-benner-image">
                </div>
            </div>

        </el-col>

    </el-row>
    <el-row class="home-center">
        <el-col>
            <div class="home-about">
                <div>
                    <img src="" alt="" class="home-about-image">
                </div>

            </div>

        </el-col>

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
        width: 70%;
        margin: 0 auto;
        .home-benner-image{
            width: 400px;
        }
    }
}

.home-center{
    // border: 1px solid green;
    .home-about{
        width: 60%;
        margin: 0 auto;
        .home-about-image{
            width: 50%;
        }
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