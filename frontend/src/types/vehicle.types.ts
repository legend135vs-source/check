export interface Vehicle {
  id: string
  vin: string
  make: string
  model: string
  year: number
  body_type?: string
  engine?: string
  fuel_type?: string
  transmission?: string
}
