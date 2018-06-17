const Benchmark = require('benchmark')
const Repository = require('../../lib/packages/repository/engine/Repository').default
const RepositoryLite = require('../../lib/packages/repository/engine/RepositoryLite').default

const suite = new Benchmark.Suite
const repo = new Repository()
const repoLite = new RepositoryLite()
function RepoFunc() {
  let store = {}
  return {
    set(key, val) {
      store[key] = val
    },
    store,
  }
}
const repoFunc = RepoFunc()

suite
  .add('new Repository@test', () => {
    new Repository()
  })
  .add('new RepositoryLite@test', () => {
    new RepositoryLite()
  })
  .add('new RepositoryFunc@test', () => {
    RepoFunc()
  })
  .add('Repository .set@test', () => {
    repo.set('test', 'test')
  })
  .add('RepositoryLite .set@test', () => {
    repoLite.set('test', 'test')
  })
  .add('RepositoryFunc .set@test', () => {
    // repoFunc.set('test', 'test')
    repoFunc.store['test'] = 'test'
  })
  .add('Repository .get@test', () => {
    repo.get('test')
  })
  .add('RepositoryLite .get@test', () => {
    repoLite.get('test')
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
