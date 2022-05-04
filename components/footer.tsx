import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t-4 border-green-400 py-5 text-white">
      <div className="flex items-center justify-center  text-xs font-bold">
        Created by
        <span>Jawad Ammar</span>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={48}
          height={48}
          layout="fixed"
          className="ml-2 text-white"
        />
      </div>
      <div className="flex items-center justify-center  text-xs font-medium">
        Copyright &copy; 2022 NFT Minting Platform LB. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
