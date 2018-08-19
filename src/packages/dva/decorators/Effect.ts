export default function Effect(_class: any, name: string)
{
  // initialize final effects objects
  if (!_class.$$effects)
  {
    _class.$$effects = {}
  }

  // some class method is using arrow function (NOTE: known as class properties),
  // which dynamically generated in the constructor, we need to store it's name, and
  // we load it right after we instantiates the class
  if (!_class.$$dynamic_effect_names)
  {
    _class.$$dynamic_effect_names = []
  }

  const effectFunction = _class[name]

  // trait undefined effect as dynamic function, we retrieve function later
  if (!effectFunction)
  {
    _class.$$dynamic_effect_names.push(name)

    // return {}
  } else
  {
    _class.$$effects[name] = effectFunction
  }

  // return {}
}
