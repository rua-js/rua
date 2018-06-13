import { AnyData } from '../../Type/Data'

type ValidationFunction = (carry: boolean, data: AnyData, ...args: any[]) => boolean

export default ValidationFunction
