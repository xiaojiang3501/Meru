import axios from 'axios'


//初始化一個axios實例
const instance = axios.create({
    //請求前綴
    baseURL: 'http://localhost:3000/api/',
    //請求超時時間
    timeout: 20000,
})

//設置token的方法
export const setToken = (token) => {
    instance.defaults.headers.common['token'] = token;
}

// 添加请求拦截器
axios.instance.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.instance.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default instance