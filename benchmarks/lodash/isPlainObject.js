const _ = require('lodash')
const Benchmark = require('benchmark')

const suite = new Benchmark.Suite

const _toString = Object.prototype.toString

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

_number = 3634124;
_string = '123876';
_object = {};
_array = [];
_true = true;
_false = false
_function = function() {}
_symbol = Symbol()
_date = new Date()

suite
  .add('lodash isPlainObject with primary ', () => {
    _.isPlainObject(_object)
    _.isPlainObject(true)
    _.isPlainObject(false)
    _.isPlainObject(_number)
    _.isPlainObject(_string)
    _.isPlainObject([])
    _.isPlainObject(_symbol)
    _.isPlainObject(_function)
    _.isPlainObject(_date)
  })
  .add('rua isPlainObject with primary', () => {
    isPlainObject(_object)
    isPlainObject(_true)
    isPlainObject(_false)
    isPlainObject(_number)
    isPlainObject(_string)
    isPlainObject([])
    isPlainObject(_symbol)
    isPlainObject(_function)
    isPlainObject(_date)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })