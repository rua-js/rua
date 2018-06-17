const Benchmark = require('benchmark')

const suite = new Benchmark.Suite

class B1 {
  constructor() {
    this.a = function () {}
    this.b = function () {}
    this.c = function () {}
    this.d = function () {}
    this.e = function () {}
    this.f = function () {}
  }
}

const b1 = new B1()

class B2 {
  constructor() {}
  a() {}
  b() {}
  c() {}
  d() {}
  e() {}
  f() {}
}

function B3() {
  return this
}

const b2 = new B2()

suite
  .add('create class with autobinding@test', () => {
    class A {
      constructor() {
        this.a = function () {}
        this.b = function () {}
        this.c = function () {}
        this.d = function () {}
        this.e = function () {}
        this.f = function () {}
      }
    }
  })
  .add('create class without autobinding@test', () => {
    class A {
      constructor() {}
      a() {}
      b() {}
      c() {}
      d() {}
      e() {}
      f() {}
    }
  })
  .add('create instance with autobinding@test', () => {
    new B1()
  })
  .add('create instance without autobinding@test', () => {
    new B2()
  })
  .add('call function with autobinding class@test', () => {
    b1.a()
    b1.b()
    b1.c()
  })
  .add('call function without autobinding class@test', () => {
    b2.a()
    b2.b()
    b2.c()
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ 'async': true })
