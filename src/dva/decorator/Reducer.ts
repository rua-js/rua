export default function Reducer(_class: any, name: string)
{
  // initialize final reducers objects
  if (!_class.$$reducers)
  {
    _class.$$reducers = {}
  }

  // some class method is using arrow function (NOTE: known as class properties),
  // which dynamically generated in the constructor, we need to store it's name, and
  // we load it right after we instantiates the class
  if (!_class.$$dynamic_reducer_names)
  {
    _class.$$dynamic_reducer_names = []
  }

  const reducerFunction = _class[name]

  // trait undefined reducer as dynamic function, we retrieve function later
  if (!reducerFunction)
  {
    _class.$$dynamic_reducer_names.push(name)

    // return {}
  } else
  {
    _class.$$reducers[name] = reducerFunction
  }

  // return {}
}
