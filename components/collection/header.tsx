import { useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = ({ address, collection }: any) => {
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()

  const [etherBalance, setEtherBalance] = useState<string | undefined>('')

  useEffect(() => {
    if (!address) return
    ;(async () => {
      const provider = ethers.getDefaultProvider('rinkeby')
      const balance = await provider.getBalance(address)
      const balanceInEth = ethers.utils.formatEther(balance)
      setEtherBalance(balanceInEth)
    })()
  }, [address])

  return (
    <div className="flex flex-none items-center justify-between p-3">
      <Link href="/">
        <h1 className="cursor-pointer text-2xl font-bold hover:opacity-90">
          {collection.title}
        </h1>
      </Link>
      {!address ? (
        <button
          onClick={connectWithMetamask}
          className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            connect wallet
          </span>
        </button>
      ) : (
        <div className="flex items-center justify-center space-x-3">
          {address && (
            <button
              onClick={disconnect}
              className="group relative  inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-blue-600 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-200 group-hover:from-green-400 group-hover:to-blue-600 dark:text-white dark:focus:ring-green-800"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                logout
              </span>
            </button>
          )}
          <div className="flex w-[200px] flex-col rounded-lg border-2 border-white px-5 py-2.5 ">
            <p className="text-sm font-bold">
              Balance: {etherBalance?.slice(0, 6)} ETH
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
