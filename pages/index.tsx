import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/footer'
import Main from '../components/main'

import { collection_url } from '../config/queries'
import sanity from '../config/sanity'

export const getServerSideProps: GetServerSideProps = async () => {
  const collections = await sanity.fetch(collection_url)

  return {
    props: {
      collections,
    },
  }
}

const Home: NextPage = ({ collections }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>NFT Minting Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main collections={collections} />
      <Footer />
    </div>
  )
}

export default Home
