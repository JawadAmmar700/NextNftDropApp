import Image from 'next/image'
import Link from 'next/link'
import urlFor from '../config/image-builder'

const Main = ({ collections }: any) => {
  return (
    <main className="flex w-full flex-1 items-center justify-center space-x-2 px-20 text-center">
      {collections.length > 0 &&
        collections.map((collection: any, id: number) => (
          <Link href={`/${collection.slug.current}`} key={id}>
            <div className="group relative h-[400px] w-[250px] cursor-pointer rounded-lg border-4 border-green-400">
              <Image
                src={urlFor(collection.image.asset.url).options.source}
                alt="NFT Minting Platform"
                layout="fill"
                objectFit="cover"
                priority={true}
                className="scale-125 transition-all duration-300 group-hover:scale-100 group-hover:opacity-30"
              />
              <div className="absolute bottom-0 left-0 z-20 h-12 w-full scale-75 bg-transparent text-lg font-bold text-slate-200 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                {collection.title}
              </div>
            </div>
          </Link>
        ))}
    </main>
  )
}

export default Main
