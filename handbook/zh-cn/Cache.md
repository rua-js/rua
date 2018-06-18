# 缓存 Cache
前端的Redis, 你值得拥有!

`Cache`使用`Storage`作为底层引擎, 以
[redis](https://github.com/antirez/redis)
设计理念为原型, 用法与`Memory`类似, 不过有更强大的功能(钩子函数, 变量变化检测)

**注意**: 数据操作是**同步的**, 本地保存是**异步的**