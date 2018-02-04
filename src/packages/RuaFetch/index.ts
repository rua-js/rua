import RuaFetchClass from './RuaFetch'

import { RuaFetchStatic } from './Interface'

export const RuaFetch: RuaFetchStatic = RuaFetchClass

export const fetch = RuaFetchClass.fetch

export const catchedFetch = RuaFetchClass.catchedFetch

export const rawFetch = RuaFetchClass.rawFetch
