export type AnalysisStage = 'free' | 'paywall' | 'pro';

export interface AnalysisRequest {
  autoria_url: string;
}

export interface FreeResult {
  stage: 'free';
  analysis_id: string;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  price_usd?: number;
  summary?: string;
  risk_preview?: string;
}

export interface PaywallResult {
  stage: 'paywall';
  analysis_id: string;
  paywall_reason?: string;
  price_uah?: number;
  payment_url?: string;
  brand?: string;
  model?: string;
  year?: number;
}

export interface ProResult {
  stage: 'pro';
  analysis_id: string;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  price_usd?: number;
  recommendation?: string;
  pros?: string[];
  cons?: string[];
  risks?: string[];
  detailed_analysis?: string;
}

export type AnalysisResponse = FreeResult | PaywallResult | ProResult;
