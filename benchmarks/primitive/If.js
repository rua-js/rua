const Benchmark = require('benchmark')

const suite = new Benchmark.Suite

suite
  .add('if true@test', () => {
    if (true) {
      const a = 1 + 1
    }
  })
  .add('if false@test', () => {
    if (false) {

    }
    const a = 1 + 1
  })
  .add('no if@test', () => {
    const a = 1 + 1
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })