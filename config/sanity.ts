import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // this is from those question during 'sanity init'
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2022-02-03', // use the latest version
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN_API,
  ignoreBrowserTokenWarning: true,
})
