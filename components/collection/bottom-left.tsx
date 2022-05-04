import React from 'react'
import Header from './header'
import NftListing from './nft-listing'

const BottomLeft = ({ address, collection }: any) => {
  return (
    <div className="flex flex-1 flex-col text-white">
      <Header address={address} collection={collection} />
      <NftListing collection={collection} />
    </div>
  )
}

export default BottomLeft
