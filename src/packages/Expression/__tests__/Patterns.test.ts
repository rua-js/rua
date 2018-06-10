import * as Patterns from '../index'

describe('Is Tests (Patterns)', () => {
  test('Email', () => {
    // Test Data
    const emails = [
      '1231231@qq.com', 'wolegeri@gmail.com', 'woqu@ngacn.cc', 'risadas@163.com',
    ]

    const wrongEmail = [
      'asda asd@qq.com', '_@qq,com', '_@qq.com'
    ]

    // Correct Case
    for(const email of emails)
    {
      expect(
        email
      ).toMatch(Patterns.Email)
    }

    // Wrong Case
    for(const email of wrongEmail)
    {
      expect(
        email
      ).not.toMatch(Patterns.Email)
    }
  })

  test('QQ Email', () => {
    // Test Data
    const qqEmails = [
      '12312@qq.com', '43242424@qq.com'
    ]
    const wrongQQEmails = [
      'asdas@qq.com', '_12312@qq.com', '1232@qq.com'
    ]

    // Correct Case
    for(const email of qqEmails)
    {
      expect(
        email
      ).toMatch(Patterns.QQEmail)
    }

    // Wrong Case
    for(const email of wrongQQEmails)
    {
      expect(
        email
      ).not.toMatch(Patterns.QQEmail)
    }
  })
})