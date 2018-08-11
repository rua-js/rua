import { AnyData } from '../../core/type/data'

type ValidationFunction = (carry: boolean, data: AnyData, ...args: any[]) => boolean

export default ValidationFunction
