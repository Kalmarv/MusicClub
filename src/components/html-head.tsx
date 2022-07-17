import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

const HTMLHead = (): JSX.Element => {
  const title = 'Album Club'
  const desc = 'A community for music lovers to share their favorite albums and listen to others'
  const ogImgRelativePath = '/og.png'

  const siteURL = 'https://listen.kv7.dev'
  const ogImageURL = `${siteURL}${ogImgRelativePath}`
  const pathName = useRouter().pathname
  const pageURL = pathName === '/' ? siteURL : siteURL + pathName
  const twitterHandle = '@kalmarv7'
  const siteName = 'listen.kv7.dev'

  return (
    <>
      <NextSeo
        title={title}
        description={desc}
        canonical={pageURL}
        openGraph={{
          type: 'website',
          locale: 'en_US', //  Default is en_US
          url: pageURL,
          title,
          description: desc,
          images: [
            {
              url: ogImageURL,
              width: 1200,
              height: 630,
              alt: 'listen.kv7.dev - Music Club',
            },
          ],
          site_name: siteName,
        }}
        twitter={{
          handle: twitterHandle,
          site: twitterHandle,
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            property: 'author',
            content: title,
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `${siteURL}/favicon.ico`,
          },
        ]}
      />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />
    </>
  )
}

export default HTMLHead
