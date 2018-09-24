import ExceptionInterface from './ExceptionInterface'

export default interface HttpExceptionInterface extends ExceptionInterface
{
  code: number
}
