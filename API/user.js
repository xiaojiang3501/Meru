const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const router = express.Router()


const connection = mysql.createConnection({
	host:"localhost",
	port: "3306",
	user: "root",
	password: "root",
	database: "MERU",
})
connection.connect()


//登入
router.post('/login', (req, res) => {
    const { account, password } = req.body;

    	
	const query = "SELECT * FROM member WHERE account = ? AND password = ? AND Authority = 'user'";
  
	connection.query(query, [account, password], (err, results, fields) =>{
		if (err) {
			console.error(err);
			res.json({ success: false, message: '數據庫查詢錯誤' });
			return;
		}
		if (results.length > 0) {
			const user = results[0];
			res.json({
                success: true,
                message: '登入成功',
                user: {
                    Member_ID: user.Member_ID,
                    name: user.name,
					account: user.account,
					password: user.password,
					phone: user.phone,
					address: user.address,
					Auth_token: user.Auth_token
                },
            });
		} else {
			res.json({ success: false, message: '帳號或密碼錯誤' });
		}

	})
	
});


//註冊
router.post('/register', (req, res) => {
    const { account, password, name } = req.body;
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
			connection.query('INSERT INTO member (Member_ID, register_date, updated_time, name, account, password, address, phone, user_suspend, Auth_token, Authority) VALUES (?, STR_TO_DATE(?, "%Y-%m-%d"), NOW(), ?, ?, ?, NULL, NULL, 1, ?, "user")', [newMemberID, registerDate, name, account, password, token], (error, results) => {
				if (error) {
					return res.json({ success: false, message: '註冊失敗' });
				}

				// 註冊成功，返回成功的JSON響應
				res.json({ success: true, message: '註冊成功' });
			});

		})
    });
});



//會員中心
router.put('/edit-user', (req, res) => {
    const Member_ID = req.body.Member_ID;
    const { name, password, address, phone } = req.body;

    const query = `
        UPDATE member
        SET name = ?,  password = ?, address = ?, phone = ?
        WHERE Member_ID = ?
    `;

    connection.query(query, [name, password, address, phone, Member_ID], (err, results, fields) => {
		if (err) {
            console.error(err);
            res.json({ success: false, message: '數據庫更新錯誤' });
            return;
        }

        res.json({ success: true, message: '更新成功'  });
    });
});

module.exports = router;