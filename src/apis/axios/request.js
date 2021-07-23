import axios from 'axios'

//创建axios实例
var service = axios.create({
    baseURL: '/api',
    // timeout: 10000,
    headers: {
        "Content-Type": 'application/json'
    }
})

// 通用的接口请求
// 请求拦截器
service.interceptors.request.use(config => {
    // 请求拦截
    return config
}, error => {
    // 异常
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
    // 响应的数据  response.data
    if (response.status === 200 && response.data.code !== -1 ) {
        return response
    }  else {
       
    }
}, error => {
    // 异常
    return Promise.reject(error)
})

export { service }


