// Auto-generated from your database schema — do not edit by hand.
// Regenerates automatically whenever a table is created or altered.

export type ApiCredentialsRow = {
  id: string
  userId: string
  provider: string
  environment: string | null
  marketplace: string | null
  credentialVersion: string | null
  partnerTagConfigured: boolean | null
  configured: boolean | null
  lastSuccessfulRequest: string | null
  lastErrorCode: string | null
  updatedAt: string | null
}

export type ArbitrageOpportunitiesRow = {
  id: string
  userId: string
  researchRunId: string
  acquisitionCost: number | string | null
  expectedSalePrice: number | string | null
  estimatedFees: number | string | null
  shippingCost: number | string | null
  packagingCost: number | string | null
  otherCosts: number | string | null
  tax: number | string | null
  quantity: number | string | null
  grossRevenue: number | string | null
  totalCosts: number | string | null
  netProfit: number | string | null
  roiPercent: number | string | null
  marginPercent: number | string | null
  breakEvenSalePrice: number | string | null
  verdict: string | null
  createdAt: string | null
}

export type AuditEventsRow = {
  id: string
  userId: string
  researchRunId: string | null
  eventType: string
  payloadJson: string | null
  createdAt: string | null
}

export type FeeAssumptionsRow = {
  id: string
  userId: string
  marketplace: string
  category: string | null
  percentageFee: number | string
  fixedFee: number | string
  notes: string | null
  createdAt: string | null
}

export type MarketplaceObservationsRow = {
  id: string
  userId: string
  productId: string
  marketplace: string
  observationType: string
  valueJson: string
  source: string
  provenance: string
  confidence: string
  retrievedAt: string
}

export type MarketplaceProductsRow = {
  id: string
  userId: string
  productId: string
  marketplace: string
  marketplaceId: string | null
  title: string | null
  brand: string | null
  model: string | null
  productUrl: string | null
  imageUrl: string | null
  matchStatus: string | null
  matchScore: number | string | null
  matchReasons: string | null
  createdAt: string | null
}

export type ProductIdentifiersRow = {
  id: string
  userId: string
  productId: string
  identifierType: string
  identifierValue: string
  source: string | null
  createdAt: string | null
}

export type ProductsRow = {
  id: string
  userId: string
  canonicalTitle: string | null
  brand: string | null
  model: string | null
  category: string | null
  imageUrl: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type ResearchRunsRow = {
  id: string
  userId: string
  inputJson: string
  status: string
  productMatchJson: string | null
  amazonResultJson: string | null
  ebayResultJson: string | null
  calculationJson: string | null
  errorsJson: string | null
  startedAt: string
  completedAt: string | null
}
