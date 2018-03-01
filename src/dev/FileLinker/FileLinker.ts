import { AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import * as fse from 'fs-extra'
import { FileLinkerConfiguration } from './Type'
import { FileLinkerInterface } from './Interface'
import Templates from './Templates'

class FileLinker implements FileLinkerInterface
{
  public config: any

  public path: string

  public links: any

  public templates: AnyObject = Templates

  public paths: string[]

  public files: string[]

  public shouldLink: boolean = false

  public extension: string

  public indexExtension: string

  constructor(config: FileLinkerConfiguration)
  {
    const {
      path = '.',
      links = {},
      templates = {},
      extension = 'tsx',
      indexExtension = 'ts',
    } = config
    this.config = _.cloneDeep(config)
    this.path = path
    this.links = links
    this.templates = {...this.templates, ...templates}
    this.paths = []
    this.files = []
    this.extension = extension
    this.indexExtension = indexExtension
  }

  protected static get importTemplate(): string
  {
    return 'import ${NAME} from \'./${NAME}\'\n'
  }

  protected static get exportTemplate(): string
  {
    return 'export {\n${EXPORTS}}\n'
  }

  protected static renderImportPart(files: string[] = []): string
  {
    let str = ''
    for (const file of files)
    {
      str += FileLinker.importTemplate.replace(/\${NAME}/g, file)
    }
    return str
  }

  protected static renderExportPart(files: string[] = []): string
  {
    let str = ''
    for (const file of files)
    {
      str += '  ' + file + ',\n'
    }
    return FileLinker.exportTemplate.replace(/\${EXPORTS}/g, str)
  }

  public link(): void
  {
    const links = this.links
    for (const file in links)
    {
      // no prototype attribute
      if (Object.prototype.hasOwnProperty.call(links, file))
      {
        // if is index
        if (file === 'index')
        {
          // should the files linked into index.ts
          this.shouldLink = !!links[file]
        }
        // if is file
        else if (typeof links[file] === 'string')
        {
          // save file names and path names for current level
          const fileName = file
          const pathName = `${this.path}/${file}`
          this.files.push(fileName)
          this.paths.push(pathName)
        }
        // if is folder
        else
        {
          // call FileLinker recursively
          new FileLinker({
            ...this.config,
            path: `${this.path}/${file}`,
            links: this.links[file],
          }).link()
        }
      }
    }

    // if current level has file, then creates them/it
    if (this.files.length)
    {
      this.linkFiles()
    }

    // if current level requires index linking, then links it
    if (this.shouldLink)
    {
      this.linkIndex()
    }
  }

  protected linkIndex(): void
  {
    // prep templates
    const importContent = FileLinker.renderImportPart(this.files)
    const exportContent = FileLinker.renderExportPart(this.files)
    const indexContent = `${importContent}\n${exportContent}`

    // index file full path
    const fullFilePath = (path.resolve(this.path, `index.${this.indexExtension}`))

    // create folder if folder is NOT exist
    if (!fs.existsSync(this.path))
    {
      fse.mkdirsSync(this.path)
    }

    // write data to file if file exists
    fs.writeFileSync(
      fullFilePath,
      indexContent,
    )
  }

  protected linkFiles(): void
  {
    // generate full path for all files
    for (const fileName of this.files)
    {
      // parse extension
      const extension = this.links[fileName].split('.')[1] || this.extension

      // parse template name
      const templateName = this.links[fileName].split('.')[0]

      // compute template name
      const fullFilePath = (path.resolve(this.path, `${fileName}.${extension}`))

      // create folder if folder is NOT exist
      if (!fs.existsSync(this.path))
      {
        fse.mkdirsSync(this.path)
      }


      // create file if file is NOT exist
      if (!fs.existsSync(fullFilePath))
      {
        fs.writeFileSync(
          fullFilePath,
          // render template
          this.renderTemplate(templateName, fileName)
        )
      }
    }
  }

  protected renderTemplate(templateName: string, name: string): string
  {
    return this.templates[templateName].replace(/\${NAME}/g, name) || ''
  }
}

export default FileLinker
