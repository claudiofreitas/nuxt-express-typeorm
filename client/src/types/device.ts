export interface Device {
  id: number
  device: string
  os: string
  manufacturer: string
  lastCheckedOutDate: string
  lastCheckedOutBy: string
  isCheckedOut: boolean
}
