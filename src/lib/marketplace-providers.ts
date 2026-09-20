import type { MarketplaceSnapshot } from './marketplace-types'
import { unavailable } from './provenance'

export type ResearchQuery = {
  query: string
  identifierType?: string
  identifierValue?: string
}

const emptySnapshot = (provider: string, status: MarketplaceSnapshot['status'], note: string): MarketplaceSnapshot => ({
  status,
  provider,
  candidates: [],
  activeListings: [],
  soldData: { status: 'NOT_AVAILABLE', note: 'No official historical sold-data provider is configured.' },
  note,
})

export interface MarketplaceProvider {
  search(query: ResearchQuery): Promise<MarketplaceSnapshot>
}

export class AmazonCreatorsProvider implements MarketplaceProvider {
  async search(_query: ResearchQuery) {
    // Browser-safe boundary: secrets and signed requests belong in a server provider.
    return emptySnapshot('amazon_creators_api', 'NOT_CONFIGURED', 'Amazon Creators API requires server-side credentials, partner tag, and approved access.')
  }
}

export class EbayProvider implements MarketplaceProvider {
  async search(_query: ResearchQuery) {
    return emptySnapshot('ebay_catalog_and_browse_api', 'NOT_CONFIGURED', 'eBay Buy API requires server-side client credentials and approved API access.')
  }
}

export function createUnavailableMetric(source: string) {
  return unavailable<number>(source, 'This metric is not returned by the configured provider.')
}
