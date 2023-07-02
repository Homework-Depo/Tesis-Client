import User from "./User"

interface Client {
  id: number
  name: string
  lastName: string
  status: boolean
  user: User[]
}

export default Client;