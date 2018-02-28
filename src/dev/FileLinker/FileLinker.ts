import { AnyObject } from 'rua-core/lib/Types'
import * as _ from 'lodash'
import fs from 'fs'
import path from 'path'
import * as fse from 'fs-extra'
import { FileLinkerConfiguration } from '../Type'

class FileLinker
{
  public config: any

  public path: string

  public links: any

  public templates: AnyObject

  public paths: string[]

  public files: string[]

  public shouldLink: boolean = false

  public extension: string

  public indexExtension: string

  constructor(config: FileLinkerConfiguration)
  {
    const {
      path,
      links,
      templates,
      extension,
      indexExtension,
    } = config
    this.config = _.cloneDeep(config)
    this.path = path
    this.links = links
    this.templates = templates
    this.paths = []
    this.files = []
    this.extension = extension
    this.indexExtension = indexExtension
  }

  static get importTemplate(): string
  {
    return 'import ${NAME} from \'./${NAME}\'\n'
  }

  static get exportTemplate(): string
  {
    return 'export {\n${EXPORTS}}\n'
  }

  static renderImportPart(files: string[] = []): string
  {
    let str = ''
    for (const file of files)
    {
      str += FileLinker.importTemplate.replace(/\${NAME}/g, file)
    }
    return str
  }

  static renderExportPart(files: string[] = []): string
  {
    let str = ''
    for (const file of files)
    {
      str += '  ' + file + ',\n'
    }
    return FileLinker.exportTemplate.replace(/\${EXPORTS}/g, str)
  }

  link(): void
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

  linkIndex(): void
  {
    const importContent = FileLinker.renderImportPart(this.files)
    const exportContent = FileLinker.renderExportPart(this.files)
    const indexContent = `${importContent}\n${exportContent}`

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

  linkFiles(): void
  {
    // generate full path for all files
    for (const file of this.files)
    {
      const fullFilePath = (path.resolve(this.path, `${file}.${this.extension}`))
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
          this.renderTemplate(this.links[file], file)
        )
      }
    }
  }

  renderTemplate(templateName: string, name: string): string
  {
    return this.templates[templateName].replace(/\${NAME}/g, name) || ''
  }
}

export default FileLinker
