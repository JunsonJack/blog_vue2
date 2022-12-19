import axios from "axios";
import NProgress from 'nprogress' // 引入nprogress插件 
import 'nprogress/nprogress.css' // 引入 nprogress 样式


// 请求环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:9922'
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://junsonjack.cn:9922'
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头，设置不同的请求头

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8';

const $http = axios.create({
    timeout:3000
})

// 请求拦截器
$http.interceptors.request.use(config => {
    NProgress.start()
    config.headers = config.headers || {};
    if (window.localStorage.getItem('blog_token')) {
        config.headers.token = window.localStorage.getItem('blog_token') || ''
    }
    return config;
})

// 响应拦截器
$http.interceptors.response.use((res) => {
    NProgress.done()
    const code = res.data.code;
    if (code !== 200) {
        // 拿到code，显示对应异常
        return Promise.reject(res.data)
    }
    return res.data;
}, err => {
    console.log(err);

})

export default $http