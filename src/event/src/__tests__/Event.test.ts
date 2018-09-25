// @ts-ignore: wrong error
import { Event } from '../index'
// @ts-ignore: wrong error
import * as EventEmitter from 'wolfy87-eventemitter'
import { ApplicationContext } from '@ruax/core'
// import jest from 'jest'
const event = ApplicationContext.get(Event)

describe('event Tests', () =>
{
  test('initialize correctly', () =>
  {
    // case: can initialize
    // case: store is correct
    expect(
      event.eventEngine,
    ).toBeInstanceOf(EventEmitter)
  })
  test('basic usage (.on, .once, .emit)', () =>
  {
    event.clear()
    // preparation
    const onceCallback = jest.fn()
    const onCallback = jest.fn()
    event.on('test-on', onCallback)
    event.once('test-once', onceCallback)
    Array(10).fill(1).forEach(() =>
    {
      event.emit('test-on')
      event.emit('test-once')
    })
    // case: on
    expect(
      onCallback.mock.calls.length,
    ).toBe(10)
    // case: once
    expect(
      onceCallback.mock.calls.length,
    ).toBe(1)
  })
  test('set and get (.get, .all, .load)', () =>
  {
    event.clear()
    // preparation
    const fakeFn = jest.fn()
    const fakeFn2 = jest.fn()
    const fakeFn3 = jest.fn()
    const fakeFn4 = jest.fn()
    event.load({
      test1: [fakeFn2, fakeFn],
      test2: fakeFn3,
      test3: fakeFn4,
    })
    // case: .get(string) with one callbacks
    expect(
      // @ts-ignore
      event.get('test2').length,
    ).toBe(1)
    expect(
      // @ts-ignore
      event.get('test2')[0].listener,
    ).toBe(fakeFn3)
    // case: .get(string) with two callbacks
    expect(
      expect(
        // @ts-ignore
        event.get('test1').length,
      ).toBe(2),
    )
    expect(
      // @ts-ignore
      event.get('test1')[0].listener,
    ).toBe(fakeFn)
    expect(
      // @ts-ignore
      event.get('test1')[1].listener,
    ).toBe(fakeFn2)
    // case: .get(RegExp)
    expect(
      // @ts-ignore
      typeof event.get(/test[12]/),
    ).toBe('object')
    expect(
      // @ts-ignore
      typeof event.get(/test[12]/).test1,
    ).toBeTruthy()
    expect(
      // @ts-ignore
      typeof event.get(/test[12]/).test2,
    ).toBeTruthy()
    // case: .all
    expect(
      // @ts-ignore
      event.all().test1 &&
      event.all().test2 &&
      event.all().test3,
    ).toBeTruthy()
  })
  test('removal (.remove, .clear)', () =>
  {
    event.clear()
    // preparation
    const fakeFn = jest.fn()
    event.load({
      test1: fakeFn,
      test2: fakeFn,
      test3: fakeFn,
      test4: fakeFn,
      test5: fakeFn,
    })
    // case: remove(string)
    event.remove('test1', fakeFn)
    expect(
      event.get('test1'),
    ).toEqual([])
    // case: remove(RegExp)
    event.remove(/.+[23]/, fakeFn)
    expect(
      event.get('test2'),
    ).toEqual([])
    expect(
      event.get('test3'),
    ).toEqual([])
    // case: removeAll
    event.clear()
    expect(
      event.all(),
    ).toEqual({})
  })
})
