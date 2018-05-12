import { ImageRequireSource, ImageURISource } from 'react-native'

interface Drawable
{
  [name: string]: ImageURISource | ImageURISource[] | ImageRequireSource
}

export default Drawable
