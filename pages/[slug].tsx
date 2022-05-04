import { GetServerSideProps } from 'next'
import { useNFTCollection, useAddress } from '@thirdweb-dev/react'

import sanity from '../config/sanity'
import Head from 'next/head'
import TopRight from '../components/collection/top-right'
import BottomLeft from '../components/collection/bottom-left'

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { slug } = ctx.params
  const collection =
    await sanity.fetch(`*[_type == "collection" && slug.current == "${slug}"]{
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
  }`)
  return {
    props: {
      collection: collection[0],
    },
  }
}

const Collection = ({ collection }: any) => {
  const address: any = useAddress()

  return (
    <div>
      <Head>
        <title> {collection.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full flex-col lg:flex-row">
        <TopRight collection={collection} />
        <BottomLeft address={address} collection={collection} />
      </div>
    </div>
  )
}

export default Collection
