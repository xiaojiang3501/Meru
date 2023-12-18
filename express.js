const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const userRouter = require("./API/user.js")
const backRouter = require("./API/backstage.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //解決跨域
app.use("/user", userRouter) //將api的requests導入到userRouter處理
app.use("/backstage", backRouter) 


app.listen(PORT, () => {
	console.log(`server已啟動 ${PORT}`);
});





