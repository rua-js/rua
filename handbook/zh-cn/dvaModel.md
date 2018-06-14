# Model
Dva.js彻底解决了过多的reducers, effects, 和actions文件的问题.

但是我们希望能找到一个更方便的使用, 避免重复代码, 能同时支持Vuex和Dva.js的Model的解决方案.

## Two Concepts

#### Actions
```javascript
// 曾经的曾经
this.dispatch({
  type: 'user/saveName',
  payload: 'spiderMan'
})

// 或者
this.dispatch(createAction('user/saveName')('spiderMan'))

// 而现在 
actions.user.saveName('spiderMan')
```

#### Decorated Model
```javascript
@Model()
class User
{
    @State({
      default: 'superMan', // used for .resetState
    })
    name = 'copydog';
    
    @State()
    gender = 'male';
    
    @Reducer()
    saveName(state, { payload: name }) 
    {
      return { ...state, name }
    }
    
    @Effect()
    * asyncSaveName(action, { put }) 
    {
       yield Promise.delay(500).then(() => {
         actions.user.saveName('spiderMan')
       })
    }
}

// Usage
actions.user.saveName('spiderMan'); // name become 'spiderMan'
actions.user.asyncSaveName('spiderMan') // after 500ms, name become 'spiderMan'
```
