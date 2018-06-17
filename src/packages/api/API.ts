import APIEngine from './engine/APIEngine'

const api = new APIEngine()

const API: any = api.call

Object.assign(API, api)
// api.load = api.load
// api.config = api.config
// api.all = api.all
// api.merge = api.merge

export default API
