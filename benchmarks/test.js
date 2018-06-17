const Benchmark = require('benchmark');

const suite = new Benchmark.Suite

let max = 1000000

// let arr = Array.from(Array(max)).map((item, index) => index)
// suite.add('toString#test', function () {
//   arr.toString()
// }).add('Join#test', function () {
//   arr.join(',')
// }).add('string#test', function () {
//   String(arr)
// }).on('cycle', function (event) {
//   console.log(String(event.target));
// }).on('complete', function () {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// }).run({'async': true});

suite.add('RegExp#test', function () {
  /o/.test('Hello World!');
}).add('includes#test', function () {
  'Hello World!'.includes('o');
}).add('String#indexOf', function () {
  'Hello World!'.indexOf('o') > -1;
})
// add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({'async': true});
