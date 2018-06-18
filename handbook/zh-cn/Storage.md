# 本地储存 Storage
基于Promise的`Storage`, 将你想要一直使用的数据, 永久保存在客户端本地,
网页使用
[localForage](https://github.com/localForage/localForage)
作为底层引擎, React Native 使用
[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html)
作为底层引擎

因为`Storage`是一个底层库, 如果你想要保存的数据体积不大, 我们推荐你使用`Cache`, 它和后台的
[redis](https://github.com/antirez/redis)
很像, 它是同步的所以让你容易使用


**注意**: `Storage` 是一个底层库, 以后不会有大的变动

**注意**: `Storage` 是`异步`的, 返回值都是`Promise`

**注意**: 与`Memory`不同, 因受限于底层引擎, 也为了节省计算性能
`.set`, `.get`和`.remove`返回的Promise的结果是undefined, 但是
在`Cache`中解决了这个问题

#### 导入
```javascript
import { Storage } from 'rua'
```

#### 用法
```javascript
Storage.set(key, value)            // 保存数据 / 批量保存数据
Storage.get(key, [defaultValue])   // 获取数据 / 批量获取数据
Storage.remove(key)                // 删除数据 / 批量删除数据
Storage.clear()                    // 清空数据
Storage.keys()                     // 获取所有数据的名字, 返回一个数组
Storage.values()                   // 获取所有数据的值, 返回一个数组
Storage.all()                      // 获取所有数据, 返回一个对象
```

#### 完整例子
```javascript
import { Storage } from 'rua'

Storage.set('hello', 'world')      // Promise的结果: undefined
Storage.set('rua', 'js')           // Promise的结果: undefined
Storage.all()                      // Promise的结果: { hello: 'world', rua: 'js' }
Storage.keys()                     // Promise的结果: ['hello', 'rua']
Storage.values()                   // Promise的结果: ['world', 'js']
Storage.remove('rua')              // Promise的结果: undefined
Storage.get('hello')               // Promise的结果: world
Storage.get('rua')                 // Promise的结果: undefined
Storage.get('rua', 'oh?')          // Promise的结果: oh?
Storage.clear()                    // Promise的结果: undefined
Storage.all()                      // Promise的结果: {}

// 批量 (.set, .get, ,remove支持批量操作)
Storage.set(
  ['hello', 'rua', 'react'], 
  ['world', 'js', 'native'],
)                                  // Promise的结果: undefined
Storage.get(['hello', 'react'])    // Promise的结果: ['world', 'js']
Storage.remove(['hello', 'rua'])   // Promise的结果: undefined
```