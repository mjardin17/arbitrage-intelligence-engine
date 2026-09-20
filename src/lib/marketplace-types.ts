import type { ProvenancedValue } from './provenance'

export type ProviderStatus = 'CONFIRMED' | 'NOT_CONFIGURED' | 'UNAVAILABLE' | 'ERROR'

export type ProductCandidate = {
  id: string
  marketplace: 'amazon' | 'ebay'
  marketplaceId: string | null
  title: string
  brand: string | null
  model: string | null
  identifiers: Record<string, string>
  productUrl: string | null
  imageUrl: string | null
  matchScore: number
  matchStatus: 'MATCHED' | 'POSSIBLE_MATCH' | 'AMBIGUOUS' | 'NO_MATCH'
  matchReasons: string[]
}

export type MarketplaceSnapshot = {
  status: ProviderStatus
  provider: string
  candidates: ProductCandidate[]
  activeListings: Array<{
    itemId: string
    title: string
    price: ProvenancedValue<number>
    shipping: ProvenancedValue<number>
    condition: string | null
    url: string | null
  }>
  soldData: { status: 'NOT_AVAILABLE' | 'ESTIMATED' | 'CONFIRMED'; note: string }
  errorCode?: string
  note?: string
}
