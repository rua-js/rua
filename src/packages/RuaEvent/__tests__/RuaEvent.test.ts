// @ts-ignore: wrong error
import RuaEvent from '../RuaEvent'
// @ts-ignore: wrong error
import * as EventEmitter from 'wolfy87-eventemitter'
// import jest from 'jest'

describe('RuaEvent Tests', () => {
  test('initialize correctly', () => {
    // case: can initialize
    expect(
      (new RuaEvent()) instanceof RuaEvent
    ).toBeTruthy()
    // case: store is correct
    expect(
      (new RuaEvent()).store instanceof EventEmitter
    ).toBeTruthy()
    // case: booted
    expect(
      (new RuaEvent()).booted
    ).toBeTruthy()
  })
  test('basic usage (.on, .once, .emit)', () => {
    // preparation
    const onceCallback = jest.fn()
    const onCallback = jest.fn()
    const evt = new RuaEvent()
    evt.on('test-on', onCallback)
    evt.once('test-once', onceCallback)
    Array(10).fill(1).forEach(() => {
      evt.emit('test-on')
      evt.emit('test-once')
    })
    // case: on
    expect(
      onCallback.mock.calls.length
    ).toBe(10)
    // case: once
    expect(
      onceCallback.mock.calls.length
    ).toBe(1)
  })
  test('set and get (.get, .all, .load)', () => {
    // preparation
    const evt = new RuaEvent()
    const fakeFn = jest.fn()
    const fakeFn2 = jest.fn()
    const fakeFn3 = jest.fn()
    const fakeFn4 = jest.fn()
    evt.load({
      test1: [fakeFn2, fakeFn],
      test2: fakeFn3,
      test3: fakeFn4,
    })
    // case: .get(string) with one callback
    expect(
      // @ts-ignore
      evt.get('test2').length
    ).toBe(1)
    expect(
      // @ts-ignore
      evt.get('test2')[0].listener
    ).toBe(fakeFn3)
    // case: .get(string) with two callbacks
    expect(
      expect(
        // @ts-ignore
        evt.get('test1').length
      ).toBe(2)
    )
    expect(
      // @ts-ignore
      evt.get('test1')[0].listener
    ).toBe(fakeFn)
    expect(
      // @ts-ignore
      evt.get('test1')[1].listener
    ).toBe(fakeFn2)
    // case: .get(RegExp)
    expect(
      // @ts-ignore
      typeof evt.get(/test[12]/)
    ).toBe('object')
    expect(
      // @ts-ignore
      typeof evt.get(/test[12]/).test1
    ).toBeTruthy()
    expect(
      // @ts-ignore
      typeof evt.get(/test[12]/).test2
    ).toBeTruthy()
    // case: .all
    expect(
      // @ts-ignore
      evt.all().test1 &&
      evt.all().test2 &&
      evt.all().test3
    ).toBeTruthy()
  })
  test('removal (.remove, .clear)', () => {
    // preparation
    const evt = new RuaEvent()
    const fakeFn = jest.fn()
    evt.load({
      test1: fakeFn,
      test2: fakeFn,
      test3: fakeFn,
      test4: fakeFn,
      test5: fakeFn,
    })
    // case: remove(string)
    evt.remove('test1', fakeFn)
    expect(
      evt.get('test1')
    ).toEqual([])
    // case: remove(RegExp)
    evt.remove(/.+[23]/, fakeFn)
    expect(
      evt.get('test2')
    ).toEqual([])
    expect(
      evt.get('test3')
    ).toEqual([])
    // case: removeAll
    evt.clear()
    expect(
      evt.all()
    ).toEqual({})
  })
})
