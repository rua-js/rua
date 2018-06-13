# Model
Dva.js彻底解决了过多的reducers, effects, 和actions文件的问题.

但是我们希望能找到一个更方便的使用, 避免重复代码, 能同时支持Vuex和Dva.js的Model的解决方案.

```javascript
@Model()
class User
{
    @State('omg')
    name = 'copydog';
    
    @State()
    gender = 'male';
    
    @Reducer()
    saveUserName(state, { payload }) 
    {
      return { ...state,  }
    }
    
    @Effect()
    * asyncFn(action, { put }) 
    {
       
    }
}

// Usage

```
