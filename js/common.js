// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

// 退出登录
document.querySelector('#logout')?.addEventListener('click', function () {
  // 删除token
  localStorage.removeItem('token')
  // 跳转到登录页
  location.href = './login.html'
})

// 配置axios
// 根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'
// 请求头携带token
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {

  // 可能没有携带token或token已经过期
  if (error.response.status === 401) {
    // 跳转到登录页
    location.href = './login.html'
  }

  return Promise.reject(error);
});

