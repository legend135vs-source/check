export type ReportStatus = 'pending' | 'processing' | 'done' | 'failed'

export interface AuctionRecord {
  auction_name: string
  sale_date: string
  odometer: number
  damage_description?: string
  primary_damage?: string
  secondary_damage?: string
  sale_price?: number
  photo_urls: string[]
}

export interface PhotoAnalysis {
  photo_url: string
  damage_detected: boolean
  damage_description?: string
  confidence_score: number
  damage_zones: string[]
}

export interface Report {
  id: string
  status: ReportStatus
  vin?: string
  auto_ria_url?: string
  risk_score?: number
  ai_summary?: string
  pdf_url?: string
  created_at: string
  auction_records: AuctionRecord[]
  photo_analyses: PhotoAnalysis[]
  vehicle?: {
    make: string
    model: string
    year: number
    vin: string
    engine?: string
    transmission?: string
    fuel_type?: string
    body_type?: string
  }
}
