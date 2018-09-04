# 接口 Api
API库分离了接口的定义和调用, 提高可维护性和项目管理性

我们`推荐`使用`装饰器`来定义接口, **提高可读性**和**避免**Rua.js版本升级带来的**代码重构**,
装饰器可以使用Rua.js提供的Babel插件重新编译来提高性能

注意`Api`依赖`Request`, 所以拦截器和底层引擎需要在`Request`里定义

#### 导入
```javascript
import { APIRequest } from 'rua'
```

#### 用法
```javascript
new APIRequest(name, [queryOrBody], [options])  // 面向对象用法
```

#### 基本例子

Do **NOT** forget **import** Api class in your index.js

```javascript
// file: index.js
import './user.js'  // import, that's all
```

```javascript
// file: user.js

@Api()
class User
{
    create = 'https://www.qq.com/user'
}

new APIRequest('user.create', { name: 'copydog' }) // 'GET' method will be used

```

#### Restful Example With Other Decorators
```javascript
@Api({
    defaultDomain: 'https://www.qq.com',
    defaultMethod: 'GET',
})
class User
{
    @Validator(someValidator)
    @Form(true)
    @Method('POST')
    create = '/user';
    
    @Form(true)
    @Method('PATCH')
    update = '/user/:id';
    
    read = '/user/:id';
    
    @Form(true)
    @Method('DELETE')
    delete = '/user/:id';
}


new APIRequest('user.create', { name: 'copydog' });
new APIRequest('user.delete', { id: 11 });
```

### Documentation

#### @Api()

Parameter|Intro|default value
---------|-----|-------------
defaultDomain|Creates and registers Api for you|undefined
defaultMethod|123|'GET'