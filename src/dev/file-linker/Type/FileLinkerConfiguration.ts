interface FileLinkerConfiguration
{
  path: string
  links: any
  templates: {
    [key: string]: string
  }
  extension: string
  indexExtension: string
}

export default FileLinkerConfiguration
