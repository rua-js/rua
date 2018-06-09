import APIEngine from './Engine/APIEngine'

const api = new APIEngine()

const API: any = api.call
API.load = api.load
API.config = api.config
API.all = api.all

export default API
