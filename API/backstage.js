const express = require('express');
const mysql = require('mysql');
const router = express.Router()

const connection = mysql.createConnection({
	host:"localhost",
	port: "8889",
	user: "root",
	password: "root",
	database: "MERU",
})
connection.connect()


router.post('/login', (req, res) => {
    const {account ,password } = req.body;
	
	const query = `SELECT * FROM member WHERE Account = ? AND Password = ?`;
	connection.query(query, [account, password], (err, results, fields) =>{
		if (err) {
			console.error(err);
			res.json({ success: false, message: '数据库查询错误' });
			return;
		  }
		  if (results.length > 0) {
			res.json(results);
			res.json({ success: true, message: '登入成功' });
		  } else {
			res.json({ success: false, message: '帐号或密码错误' });
		  }

	})

});


router.post('/home', (req, res) => {
	const { time_mode, ymd } = req.body;

    let chartData;
    switch (time_mode) {
        case 'month':
            chartData = home.chart_data.historymonth;
            break;
        case 'year':
            chartData = home.chart_data.historyyear;
            break;
        default:
            break;
    }

    res.json({
        today_pay: home.today_pay,
        today_nopay: home.today_nopay,
        today_income: home.today_income,
        today_member: home.today_member,
        month_sales: home.month_sales,
        time_mode: time_mode,
        ymd: ymd,
        chart_data: {
            history: chartData,
        },
    });
});

const home = 
	{
		today_pay: '10',
		today_nopay: '2',
		today_income: '5400',
		today_member: '5',
		month_sales: {
			"草莓": 10,
			"覆盆子": 1,
			"藍莓": 5,
			"檸檬": 4,
			"香蕉": 2,
			"橘子": 2,
			"香草": 12,
			"玫瑰": 3,
			"薰衣草": 2,
			"芝麻": 5,
			"抹茶": 6,
			"伯爵茶": 3,
			"巧克力": 10,
			"咖啡": 0,
			"棉花糖": 1,
		},
		time_mode: null,
		ymd: "2023-07",
		chart_data:{
			historymonth:  "10,30,40,10,1,20,30,40,10,2,10,30,40,10,3,10,30,40,10,4,10,30,40,10,5,10,30,40,10,6",
			historyyear:  "20,10,40,50,1,10,20,10,20,2"
		},
	}

router.post('/product', (req, res) => {
	res.json(product)
});

const product =  [
	{   
		product_id: "1",
		image: "../public/products/1.png",
		product_name: "草莓",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、草莓果泥、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 20,
		product_suspend: true
	},
	{
		product_id: "2",
		image: "../public/products/1.png",
		product_name: "覆盆子",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、覆盆子果泥、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 20,
		product_suspend: true
	},
	{
		product_id: "3",
		image: "../public/products/1.png",
		product_name: "藍莓",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、藍莓果泥、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "4",
		image: "../public/products/1.png",
		product_name: "檸檬",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、檸檬、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "5",
		image: "../public/products/1.png",
		product_name: "香蕉",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、香蕉果泥、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "6",
		image: "../public/products/1.png",
		product_name: "橘子",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、橘子泥、橘子皮、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "7",
		image: "../public/products/1.png",
		product_name: "香草",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、香草、白巧克力、鮮奶油、法國 AOP奶油",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "8",
		image: "../public/products/1.png",
		product_name: "玫瑰",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、天然玫瑰水、白巧克力、鮮奶油、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "9",
		image: "../public/products/1.png",
		product_name: "薰衣草",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、薰衣草、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "10",
		image: "../public/products/1.png",
		product_name: "芝麻",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、手工芝麻酱（白芝麻、黑芝麻、焦糖）,鮮奶油、AOP奶油、白巧克力、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "11",
		image: "../public/products/1.png",
		product_name: "抹茶",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、日本宇治抹茶粉、白巧克力、鮮奶油、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "12",
		image: "../public/products/1.png",
		product_name: "伯爵茶",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、竹炭粉、67%巧克力、椰子醬、伯爵茶葉、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "13",
		image: "../public/products/1.png",
		product_name: "巧克力",
		price:"60",
		ingredient:"可可粉、杏仁粉、植物性蛋白、天然食用色素、72%巧克力、鮮奶油、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "14",
		image: "../public/products/1.png",
		product_name: "咖啡",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、咖啡粉、白巧克力、法國 AOP奶油、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	},
	{
		product_id: "15",
		image: "../public/products/1.png",
		product_name: "棉花糖",
		price:"60",
		ingredient:"杏仁粉、植物性蛋白、天然食用色素、玉米糖漿、砂糖",
		allergen:"堅果、乳製品",
		inventory: 10,
		product_suspend: true
	}, 
]

router.post('/member', (req, res) => {
	res.json(member)
});

const member = [
	{
		id: 1,
		register_date: "2023-05-03",
		user_name: "義大利麵",
		account: "333@gmail.com",
		password: "123",
		address: "123",
		phone: "123",
		user_suspend: true

	},
	{
		id: 2,
		register_date: "2023-10-25",
		user_name: "小醬",
		account: "123@gmail.com",
		password: "123123",
		address: "桃園市龜山區文化一路537號8樓之10",
		phone: "0958354069",
		user_suspend: true
	},
	{
		id: 3,
		register_date: "2023-10-25",
		user_name: "白白",
		account: "111@gmail.com",
		password: "123123",
		address: "台北市",
		phone: "0912345678",
		user_suspend: true
	},
	{
		id: 4,
		register_date: "2023-11-07",
		user_name: "迪倫",
		account: "1029",
		password: "111",
		address: "111",
		phone: "111",
		user_suspend: true
	}
]


router.post('/order', (req, res) => {
	res.json(order)
});

const order = [
	{
		order_id: '1',
		order_date: '2023-09-21 14:00',
		user_id: '3',
		user_name: "陸小醬",
		account: "111@gmail.com",
		address: "桃園市龜山區文化一路537號8樓之10",
		pay: "取貨付款",
		total_price: "100",
		order_state: '處理中',
		pay_state: '未支付',
		items: [
			{
				product_image: "1", 
				product_name: "香草",
				quantity: 2, 
				price: 60       
			},
			{
				product_image: "2",
				product_name: "草莓",
				quantity: 1,
				price:  60 
			}
		]
	},
	{
		order_id: '2',
		order_date: '2023-09-21 15:00',
		user_id: '3',
		user_name: "白白",
		account: "123@gmail.com",
		pay: "取貨付款",
		address: "台北市",
		total_price: "180",
		order_state: '處理中',
		pay_state: '未支付',
		items: [
			{
			  product_id: "1", 
			  product_name: "巧克力",
			  quantity: 3, 
			  price: 60       
			},
		]
	},

]

router.post('/message', (req, res) => {
	res.json(messages)
});

const messages = [
    {
		message_id: 1,
		user_id: 1,
		message_date: "2023-05-03",
		user_name: "小醬",
		account: "111@gmail.com",
		question_type: "訂單問題",
		question_title: "有什麼口味？",
		question_content: "有什麼口味？",
		answer: ""
	}
]


// connection.end()

module.exports = router;
