import axios from 'axios'


//初始化一個axios實例
var instance = axios.create({
    //請求前綴
    baseURL: 'http://localhost:8080/api/',
    //請求超時時間
    timeout: 20000,
})

//設置token的方法
export const setToken = (token) => {
    instance.defaults.headers.common['token'] = token;
}


export default instance