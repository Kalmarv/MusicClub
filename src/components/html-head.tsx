const HTMLHead = (): JSX.Element => {
  const title = 'Album Club'
  const desc = 'A community for music lovers to share their favorite albums and listen to others'
  const ogImgRelativePath = '/og.png'

  const siteURL = 'https://listen.kv7.dev'
  const ogImageURL = `${siteURL}${ogImgRelativePath}`

  return (
    <>
      <title>{title}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='msapplication-TileColor' content='#e4d8b4' />
      <meta name='theme-color' content='#e4d8b4' />

      <meta name='author' content='Kalmarv' />
      <meta name='description' content={desc} />
      <link rel='canonical' href={siteURL} />
      <meta name='twitter:card' content={ogImageURL} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={desc} />
      <meta name='twitter:image:src' content={ogImageURL} />
      <meta property='og:url' content={siteURL} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={ogImageURL} />
      <meta property='og:description' content={desc} />
      <meta property='og:site_name' content={title} />
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={desc} />
      <meta itemProp='image' content={ogImageURL} />

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

// upstream test
