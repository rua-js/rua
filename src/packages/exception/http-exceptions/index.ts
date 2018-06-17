// Client-side Http exceptions
import HttpAbortException from './HttpAbortException'

// 4xx Http exceptions
import HttpBadRequestException from './HttpBadRequestException'
import HttpUnauthorizedException from './HttpUnauthorizedException'
import HttpPaymentRequiredException from './HttpPaymentRequiredException'
import HttpForbiddenException from './HttpForbiddenException'
import HttpNotFoundException from './HttpNotFoundException'
import HttpMethodNotAllowedException from './HttpMethodNotAllowedException'
import HttpNotAcceptableException from './HttpNotAcceptableException'
import HttpProxyAuthenticationException from './HttpProxyAuthenticationRequiredException'
import HttpRequestTimeoutException from './HttpRequestTimeoutException'
import HttpConflictException from './HttpConflictException'
import HttpGoneException from './HttpGoneException'
import HttpLengthRequiredException from './HttpLengthRequiredException'
import HttpPreconditionFailedException from './HttpPreconditionFailedException'
import HttpPayloadTooLargeException from './HttpPayloadTooLargeException'
import HttpURITooLongException from './HttpURITooLongException'
import HttpUnsupportedMediaTypeException from './HttpUnsupportedMediaTypeException'
import HttpRangeNotSatisfiableException from './HttpRangeNotSatisfiableException'
import HttpExpectationFailedException from './HttpExpectationFailedException'
import HttpMisdirectedRequestException from './HttpMisdirectedRequestException'
import HttpUnprocessableEntityException from './HttpUnprocessableEntityException'
import HttpLockedException from './HttpLockedException'
import HttpFailedDependencyException from './HttpFailedDependencyException'
import HttpUpgradeRequiredException from './HttpUpgradeRequiredException'
import HttpPreconditionRequiredException from './HttpPreconditionRequiredException'
import HttpTooManyRequestsException from './HttpTooManyRequestsExceptions'
import HttpRequestHeaderFieldsTooLargeException from './HttpRequestHeaderFieldsTooLargeException'
import HttpUnavailableForLegalReasonsException from './HttpUnavailableForLegalReasonsException'
import HttpInternalServerErrorException from './HttpInternalServerErrorException'
import HttpNotImplementedException from './HttpNotImplementedException'
import HttpBadGatewayException from './HttpBadGatewayException'
import HttpServiceUnavailableException from './HttpServiceUnavailableException'
import HttpGatewayTimeoutException from './HttpGatewayTimeoutException'
import HttpVersionNotSupportedException from './HttpVersionNotSupportedException'
import HttpVariantAlsoNegotiatesException from './HttpVariantAlsoNegotiatesException'
import HttpInsufficientStorageException from './HttpInsufficientStorageException'
import HttpLoopDetectedException from './HttpLoopDetectedException'
import HttpNotExtendedException from './HttpNotExtendedException'
import HttpNetworkAuthenticationRequiredException from './HttpNetworkAuthenticationRequiredException'


const CodedHttpExceptions = {
  // 4xx
  400: HttpBadRequestException,
  401: HttpUnauthorizedException,
  402: HttpPaymentRequiredException,
  403: HttpForbiddenException,
  404: HttpNotFoundException,
  405: HttpMethodNotAllowedException,
  406: HttpNotAcceptableException,
  407: HttpProxyAuthenticationException,
  408: HttpRequestTimeoutException,
  409: HttpConflictException,
  410: HttpGoneException,
  411: HttpLengthRequiredException,
  412: HttpPreconditionFailedException,
  413: HttpPayloadTooLargeException,
  414: HttpURITooLongException,
  415: HttpUnsupportedMediaTypeException,
  416: HttpRangeNotSatisfiableException,
  417: HttpExpectationFailedException,
  421: HttpMisdirectedRequestException,
  422: HttpUnprocessableEntityException,
  423: HttpLockedException,
  424: HttpFailedDependencyException,
  426: HttpUpgradeRequiredException,
  428: HttpPreconditionRequiredException,
  429: HttpTooManyRequestsException,
  431: HttpRequestHeaderFieldsTooLargeException,
  451: HttpUnavailableForLegalReasonsException,
  // 5xx
  500: HttpInternalServerErrorException,
  501: HttpNotImplementedException,
  502: HttpBadGatewayException,
  503: HttpServiceUnavailableException,
  504: HttpGatewayTimeoutException,
  505: HttpVersionNotSupportedException,
  506: HttpVariantAlsoNegotiatesException,
  507: HttpInsufficientStorageException,
  508: HttpLoopDetectedException,
  510: HttpNotExtendedException,
  511: HttpNetworkAuthenticationRequiredException,
}

export {
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
