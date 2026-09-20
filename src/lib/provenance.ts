export type Provenance = 'confirmed_marketplace_api' | 'estimated_inferred_ai' | 'user_input' | 'unavailable' | 'mock_data'
export type Confidence = 'high' | 'medium' | 'low' | 'none'

export type ProvenancedValue<T> = {
  value: T | null
  source: string
  provenance: Provenance
  confidence: Confidence
  retrievedAt: string | null
  note?: string
}

export function unavailable<T>(source: string, note: string): ProvenancedValue<T> {
  return { value: null, source, provenance: 'unavailable', confidence: 'none', retrievedAt: null, note }
}
