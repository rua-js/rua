// @ts-ignore: wrong error
import { Event } from '../index'
// @ts-ignore: wrong error
import * as EventEmitter from 'wolfy87-eventemitter'
// import jest from 'jest'

describe('event Tests', () =>
{
  test('initialize correctly', () =>
  {
    // case: can initialize
    // case: store is correct
    expect(
      Event.store
    ).toBeInstanceOf(EventEmitter)
  })
  test('basic usage (.on, .once, .emit)', () =>
  {
    Event.clear()
    // preparation
    const onceCallback = jest.fn()
    const onCallback = jest.fn()
    Event.on('test-on', onCallback)
    Event.once('test-once', onceCallback)
    Array(10).fill(1).forEach(() =>
    {
      Event.emit('test-on')
      Event.emit('test-once')
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
  test('set and get (.get, .all, .load)', () =>
  {
    Event.clear()
    // preparation
    const fakeFn = jest.fn()
    const fakeFn2 = jest.fn()
    const fakeFn3 = jest.fn()
    const fakeFn4 = jest.fn()
    Event.load({
      test1: [fakeFn2, fakeFn],
      test2: fakeFn3,
      test3: fakeFn4,
    })
    // case: .get(string) with one callback
    expect(
      // @ts-ignore
      Event.get('test2').length
    ).toBe(1)
    expect(
      // @ts-ignore
      Event.get('test2')[0].listener
    ).toBe(fakeFn3)
    // case: .get(string) with two callbacks
    expect(
      expect(
        // @ts-ignore
        Event.get('test1').length
      ).toBe(2)
    )
    expect(
      // @ts-ignore
      Event.get('test1')[0].listener
    ).toBe(fakeFn)
    expect(
      // @ts-ignore
      Event.get('test1')[1].listener
    ).toBe(fakeFn2)
    // case: .get(RegExp)
    expect(
      // @ts-ignore
      typeof Event.get(/test[12]/)
    ).toBe('object')
    expect(
      // @ts-ignore
      typeof Event.get(/test[12]/).test1
    ).toBeTruthy()
    expect(
      // @ts-ignore
      typeof Event.get(/test[12]/).test2
    ).toBeTruthy()
    // case: .all
    expect(
      // @ts-ignore
      Event.all().test1 &&
      Event.all().test2 &&
      Event.all().test3
    ).toBeTruthy()
  })
  test('removal (.remove, .clear)', () =>
  {
    Event.clear()
    // preparation
    const fakeFn = jest.fn()
    Event.load({
      test1: fakeFn,
      test2: fakeFn,
      test3: fakeFn,
      test4: fakeFn,
      test5: fakeFn,
    })
    // case: remove(string)
    Event.remove('test1', fakeFn)
    expect(
      Event.get('test1')
    ).toEqual([])
    // case: remove(RegExp)
    Event.remove(/.+[23]/, fakeFn)
    expect(
      Event.get('test2')
    ).toEqual([])
    expect(
      Event.get('test3')
    ).toEqual([])
    // case: removeAll
    Event.clear()
    expect(
      Event.all()
    ).toEqual({})
  })
})
