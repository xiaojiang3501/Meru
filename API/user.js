const express = require('express');
const router = express.Router()

//登入
router.post('/login', (req, res) => {
    const { account, password } = req.body;
  
    const user = users.find(u => u.account === account && u.password === password);
  
    if (user) {
      res.json({ success: true, user });
    }else {
      res.json({ success: false, message: '帳號或密碼錯誤' });
    }
});



const users = [
  {
    user_id: 1,
    account: '123',
    password: '123',
    personal:{
        register_date: "2023-05-03",
        user_name: "義大利麵",
        address: "台北市",
        phone: "0958354069",
        user_suspend: true,
    },
    order:[
        {       
            order_id: 1,
            order_date: "2023-05-03 14:00",
            total_price: 60,
            state: '成功',
            items: [
                {
                  product_id: "1", 
                  product_name: "香草",
                  quantity: 2, 
                  price: 60       
                }
            ]
        },
        {
            order_id: 20,
            order_date: "2023-05-12 16:00",
            total_price: 180,
            state: '成功',
            items: [
                {
                  product_id: "1", 
                  product_name: "香草",
                  quantity: 2, 
                  price: 60       
                },
                {
                  product_id: "2",
                  product_name: "草莓",
                  quantity: 1,
                  price:  60 
                }
            ]
        }

    ],
    message:[
        {        
            FAQ_date: "2023-05-03",
            user_name: "小醬",
            question_type: "訂單問題",
            question_title: "有什麼口味？",
            question: "有什麼口味？",
            answer: "",

        }
    ],
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViMTBjNjhjNmU1MjkzMzM1MzhhMDJhN2FhZDYwOTIyZDMxOTMyOWJhNTM0ODRmZGEwNzJhOWE1MWY2YTNkNDNlMDAwOTExNjA5ZDk0NTI0In0'
  },
  {
    user_id: 2,
    account: '111',
    password: '111',
    access_token: 'your_access_token_here'
  },
];

//註冊
router.post('/register', (req, res) => {
	const { account, password, user_name } = req.body;

	const existingUser = users.find(u => u.account === account);
	if (existingUser) {
	  return res.json({ success: false, message: '帳號已存在' });
	}

	const newUser = {
		user_id: users.length + 1,
		account,
		password,
		personal: {
			register_date: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
			user_name,
			user_suspend: true,
		},
		order: [],
		message: [],
		access_token: 'your_access_token_here', 
	  };
	
	  // Add the new user to the array
	  users.push(newUser);
	
	  res.json({ success: true, user: newUser });
})


module.exports = router;