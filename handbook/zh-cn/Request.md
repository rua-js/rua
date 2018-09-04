# 请求 Request
更高层次抽象的跨平台请求库, 采用多引擎
[superagent](https://github.com/visionmedia/superagent),
[fetch](https://github.com/matthew-andrews/isomorphic-fetch),
[axios](https://github.com/axios/axios)
作为底层实现, 默认和推荐使用
[superagent](https://github.com/visionmedia/superagent),

`Request`是`Api`和`Resource`库的依赖

**推荐使用**`Api`, 因为`Request`不符合工程化的前端应用

#### 导入
```javascript
import { Request } from 'rua'
```

#### 用法
```javascript
new Request(url, [queryOrBody], [options]) // 面对对象方法
```
如果使用`post`, `put`, `patch`方法, queryOrBody会认为是body, 其他情况认为是query

#### 起步例子
```javascript
// 记得用之前导入
import { Request } from 'rua'               // 面对对象方法

// GET http://reqres.in/api/users
new Request('http://reqres.in/api/users')   // 这是异步的, 返回值是Promise

```

#### 基本例子
```javascript
const query = { page: 1 }
const options = { method: 'GET' }

// GET 'http://reqres.in/api/users?page=1'
new Request('http://reqres.in/api/users', query, options)
  .then(res => {
      console.log(res)
  })
  .catch(err => {
      console.error(err)
  })
```

#### 完整例子
```javascript
// [可选]全局拦截器, 建议通过Rua来配置
Request.interceptors.request.push((req) => {
  req.url.setUrl('http://www.qq.com')
  // 请求拦截器不需要return
})
Request.interceptors.response.push((res) => {
  res.newData = {}  // 干你想干的事
  return res        // 返回修改后的值作为新的请求值, 响应拦截器需要return值
})

// [可选]设置引擎, 建议通过Rua来配置
Request.engine = Request.engines.superAgent

let lastRequest; // 保存前一次请求, 这样你就有可以取消前次请求了! 比axios的cancelToken简单实用多了.
const body = { hello: 'world' }

// 请求
new Request('http://reqres.in/api/users', body, {
    headers: {                            // 手动设置请求头, 优先级高于type和accept
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // ...
    },
    before(requestInstance) {             // before是回调函数, 在请求之前会执行
        if (lastRequest) {                // 如果有保存前次请求存在
            lastRequest.abort()           // 则取消前次请求, 如果前次请求已完成, 也不会报错
        }
      
        lastRequest = requestInstance     // 将本次请求保存到lastRequest中以便使用
    },
    method: 'POST',                       // 使用POST方法
    accept: 'json',                       // 设置请求头接受类型 (Content-Type: 'application/json')
    type: 'form',                         // 设置请求头发送 (Accept: 'application/x-www-form-urlencoded')
    withCredentials: true,                // 该请求会带上Cookie
    query: { page: 1 },                   // 设置Query, 一般只有POST, PATCH, PUT方法才会用到
    form: true,                           // 标记本次请求是表单请求, 会自动设置Headers并把数据转换成FormData
    timeout: 5000,                        // 超时时间(毫秒), 超过这个时间会抛出一个HttpTimeoutException
    retry: 10,                            // 重试次数
    retryCallback: () => {}               // 重试失败回调函数
})

```