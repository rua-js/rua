export default function Freeze<T>(target: T): T
{
  return Object.freeze(target)
}
