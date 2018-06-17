const Benchmark = require('benchmark')

const suite = new Benchmark.Suite

suite
  .add('Single Class@test', () => {
    class A {
    }
  })
  .add('Single Function@test', () => {
    function A() {

    }
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
