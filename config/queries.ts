export const collection_url = `
*[_type == "collection"]{
    title,
    slug,
    collection_address,
    creator,
    image{
      asset->{
        _id,
        url
      },
    },
   mainImage{
      asset->{
        _id,
        url
      },
    },
    publishedAt,
  }
`

export const creator_url = `
*[_type == "creator"]{
    name,
    slug,
    image{
      asset->{
        _id,
        url
      },
    },
  }
`
