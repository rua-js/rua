import * as fs from 'fs'

const templates = {
  empty: '',
  flatList: fs.readFileSync('./FLATLIST', {
    encoding: 'utf-8',
  }),
  model: fs.readFileSync('./MODEL', {
    encoding: 'utf-8',
  }),
  part: fs.readFileSync('./PART', {
    encoding: 'utf-8',
  }),
  route: fs.readFileSync('./ROUTE', {
    encoding: 'utf-8',
  }),
  service: fs.readFileSync('./SERVICE', {
    encoding: 'utf-8',
  }),
  modal: fs.readFileSync('./MODAL', {
    encoding: 'utf-8',
  })
}

export default templates
