import Color from './Color'
import Drawable from './Drawable'
import String from './String'
import Identity from './Identity'

interface Resources
{
  color?: Color
  drawable?: Drawable
  string?: String
  id?: Identity
  attr?: any
  animation?: any
  dimension?: any
}

export default Resources