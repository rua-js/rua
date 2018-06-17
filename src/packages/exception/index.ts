/**
 * Basic exception
 */
import Exception from './Exception'

/**
 * exceptions
 */
import {
  HttpException,
  RuntimeException,
} from './exceptions'

/**
 * Http exceptions
 */
import {
  CodedHttpExceptions,
  HttpAbortException,
  // 4xx
  HttpBadRequestException,
  HttpUnauthorizedException,
  HttpPaymentRequiredException,
  HttpForbiddenException,
  HttpNotFoundException,
  HttpMethodNotAllowedException,
  HttpNotAcceptableException,
  HttpProxyAuthenticationException,
  HttpRequestTimeoutException,
  HttpConflictException,
  HttpGoneException,
  HttpLengthRequiredException,
  HttpPreconditionFailedException,
  HttpPayloadTooLargeException,
  HttpURITooLongException,
  HttpUnsupportedMediaTypeException,
  HttpRangeNotSatisfiableException,
  HttpExpectationFailedException,
  HttpMisdirectedRequestException,
  HttpUnprocessableEntityException,
  HttpLockedException,
  HttpFailedDependencyException,
  HttpUpgradeRequiredException,
  HttpPreconditionRequiredException,
  HttpTooManyRequestsException,
  HttpRequestHeaderFieldsTooLargeException,
  HttpUnavailableForLegalReasonsException,
  // 5xx
  HttpInternalServerErrorException,
  HttpNotImplementedException,
  HttpBadGatewayException,
  HttpServiceUnavailableException,
  HttpGatewayTimeoutException,
  HttpVersionNotSupportedException,
  HttpVariantAlsoNegotiatesException,
  HttpInsufficientStorageException,
  HttpLoopDetectedException,
  HttpNotExtendedException,
  HttpNetworkAuthenticationRequiredException,
} from './http-exceptions'

export {
  Exception,
  HttpException,
  RuntimeException,

  // Http exceptions
  CodedHttpExceptions,
  HttpAbortException,
  // 4xx
  HttpBadRequestException,
  HttpUnauthorizedException,
  HttpPaymentRequiredException,
  HttpForbiddenException,
  HttpNotFoundException,
  HttpMethodNotAllowedException,
  HttpNotAcceptableException,
  HttpProxyAuthenticationException,
  HttpRequestTimeoutException,
  HttpConflictException,
  HttpGoneException,
  HttpLengthRequiredException,
  HttpPreconditionFailedException,
  HttpPayloadTooLargeException,
  HttpURITooLongException,
  HttpUnsupportedMediaTypeException,
  HttpRangeNotSatisfiableException,
  HttpExpectationFailedException,
  HttpMisdirectedRequestException,
  HttpUnprocessableEntityException,
  HttpLockedException,
  HttpFailedDependencyException,
  HttpUpgradeRequiredException,
  HttpPreconditionRequiredException,
  HttpTooManyRequestsException,
  HttpRequestHeaderFieldsTooLargeException,
  HttpUnavailableForLegalReasonsException,
  // 5xx
  HttpInternalServerErrorException,
  HttpNotImplementedException,
  HttpBadGatewayException,
  HttpServiceUnavailableException,
  HttpGatewayTimeoutException,
  HttpVersionNotSupportedException,
  HttpVariantAlsoNegotiatesException,
  HttpInsufficientStorageException,
  HttpLoopDetectedException,
  HttpNotExtendedException,
  HttpNetworkAuthenticationRequiredException,
}