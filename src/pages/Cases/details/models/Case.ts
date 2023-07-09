import Client from "./Client"
import LawBranch from "./LawBranch"
import LawMatter from "./LawMatter"
import User from "./User"
import CourtFile from "./CourtFile"

interface Case {
  id?: number
  lawMatter?: LawMatter
  lawBranch?: LawBranch
  status?: boolean
  client?: Client
  users?: User[]
  createdAt?: Date
  closedAt?: Date
  courtFile?: CourtFile
  files?: File[]
}

export default Case;