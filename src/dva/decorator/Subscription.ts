export default function Subscription(_class: any, name: string)
{
  // initialize final subscriptions objects
  if (!_class.$$subscriptions)
  {
    _class.$$subscriptions = {}
  }

  // some class method is using arrow function (NOTE: known as class properties),
  // which dynamically generated in the constructor, we need to store it's name, and
  // we load it right after we instantiates the class
  if (!_class.$$dynamic_subscription_names)
  {
    _class.$$dynamic_subscription_names = []
  }

  const subscriptionFunction = _class[name]

  // trait undefined subscription as dynamic function, we retrieve function later
  if (!subscriptionFunction)
  {
    _class.$$dynamic_subscription_names.push(name)

    // return {}
  } else
  {
    _class.$$subscriptions[name] = subscriptionFunction
  }

  // return {}
}
