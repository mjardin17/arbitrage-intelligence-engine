import { createFileRoute } from '@tanstack/react-router'
import { ArbitrageResearchHome } from '@/features/arbitrage/ArbitrageResearchHome'

export const Route = createFileRoute('/app/')({
  head: () => ({
    meta: [
      { title: 'Research workspace · Arbitrage Intelligence Engine' },
      { name: 'description', content: 'Run a provenance-first product research workflow.' },
    ],
  }),
  component: ArbitrageResearchHome,
})
