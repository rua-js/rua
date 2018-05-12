import Color from './Color'
import Drawable from './Drawable'
import String from './String'
import Identity from './Identity'
import Attribute from './Attribute'
import Animation from './Animation'
import Dimension from './Dimension'

interface Resources
{
  color?: Color
  drawable?: Drawable
  string?: String
  id?: Identity
  attr?: Attribute
  animation?: Animation
  dimension?: Dimension
}

export default Resources