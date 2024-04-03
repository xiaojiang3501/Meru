const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const router = express.Router()

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const connection = mysql.createConnection({
	host:"localhost",
	port: "3306",
	user: "root",
	password: "root",
	database: "MERU",
})
connection.connect()

const storage = multer.diskStorage({
    destination: 'public/products',
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')

        connection.query('SELECT COUNT(Product_ID) AS productCount FROM product', function (error, results, fields) {
            if (error) throw error;

            const productCount = results[0].productCount;
            const newProductID = productCount + 1;

            // 文件的命名为： ProductID + 点 + 文件的后缀名
            cb(null, newProductID + "." + fileFormat[fileFormat.length-1]);
        });
    },
});

const upload = multer({ storage });


//登入
router.post('/login', (req, res) => {
    const {account ,password } = req.body;
	
	const query = "SELECT * FROM member WHERE account = ? AND password = ? AND Authority = 'admin'";

	connection.query(query, [account, password], (err, results, fields) =>{
		if (err) {
			console.error(err);
			res.json({ success: false, message: '數據庫查詢錯誤' });
			return;
		}
		if (results.length > 0) {
			res.json({ success: true, message: '登入成功' });
		} else {
			res.json({ success: false, message: '帳號或密碼錯誤' });
		}

	})

});

//首頁
router.post('/home', (req, res) => {
    const { year,month, time_mode } = req.body;
    let startDate = '';
    let endDate = '';
    let query2 = '';


    const query1 = "SELECT * FROM Data_Day ORDER BY Datetime DESC LIMIT 1";

    switch (time_mode) {
        case 'month':
            startDate = `${year}-${month}-01`;
            endDate = `${year}-${month}-31`;
            query2 = "SELECT * FROM Data_Day WHERE Datetime BETWEEN ? AND ? ORDER BY Datetime";
            break;
        case 'year':
            startDate = `${year}-01-01`;
            endDate = `${year}-12-31`;
            query2 = "SELECT * FROM Data_Month  WHERE Datetime BETWEEN ? AND ? ORDER BY Datetime";
            break;
        default:
            break;
    }

    connection.query(query1, [], (err1, results1, fields1) => {
        if (err1) {
            res.json({ success: false, message: err1.message });
            return;
        }

        const home = results1[0];

        connection.query(query2, [startDate, endDate], (err2, results2, fields2) => {
            if (err2) {
                res.json({ success: false, message: err2.message });
                return;
            }

            let chartData;
            if (time_mode === 'month') {
                chartData = results2.map(entry => {
                    const inputDate = new Date(entry.Datetime);
                    inputDate.setDate(inputDate.getDate() + 1);

                    return {
                        Total: entry.Total_Day,
                        Price: entry.Price_Day,
                        Nopay: entry.Nopay_Day,
                        Member: entry.Member_Day,
                        Datetime: inputDate.getUTCDate()
                    };
                });
            } else if (time_mode === 'year') {
                chartData = results2.map(entry => {
                    const inputDate = new Date(entry.Datetime);
                    inputDate.setMonth(inputDate.getMonth() + 1);

                    return {
                        Total: entry.Total_Month,
                        Price: entry.Price_Month,
                        Nopay: entry.Nopay_Month,
                        Member: entry.Member_Month,
                        Datetime: inputDate.getUTCMonth() + 1
						
                    };
                });
            }

            const historyData = chartData.reduce((acc, entry) => {
                acc.push(entry.Total, entry.Price, entry.Nopay, entry.Member, entry.Datetime);
                return acc;
            }, []);

            res.json({
                success: true,
				year: year,
				month: month,
                time_mode: time_mode,
                today_pay: home.Total_Day,
                today_nopay: home.Nopay_Day,
                today_income: home.Price_Day,
                today_member: home.Member_Day,
                month_sales: {
                    "草莓": home.Strawberry,
                    "覆盆子": home.Raspberry,
                    "藍莓": home.Blueberry,
                    "檸檬": home.Lemon,
                    "香蕉": home.Banana,
                    "橘子": home.Orange,
                    "香草": home.Vanilla,
                    "玫瑰": home.Rose,
                    "薰衣草": home.Lavender,
                    "芝麻": home.Sesame,
                    "抹茶": home.Matcha,
                    "伯爵茶": home.Earl,
                    "巧克力": home.Chocolate,
                    "咖啡": home.Coffee,
                    "棉花糖": home.Marshmallow,

                },
                chart_data: {
                    history: historyData,
					

                }
            });
        });
    });
});

//產品
router.post('/product', (req, res) => {
	const query = "SELECT * FROM product";  
	connection.query(query, (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({ success: false, message: '數據庫查詢錯誤' });
			return;
		}
		const productsWithBooleanSuspend = results.map(product => {
			return { ...product, product_suspend: product.product_suspend === 1 };
		});
		res.json({ success: true, data: productsWithBooleanSuspend });
	});
});
router.post('/create-product', upload.single('file'), (req, res) => {
	const { newProductID, product_name, price, inventory, ingredient, allergen } = req.body;
	const image = req.file.filename;

	// connection.query('SELECT MAX(Product_ID) AS maxProductID FROM product', (err, results) => {
	// 	if (err) {
	// 		console.error(err);
	// 		res.json({ success: false, message: 'Error retrieving max Product_ID' });
	// 		return;
	// 	}

		// const currentMaxProductID = results[0].maxProductID || 0;
		// const newProductID = currentMaxProductID + 1;

    const query = `INSERT INTO product (Product_ID, image, product_name, price, inventory, ingredient, allergen, product_suspend) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`;

    const values = [newProductID, image, product_name, price, inventory, ingredient, allergen];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: values });
            return;
        }

        res.json({ success: true, msg: '上传成功', newProductID });
    });
	// });
});
router.put('/edit-product/:Product_ID', (req, res) => {
	const Product_ID = req.params.Product_ID;
	const {  } = req.body;
    const query = `
        UPDATE product
        SET image = ?, product_name = ?, price = ?, inventory = ?, ingredient = ?, product_name = ?
        WHERE Product_ID = ${Product_ID}
    `;

    connection.query(query,  [image, product_name, price, allergen, price, phone, allergen], (err, results, fields) => {
		if (err) {
            console.error(err);
            res.json({ success: false, message: results });
            return;
        }

        res.json({ success: true, message: results });

    });
});
router.put('/toggle-product/:Product_ID', (req, res) => {
    const Product_ID = req.params.Product_ID;
    let product_suspend = req.body.product_suspend;
	product_suspend = Boolean(product_suspend);
	const productSuspendValue = product_suspend ? 1 : 0;
	const query = `
		UPDATE product
		SET product_suspend = ${productSuspendValue}
		WHERE Product_ID = ${Product_ID}
	`;

	connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: '會員更新錯誤' });
            return;
        }
        res.json({ success: true, message: '會員更新' });
    });
});
router.delete('/delete-product/:Product_ID', (req, res) => {
    const Product_ID = req.params.Product_ID;
    const query = `
        DELETE FROM product
        WHERE Product_ID = ${Product_ID}
    `;

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: '商品刪除錯誤' });
            return;
        }
        if (results.affectedRows > 0) {
            res.json({ success: true, message: '商品刪除成功' });
        } else {
            res.json({ success: false, message: '找不到要刪除的商品' });
        }
    });
});


//會員
router.post('/member', (req, res) => {
	const query = "SELECT * FROM member WHERE Authority = 'user'"; 
	connection.query(query, (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({ success: false, message: '數據庫查詢錯誤' });
			return;
		}
		
		const membersUser = results.map(member => {
            const dateObject = new Date(member.register_date);
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, '0');
            const day = String(dateObject.getDate()).padStart(2, '0');
            const formattedDate = `${year}/${month}/${day}`;
			const suspend = member.user_suspend === 1 ? true : false;
			return { ...member, register_date: formattedDate, user_suspend: suspend };
		  });
		res.json({ success: true, data: membersUser });
	});
});
router.post('/create-member', (req, res) => {
    const { name, account, password, address, phone } = req.body;
	const registerDate = new Date().toISOString().split('T')[0];

	connection.query('SELECT MAX(Member_ID) AS maxMemberID FROM member', (err, results) => {
        const currentMaxMemberID = results[0].maxMemberID || 0;
        const newMemberID = currentMaxMemberID + 1;

		// 檢查帳號是否已存在
		connection.query('SELECT * FROM member WHERE account = ?', [account], (error, results) => {
			if (error) {
				return res.json({ success: false, message: '資料庫錯誤' });
			}

			if (results.length > 0) {
				return res.json({ success: false, message: '帳號已存在' });
			}

			const token = jwt.sign({ account, name }, 'your_secret_key');


			// 如果帳號不存在，插入新用戶
			connection.query('INSERT INTO member (Member_ID, register_date, updated_time, name, account, password, address, phone, user_suspend, Auth_token, Authority) VALUES (?, STR_TO_DATE(?, "%Y-%m-%d"), NOW(), ?, ?, ?, ?, ?, 1, ?, "user")', [newMemberID, registerDate, name, account, password,address, phone, token], (error, results) => {
				if (error) {
					return res.json({ success: false, message: error.message });
				}

				// 註冊成功，返回成功的JSON響應
				res.json({ success: true, message: results });
			});

		})
    });
});
router.put('/edit-member/:Member_ID', (req, res) => {
	const Member_ID = req.params.Member_ID;
	const { name, account, password, address, phone } = req.body;
    const query = `
        UPDATE member
        SET updated_time = NOW(), name = ?, account = ?, password = ?, address = ?, phone = ?
        WHERE Member_ID = ?
    `;

    connection.query(query, [name, account, password, address, phone, Member_ID], (err, results, fields) => {
		if (err) {
            console.error(err);
            res.json({ success: false, message: '會員更新錯誤' });
            return;
        }

    });
});
router.put('/toggle-member/:Member_ID', (req, res) => {
    const Member_ID = req.params.Member_ID;
    let user_suspend = req.body.user_suspend;
	user_suspend = Boolean(user_suspend);
	const userSuspendValue = user_suspend ? 1 : 0;
	const query = `
		UPDATE member
		SET user_suspend = ${userSuspendValue}
		WHERE Member_ID = ${Member_ID}
	`;

	connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: '會員更新錯誤' });
            return;
        }
        res.json({ success: true, message: '會員更新' });
    });
});
router.delete('/delete-member/:Member_ID', (req, res) => {
    const Member_ID = req.params.Member_ID;
    const query = `
        DELETE FROM member
        WHERE Member_ID = ${Member_ID}
    `;

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: '會員刪除錯誤' });
            return;
        }
        if (results.affectedRows > 0) {
            res.json({ success: true, message: '會員刪除成功' });
        } else {
            res.json({ success: false, message: '找不到要刪除的會員' });
        }
    });
});


// router.post('/order', (req, res) => {
// 	res.json(order)
// });

const order = [
	{
		Order_ID: '1',
        Member_ID: '3',
		create_time: '2023-09-21 14:00',
        account: "111@gmail.com",
		payee: "陸小醬",
        payee_phone:"0958354069",
		payment_address: "桃園市龜山區文化一路537號8樓之10",
        total_price: "100",
        pay: "取貨付款",
        ship:"全家",
		order_state: '已處理',
		pay_state: '未支付',
		items: [
			{
                product_image: "1", 
                image:"1.png",
				product_name: "香草",
				quantity: 2, 
				price: 60       
			},
			{
                product_image: "2",
                image:"1.png",
				product_name: "草莓",
				quantity: 1,
				price:  60 
			}
		]
	},
	{
		Order_ID: '2',
		create_time: '2023-09-21 15:00',
		Member_ID: '3',
		payee: "白白",
		account: "123@gmail.com",
        payee_phone:"0958354069",
        ship:"宅配",
		pay: "取貨付款",
		payment_address: "台北市",
		total_price: "180",
		order_state: '待處理',
		pay_state: '未支付',
		items: [
			{
                product_id: "1", 
                image:"1.png",
                product_name: "巧克力",
                quantity: 3, 
                price: 60       
			},
		]
	},

]


router.post('/order', (req, res) => {
	const query = "SELECT Order_ID, Member_ID, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, account, payee, payee_phone, payment_address, total_price, pay, ship, order_state, pay_state, items FROM orders";
    connection.query(query, (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({ success: false, message: '數據庫查詢錯誤' });
			return;
		}
       results.forEach(order => {
            order.items = JSON.parse(order.items);
        });
        console.log(results);
		
		res.json({ success: true, data: results });
	}); 
});
router.put('/toggle-order/:Order_ID', (req, res) => {
    const Order_ID = req.params.Order_ID;
    const order_state = req.body.order_state;
    console.log(order_state);
	const query = `
		UPDATE orders
		SET order_state = '${order_state}'
		WHERE Order_ID = ${Order_ID}
	`;

	connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: query });
            return;
        }
        res.json({ success: true, message: query });
    });
});
router.delete('/delete-order/:Order_ID', (req, res) => {
    const Order_ID = req.params.Order_ID;
    const query = `
        DELETE FROM orders
        WHERE Order_ID = ${Order_ID}
    `;

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.json({ success: false, message: '訂單刪除錯誤' });
            return;
        }
        if (results.affectedRows > 0) {
            res.json({ success: true, message: '訂單刪除成功' });
        } else {
            res.json({ success: false, message: '找不到要刪除的訂單' });
        }
    });
});

router.post('/message', (req, res) => {
	// res.json(messages)
});

const messages = [
    {
		message_id: 1,
		user_id: 1,
		message_date: "2023-05-03",
		name: "小醬",
		account: "111@gmail.com",
		question_type: "訂單問題",
		question_title: "有什麼口味？",
		question_content: "有什麼口味？",
		answer: ""
	}
]


// connection.end()

module.exports = router;
