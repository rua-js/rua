import ExceptionInterface from './ExceptionInterface'

interface HttpExceptionInterface extends ExceptionInterface
{
  statusCode: number
}

export default HttpExceptionInterface
