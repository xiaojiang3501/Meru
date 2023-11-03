
export default [
    // UserLogin
    {
        url: "/api/userlogin",
        method: "post",
        response: () => {
            return {
                account: "123@gmail.com",
                password: "123",
                access_token:            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViMTBjNjhjNmU1MjkzMzM1MzhhMDJhN2FhZDYwOTIyZDMxOTMyOWJhNTM0ODRmZGEwNzJhOWE1MWY2YTNkNDNlMDAwOTExNjA5ZDk0NTI0In0",
            };
        },

    },
    // User
    {
        url: "/api/user",
        method: "get",
        response: () => {
            return {
                user_id:"1",
                user_name: "陸小醬",
                email: "123@gmail.com",
                account: "123@gmail.com",
                password: "123",
                address: "桃園市龜山區文化一路537號8樓之10",
                phone: "0958354069"
            };
        },

    },
    // Products
    {
        url: "/api/products",
        method: "get",
        response: () => {
            return {
                products:[
                    {   product_id: "1",
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
            };
        },
    },
    // BackLogin
    {
        url: "/api/backlogin",
        method: "post",
        response: ({ body }) => {
            if (body?.account == 'fae' && body?.password == '0000') {
                data= {
                    access_token:"",
                }
            }
            return data
        },

    },
    // Home
    {
        url: "/api/home",
        method: "get",
        response: () => {
        return{
            home:[
                {
                    today_pay: '10',
                    today_nopay: '2',
                    today_income: '5400',
                    today_member: '5',
                    month_sales: {
                        historymonth:  "20,30,40,10,60,60",
                    },
                    time_mode: 'month',
                    ymd: "2023-07-21",
                    chart_data:{
                        historymonth:  "20,30,40,10,60,60",
                        historyyear:  "20,30,40,50,70,60"
                    },
                }
            ]
            
        }
        },

    },
    // Order
    {
        url: "/api/order",
        method: "get",
        response: () => {
            return {
                order:[
                    {
                        order_id: '1',
                        order_date: '2023-09-21 14:00',
                        user_id: '3',
                        user_name: "陸小醬",
                        account: "123@gmail.com",
                        address: "桃園市龜山區文化一路537號8樓之10",
                        total_price: "100",
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
                    },

                ]

            };
        },

    },
    // Member
    {
        url: "/api/member",
        method: "get",
        response: () => {
        return {
            member:[
                {
                    user_id: '1',
                    register_date: '2023-05-03',
                    user_name: '義大利麵',
                    account: '333@gmail.com',
                    address: '新北市',
                    phone: '0222222222',
                    user_suspend: false
                },
                {
                    user_id: '2',
                    register_date: '2016-05-03',
                    user_name: '客戶',
                    account: '1456@gmail.com',
                    address: '台中市',
                    phone: '093333333',
                    user_suspend: false
                  },
                  {
                    user_id: '3',
                    register_date: '2023-10-25',
                    user_name: '小醬',
                    account: '123@gmail.com',
                    address: '桃園市龜山區文化一路537號8樓之10',
                    phone: '0958354069',
                    user_suspend: true
                  },
                  {
                    user_id: '4',
                    register_date: '2023-10-25',
                    user_name: '白白',
                    account: '111@gmail.com',
                    address: '台北市',
                    phone: '0912345678',
                    user_suspend: true
                  },
            ]
        };
        },

    },


    
]