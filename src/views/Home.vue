<script setup>


</script>

<template>
    <el-row class="home-top">
        <el-col :xs="24" :sm="22" :md="20" :lg="20" class="home-benner">
            <div class="home-benner-image">
                <img src="../assets/macaron.png" alt="" >
            </div>
            <div class="home-top-content">
                <h1>MERU MACARORS</h1>
                <p>我們的馬卡龍是由最優質的材料製成，擁有輕盈的質地和令人雀躍的口感，每一口都是一場甜蜜的驚喜。</p>
                <p>從經典口味到創新組合，我們的馬卡龍系列將為您帶來無盡的美味。</p>

            </div>

        </el-col>


    </el-row>
    <el-row class="home-picture">
        <el-col :xs="24" :sm="22" :md="20" :lg="18" class="home-picture-content">

            <div>
                <h3>下午茶、禮盒、馬卡龍塔</h3>
                <p>將為您帶來一份令人難忘的禮物。讓我們一同將這份優雅和美味送給您珍愛的人，讓愛和溫馨充滿每一刻！</p>
            </div>
            <div >
                <div class="p1" style="margin: 0 10px;"></div>
                <div class="p2" style="margin: 10px 10px 0;"></div>
            </div>
            <div>
                <div class="p3"></div>
            </div>


        </el-col>

    </el-row>
    <!-- <el-row class="home-center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" >
            <div class="home-cook">
                <div class="home-cook-content">        
                    <p>
                        
                    </p>
                </div>
            </div>

        </el-col>

        <h1 class="home-cook-title">Our Materials</h1>


        <div  class="home-cook-image">
            <img src="../assets/chef.png" alt="" class="home-cook-image">
        </div>


    </el-row> -->



    <el-row class="home-bottom">
        <el-col :xs="24" :sm="22" :md="20" :lg="16" class="home-bottom-content">
            <div class="home-card">
                <img src="../assets/suger.jpg" alt="" class="home-card-image suger">
                <p>少糖</p>
            </div>
            <div class="home-card">
                <img src="../assets/milk.jpg" alt="" class="home-card-image milk">
                <p>植物性牛奶</p>
            </div>
            <div class="home-card">
                <img src="../assets/gluten.jpg" alt="" class="home-card-image glute">
                <p>無麩質麵粉</p>
            </div>

        </el-col>

    </el-row>


</template>

<style lang="scss" scoped>
.home-top{
    .home-benner{
        margin: 3% auto;
        display: flex;
        .home-benner-image img{
            width: 70%;
            margin: 0 10%;
            // border: 1px solid blue;
        }
        .home-top-content{
            // border: 1px solid red;
            font-weight: bold;
            margin: 5% 8%;
            letter-spacing: 3px;
            h1{
                font-size: 2.5rem;
                margin: 5% 0 10%;
                color: goldenrod;
            }
            p{
                font-size: 1.2rem;
                margin: 10% 0;
                color: gray;
            }
        }
    }
}
.home-picture{
    // background-color: white;
    margin-bottom: 2%;
    .home-picture-content{
        display: flex;
        justify-content: flex-end;
        margin: 0 auto;
        letter-spacing: 3px;
        h3{
            margin: 15% 5%;
        }
        p{
            color: gray;
            font-size: 1.2rem;
            font-weight: bold;
            margin: 15% 5%;
            
        }
        .p1{
            width: 300px;
            height: 195px;
            background-image: url("../assets/p1.jpg");
            background-size: cover;
            background-position: center;
        }
        .p2{
            width: 300px;
            height: 195px;
            background-image: url("../assets/p2.jpg");
            background-size: cover;
            background-position: center;

        }
        .p3{
            width: 300px;
            height: 400px;
            background-image: url("../assets/p3.jpg");
            background-size: cover;
            background-position: center;
        }
    }
}
.home-center{
    // border: 1px solid green;
    background-color: #fffbef;
    height: 400px;
    position: relative;
    .home-cook{
        width: 60%;
        margin: 5% auto;
        // border: 1px solid green;
        .home-cook-content{
            display: flex;
            h2{
                margin: 0 10px;
                font-family: fantasy;
                color: gray;
            }
            p{
                // border: 1px solid green;
                line-height: 40px;
                color: gray;
            }
        }
    }
    .home-cook-title{
        position: absolute;
        top: -6%;
        left: 10%;
        color: gray;
        font-size: 36px;
        font-family: cursive;
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
    .home-bottom-content{
        display:flex;
        justify-content: space-around;
        margin: 10% auto;
        .home-card{
            width: 200px;
            .home-card-image{
                width: 200px;
                height: 200px;
                border-radius: 50%;
                object-fit: cover;
            }
            p{
                text-align: center;
                font-weight: bold;
                margin-top: 10px;
            }
        }
    }
}

@media screen and (max-width: 1025px) {
    .home-top{
        .home-benner{
            .home-benner-image img{
                width: 90%;
            }
        }
    }
    .home-picture{
        .home-picture-content{
            width: 80%;
            h3{
                font-size: 1.4rem;
            }
            .p1,.p2,.p3{
                width: 220px;
            }
        }
    }
}

@media screen and (max-width: 767px) {
    .home-top{
        padding: 5%;
        .home-benner{
            display: block;
            .home-benner-image img{
                display: none;
            }
            .home-top-content{
                margin: 0 5%;

            }
        }
    }
    .home-picture{
        margin-bottom: 0%;
        padding: 5%;
        .home-picture-content{
            flex-wrap: wrap;
            justify-content:center;
            width: 100%;
            h3{
                margin: 8% 5%;
            }
            .p1,.p2{
                width: 158px;
                height: 145px;
            }
            .p3{
                width: 158px;
                height: 300px;
            }
        }
    }
    .home-bottom{
        .home-bottom-content{
            display: block;
            .home-card{
                margin: 30px auto;
            }
        }
    }
}

</style>