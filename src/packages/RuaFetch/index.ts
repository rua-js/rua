import RuaFetchClass from './RuaFetch'

import { RuaFetchStatic } from './Interface'

export const RuaFetch: RuaFetchStatic = RuaFetchClass

export const fetch = RuaFetch.fetch

export const catchedFetch = RuaFetch.catchedFetch
