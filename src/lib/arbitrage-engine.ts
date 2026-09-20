export type ArbitrageInputs = {
  acquisitionCost: number
  expectedSalePrice: number
  shippingCost: number
  packagingCost: number
  otherCosts: number
  marketplaceFeeRate: number
  fixedMarketplaceFee: number
  tax: number
  quantity: number
}

export type ArbitrageResult = ArbitrageInputs & {
  grossRevenue: number
  marketplaceFees: number
  totalCosts: number
  netProfit: number
  roiPercent: number | null
  marginPercent: number | null
  breakEvenSalePrice: number
  verdict: 'STRONG_MARGIN' | 'POSITIVE_MARGIN' | 'THIN_MARGIN' | 'NEGATIVE_MARGIN' | 'INSUFFICIENT_DATA'
}

export function calculateArbitrage(input: ArbitrageInputs): ArbitrageResult {
  const quantity = Math.max(1, input.quantity || 1)
  const grossRevenue = Math.max(0, input.expectedSalePrice) * quantity
  const marketplaceFees = grossRevenue * Math.max(0, input.marketplaceFeeRate) + Math.max(0, input.fixedMarketplaceFee) * quantity
  const costBasis = Math.max(0, input.acquisitionCost) * quantity
  const logistics = Math.max(0, input.shippingCost) + Math.max(0, input.packagingCost) + Math.max(0, input.otherCosts)
  const totalCosts = costBasis + marketplaceFees + logistics + Math.max(0, input.tax)
  const netProfit = grossRevenue - totalCosts
  const roiBase = costBasis + logistics + Math.max(0, input.tax)
  const roiPercent = roiBase > 0 ? (netProfit / roiBase) * 100 : null
  const marginPercent = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : null
  const breakEvenSalePrice = ((costBasis + logistics + Math.max(0, input.tax)) / quantity + Math.max(0, input.fixedMarketplaceFee)) / Math.max(0.01, 1 - Math.max(0, input.marketplaceFeeRate))
  const verdict = grossRevenue <= 0 || roiPercent === null ? 'INSUFFICIENT_DATA' : netProfit < 0 ? 'NEGATIVE_MARGIN' : roiPercent >= 50 ? 'STRONG_MARGIN' : roiPercent >= 20 ? 'POSITIVE_MARGIN' : 'THIN_MARGIN'

  return { ...input, quantity, grossRevenue, marketplaceFees, totalCosts, netProfit, roiPercent, marginPercent, breakEvenSalePrice, verdict }
}
