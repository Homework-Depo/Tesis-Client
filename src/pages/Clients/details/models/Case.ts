import Client from "./Client"
import LawBranch from "./LawBranch"
import LawMatter from "./LawMatter"

interface Case {
  id?: number
  lawMatter?: LawMatter
  lawBranch?: LawBranch
  status?: boolean
  client?: Client
}

export default Case;