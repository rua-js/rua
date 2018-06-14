# 请求 Request
基于`fetch`轻微封装的跨平台请求库, 拥有`fetch`所有的接口, 但有更强大的功能

`request`是`API`和`Resource`库的依赖, **起步例子**和**基本例子**和标准浏览器
`fetch`没有区别, 如果你已经非常熟悉, 就看看**差异例子**和**完整例子**

 

#### 起步例子
```javascript
import { request } from 'rua'           // 记得用之前导入

request('http://reqres.in/api/users')   // 这是异步的, 返回值是Promise

```

#### 基本例子
```javascript
request('http://reqres.in/api/users')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
```

#### 与fetch差异部分的例子
```javascript
let lastRequest; // 保存前一次请求, 这样你就有可以取消前次请求了! 比axios的cancelToken简单实用多了.

request('http://reqres.in/api/users', {
    before(requestInstance) {             // before是回调函数, 在请求之前会执行
        if (lastRequest) {                // 如果有保存前次请求存在
            lastRequest.abort()           // 则取消前次请求, 如果前次请求已完成, 也不会报错
        }
      
        lastRequest = requestInstance     // 将本次请求保存到lastRequest中以便使用
    },
    form: true,                           // 标记本次请求是表单请求, 会自动设置Headers并把数据转换成FormData
    timeout: 5000,                        // 超时时间(毫秒), 超过这个时间会抛出一个HttpTimeoutException
    autoAbort: true,                      // todo: 待实现
})

```
#### 完整例子
```javascript
let lastRequest; // 保存前一次请求, 这样你就有可以取消前次请求了! 比axios的cancelToken简单实用多了.

request('http://reqres.in/api/users', {
    headers: {
      'Accept': '123',
      'Content-Type': 'application/json'
    },
    before(requestInstance) {             // before是回调函数, 在请求之前会执行
        if (lastRequest) {                // 如果有保存前次请求存在
            lastRequest.abort()           // 则取消前次请求, 如果前次请求已完成, 也不会报错
        }
      
        lastRequest = requestInstance     // 将本次请求保存到lastRequest中以便使用
    },
    form: true,                           // 标记本次请求是表单请求, 会自动设置Headers并把数据转换成FormData
    timeout: 5000,                        // 超时时间(毫秒), 超过这个时间会抛出一个HttpTimeoutException
    autoAbort: true,                      // todo: 待实现
})

```