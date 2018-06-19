import Request from '../Request'

describe('Request tests', () =>
{
  test('form', async () =>
  {
    const req = new Request(
      'https://reqres.in/api/users',
      {
        hello: 'world',
      },
      {
        method: 'POST',
      },
    )

    expect(req).resolves.toBeTruthy()
    expect(req).resolves.toHaveProperty('id')
    expect(req).resolves.toHaveProperty('hello')
  })
})
