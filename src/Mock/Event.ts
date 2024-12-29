import { get, set } from "../services/localObjectStorage"

export type EventMockType = {
  id: string
  location: string
  band: string
  start: Date
  opening: Date
  price: number
  setlist: string
}
