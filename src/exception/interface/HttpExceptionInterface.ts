import ExceptionInterface from './ExceptionInterface'

interface HttpExceptionInterface extends ExceptionInterface
{
  code: number
}

export default HttpExceptionInterface
