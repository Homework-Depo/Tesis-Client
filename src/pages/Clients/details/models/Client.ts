import Case from "./Case";

interface DetailsClient {
  status: boolean
  name: string
  lastName: string
  dni: string
  phone: string
  email: string
  cases: Case[]
}

export default DetailsClient;