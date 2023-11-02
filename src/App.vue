<script setup>
import { RouterView } from 'vue-router'
import Chinese from "element-plus/es/locale/lang/zh-tw"; //大於此版本2.3.8使用這連結 

</script>
<template>
  <div id="app">
        
    <el-config-provider :locale="Chinese">
		<RouterView/>
    </el-config-provider>

  </div>
</template>

<style>

#app {
  padding: 0;
  margin : 0;
  box-sizing: border-box;
  font-family: "Noto Sans TC","PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-decoration: none;
  list-style: none;
  min-width: 100vw;
  min-height: 100vh;
  text-align: left;
}
h1{
  font-size: 40px;
  margin: 0;
}
h2{
  font-size: 32px;
  margin: 0;
}
h3{
  font-size: 28px;
  margin: 0;
}
h4{
  font-size: 24px;
  margin: 0;
}
h5{
  font-size: 20px;
  margin: 0;
}
h6{
  font-size: 16px;
  margin: 0;

}
p{
  margin: 0;
  padding: 0;
}
</style>
