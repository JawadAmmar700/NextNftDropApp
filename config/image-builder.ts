import imageUrlBuilder from '@sanity/image-url'

import sanity from './sanity'

const builder = imageUrlBuilder(sanity)

const urlFor = (image: string): any => builder.image(image)

export default urlFor
