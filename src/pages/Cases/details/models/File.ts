interface File {
  id: string
  name: string
  key: string
  extension: string
  path: string
  size: number
  favorite: boolean
  signedUrl: string
}

export default File;