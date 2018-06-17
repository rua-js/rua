const Immutable = <T>(target: T): T =>
{
  return Object.freeze(target)
}

export default Immutable
