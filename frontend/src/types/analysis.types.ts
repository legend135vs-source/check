export type AnalysisStage = 'free' | 'paywall' | 'pro';

export interface AnalysisRequest {
  autoria_url: string;
}

export interface FreeResult {
  stage: 'free';
  analysis_id: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number;
  city?: string;
  vin?: string;
  description?: string;
  mileage?: number;
  price_usd?: number;
  summary?: string;
  risk_preview?: string;
  photos?: string[];
}

export interface PaywallResult {
  stage: 'paywall';
  analysis_id: string;
  paywall_reason?: string;
  price_uah?: number;
  payment_url?: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number;
  city?: string;
}

export interface ProResult {
  stage: 'pro';
  analysis_id: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: number;
  city?: string;
  vin?: string;
  description?: string;
  mileage?: number;
  price_usd?: number;
  recommendation?: string;
  pros?: string[];
  cons?: string[];
  risks?: string[];
  detailed_analysis?: string;
  common_issues?: string[];
  photo_analysis?: string[];
  description_analysis?: string[];
  expected_costs?: string[];
  questions_to_seller?: string[];
  service_checklist?: string[];
  final_conclusion?: string;
  photos?: string[];
}

export type AnalysisResponse = FreeResult | PaywallResult | ProResult;
