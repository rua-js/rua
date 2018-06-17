import UrlString from '../type/UrlString'
import UrlSchema from '../type/UrlSchema'

class Url
{
  protected url: UrlString

  public constructor(url: UrlSchema | UrlString)
  {
    if (typeof url === 'string')
    {
      this.url = url
    }

    this.url = Url.parseUrlStringFromUrlSchema(url as UrlSchema)
  }

  public static parseUrlStringFromUrlSchema(urlSchema: UrlSchema): string
  {
    const {
      domain = '',
      prefix = '',
      suffix = '',
      url,
    } = urlSchema

    return `${domain}${prefix}${url}${suffix}`
  }

  public getUrl(): string
  {
    return this.url
  }
}

export default Url
