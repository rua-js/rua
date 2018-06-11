import { AnyData } from '../../Type/Data'

type ValidationFunction = (data: AnyData, ...args: any[]) => boolean

export default ValidationFunction
