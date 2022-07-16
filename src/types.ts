export interface UserData {
  expires: string
  id: string
  user: {
    email: string
    image: string
    name: string
  }
}

export interface Root {
  albums: Albums
}

export interface Albums {
  href: string
  items: AlbumItem[]
  limit: number
  next: string
  offset: number
  previous: any
  total: number
}

export interface AlbumItem {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls2
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface SpotifyError {
  error: Error
}

export interface Error {
  status: number
  message: string
}

export type AlbumRoot = Root2[]

export interface Root2 {
  id: any
  result: Result
}

export interface Result {
  type: string
  data: Data
}

export interface Data {
  json: Json
}

export interface Json {
  album_type?: string
  artists?: Artist[]
  available_markets?: string[]
  copyrights?: Copyright[]
  external_ids?: ExternalIds
  external_urls?: ExternalUrls2
  genres?: any[]
  href?: string
  id: string
  images?: Image[]
  label?: string
  name?: string
  popularity?: number
  release_date?: string
  release_date_precision?: string
  total_tracks?: number
  tracks?: Tracks
  type?: string
  uri?: string
  user?: User
  expires?: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Copyright {
  text: string
  type: string
}

export interface ExternalIds {
  upc: string
}

export interface ExternalUrls2 {
  spotify: string
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Tracks {
  href: string
  items: Item[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}

export interface Item {
  artists: Artist2[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrls4
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface Artist2 {
  external_urls: ExternalUrls3
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ExternalUrls3 {
  spotify: string
}

export interface ExternalUrls4 {
  spotify: string
}

export interface User {
  name: string
  email: string
  image: string
}
