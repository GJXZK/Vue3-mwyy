import axios from "axios"
import nProgress from "nprogress";
import "nprogress/nprogress.css"
let requests=axios.create({
    baseURL:"http://localhost:3000/",
    timeout:5000
})


requests.interceptors.request.use((config)=>{
    // 进度条开始
    nProgress.start();
    return config;
},function(error){
    return Promise.reject(error)
})
// 响应拦截器  在服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nProgress.done()
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    console.log(error);
    return Promise.reject(new Error('faile'));
});

// 对外暴露
export default requests;