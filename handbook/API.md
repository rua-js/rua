# Api
Api Decorator is the `recommended` way to register Api now.

#### Basic Example

Do **NOT** forget **import** Api class in your index.js

```javascript
// file: index.js
import './user.js'  // import, that's all
```

```javascript
// file: user.js

api
@Api()
class User
{
    create = 'https://www.qq.com/user'
}

api
Api('user.create', { name: 'copydog' }) // 'GET' method will be used

```

#### Restful Example With Other Decorators
```javascript
api
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

api
Api('user.create', { name: 'copydog' });
Api('user.delete', { id: 11 });
```

### Documentation

#### @Api()

Parameter|Intro|default value
---------|-----|-------------
defaultDomain|Creates and registers Api for you|undefined
defaultMethod|123|'GET'