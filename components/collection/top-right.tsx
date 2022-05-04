import Image from 'next/image'
import React from 'react'
import urlFor from '../../config/image-builder'

const TopRight = ({ collection }: any) => {
  return (
    <div className="flex h-1/3 w-full flex-none items-center justify-evenly border-b-4 border-green-400 py-2 lg:h-full lg:w-1/3 lg:flex-col lg:border-r-4 lg:border-b-0 lg:py-0">
      <div className="group relative h-full w-[250px] cursor-pointer rounded border-4 border-green-400   lg:h-[300px]">
        <Image
          src={urlFor(collection.image.asset.url).options.source}
          alt="NFT Minting Platform"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="scale-125 transition-all duration-300 group-hover:scale-100 group-hover:opacity-30"
        />
        <div className="absolute bottom-0 left-0 z-20 h-12 w-full scale-75 bg-transparent text-center text-lg font-bold text-slate-200 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          Apes Collection
        </div>
      </div>
      <div className="text-md w-[200px] text-center font-bold text-white lg:w-auto lg:px-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
        nulla doloribus accusamus fugiat provident voluptas exercitationem
        deserunt reprehenderit!
      </div>
    </div>
  )
}

export default TopRight
