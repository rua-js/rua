import * as fs from 'fs'
import * as path from 'path'

const getTemplate = (templatesName: string): string => {
  return path.resolve(
    require.resolve('rua'),
    `../../src/dev/FileLinker/Templates/${templatesName}`,
  )
}

const templates = {
  empty: '',
  flatList: fs.readFileSync(getTemplate('FLATLIST'), {
    encoding: 'utf-8',
  }),
  model: fs.readFileSync(getTemplate('MODEL'), {
    encoding: 'utf-8',
  }),
  part: fs.readFileSync(getTemplate('PART'), {
    encoding: 'utf-8',
  }),
  route: fs.readFileSync(getTemplate('ROUTE'), {
    encoding: 'utf-8',
  }),
  modal: fs.readFileSync(getTemplate('MODAL'), {
    encoding: 'utf-8',
  })
}

export default templates
