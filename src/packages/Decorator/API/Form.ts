const Form = (form: boolean = true) => (target: any, propertyKey: string) =>
{
  if (!target[propertyKey])
  {
    target[propertyKey] = {
      form,
    }

    return target
  }

  target[propertyKey].form = form

  return target
}

export default Form
