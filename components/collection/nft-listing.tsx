import { useNFTCollection, useNFTDrop, useAddress } from '@thirdweb-dev/react'
import { NFTMetadataOwner } from '@thirdweb-dev/sdk'
import { BigNumber } from 'ethers'
import Image from 'next/image'
import { useCallback, useEffect, useState, memo } from 'react'
const NftListing = memo(({ collection }: any) => {
  const address = useAddress()
  const nftDrop = useNFTDrop(collection.collection_address)
  const [collectionList, setCollectionList] = useState<
    NFTMetadataOwner[] | undefined | any
  >([])
  const [loadedCollectionList, setLoadedCollectionList] =
    useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [total, setTotal] = useState<number>()
  const [claimed, setClaimed] = useState<number | null>(null)
  const [mintng, setMinting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const getAllClaimed = useCallback(async (all: any) => {
    if (!nftDrop) return

    const claimed = await nftDrop?.getAllClaimed()
    console.log(claimed)

    setClaimed(claimed?.length)
    if (claimed) {
      for (let i = 0; i < all.length; i++) {
        if (claimed[i]?.metadata.id._hex === all[i].metadata.id._hex) {
          all[i].claimed = true
        } else {
          all[i].claimed = false
        }
      }
      console.log(all)
      setCollectionList(all)
    }
  }, [])

  useEffect(() => {
    if (!nftDrop) return
    setLoadedCollectionList(true)
    async function getAllUnClaimed() {
      const all = await nftDrop?.getAll()
      setTotal(all?.length)
      getAllClaimed(all)
      setLoadedCollectionList(false)
    }

    getAllUnClaimed()
  }, [])

  const claimNft = async () => {
    if (!nftDrop) return
    if (!address) return alert('Please login to claim')
    setMinting(true)
    nftDrop
      ?.claimTo(address, quantity)
      .then((nftclaimed: any) => {
        console.log(nftclaimed)
        const collection_clone = [...collectionList]
        nftclaimed?.forEach((claim: any) => {
          collection_clone.forEach((collection: any) => {
            if (collection.metadata.id._hex === claim.id._hex) {
              collection.claimed = true
            }
          })
        })
        setCollectionList(collection_clone)
        setMinting(false)
        setClaimed((prev: any) => prev + quantity)
      })
      .catch(() => {
        setMinting(false)
      })
      .finally(() => {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      })
  }

  return (
    <>
      {!loadedCollectionList ? (
        <div className="hide-scroll-bar relative mb-16  grid h-[300px] w-full flex-1 grid-cols-2 place-items-center gap-4 overflow-y-auto whitespace-nowrap p-3 py-6 md:grid-cols-3 lg:h-[525px]">
          {collectionList?.map((nft: any) => (
            <div
              key={nft.metadata.id_hex}
              className="group relative h-[250px] w-[200px] rounded border-4 border-green-400 lg:h-[300px]  lg:w-[250px]"
            >
              {nft.metadata.image && (
                <Image
                  src={nft.metadata.image}
                  alt={nft.metadata.name}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  className="scale-125 transition-all duration-300 group-hover:scale-100 group-hover:opacity-30"
                />
              )}
              <div className="absolute bottom-0 left-0 z-20 flex h-24 w-full scale-75 flex-col items-center justify-center space-y-2 bg-transparent text-center text-lg font-bold text-slate-200 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <p className="bg-transparent">{nft.metadata.name}</p>
                <p className="bg-transparent">
                  {nft?.claimed ? 'Claimed' : 'Un Claimed'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="hide-scroll-bar flex h-[300px] w-full items-center justify-center overflow-y-auto whitespace-nowrap text-center text-2xl  font-bold text-red-600">
          Loading...
        </div>
      )}
      <div
        className={`fixed left-0 bottom-0 flex h-16  w-full items-center justify-evenly bg-gradient-to-r from-sky-800 to-green-800  text-white`}
      >
        <p className="bg-transparent text-sm font-bold">
          Claimed NFTs -
          {claimed !== null ? (
            <span className="bg-transparent">
              {claimed}/{total}
            </span>
          ) : (
            <span className="animate-pulse bg-red-700 p-1">loading...</span>
          )}
        </p>
        {success ? (
          <button
            onClick={claimNft}
            disabled={!address || mintng}
            className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-1 font-medium transition-all hover:bg-white"
          >
            <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-purple-600 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>

            <Image src="/success.gif" alt="success" width={40} height={40} />
          </button>
        ) : (
          <button
            onClick={claimNft}
            disabled={!address || mintng}
            className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
          >
            <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-purple-600 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full bg-transparent  text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              {mintng ? 'Minting...' : `Mint ${0.02 * quantity} ETH`}
            </span>
          </button>
        )}
        <div className="flex items-center justify-center space-x-3 bg-transparent  text-sm font-bold">
          <p className="bg-transparent">quantity</p>
          <input
            type="number"
            min="1"
            className="foc w-[50px] appearance-none rounded bg-white p-1 text-black outline-none"
            defaultValue={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
      </div>
    </>
  )
})
export default NftListing
