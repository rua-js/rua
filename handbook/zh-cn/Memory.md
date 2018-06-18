# 内存 Memory
定义全局变量有高风险, 且功能欠缺, `Memory`就是为此而生

注意:  与`Cache`和`Storage`不同, 一旦网页关闭或者App关闭, Memory储存的值会丢失

注意: `Memory`采用浅复制, 传入指针类变量 (对象, 数组, 类实例)的时候需要额外注意

#### 导入
```javascript
import { Memory } from 'rua'
```

#### 用法
```javascript
Memory.set(key, value)            // 保存数据
Memory.get(key, [defaultValue])   // 获取数据
Memory.remove(key)                // 删除数据
Memory.clear()                    // 清空数据
Memory.keys()                     // 获取所有数据的名字, 返回一个数组
Memory.values()                   // 获取所有数据的值, 返回一个数组
Memory.all()                      // 获取所有数据, 返回一个对象
```

#### 完整例子
```javascript
import { Memory } from 'rua'

Memory.set('hello', 'world')      // 返回值: world
Memory.set('rua', 'js')           // 返回值: js
Memory.all()                      // 返回值: { hello: 'world', rua: 'js' }
Memory.keys()                     // 返回值: ['hello', 'rua']
Memory.values()                   // 返回值: ['world', 'js']
Memory.remove('rua')              // 返回值: js
Memory.get('hello')               // 返回值: world
Memory.get('rua')                 // 返回值: undefined
Memory.get('rua', 'oh?')          // 返回值: oh?
Memory.clear()                    // 返回值: { hello: 'world' }
Memory.all()                      // 返回值: {}
```