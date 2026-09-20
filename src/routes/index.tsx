import { createFileRoute } from '@tanstack/react-router'
import { ArbitrageResearchHome } from '@/features/arbitrage/ArbitrageResearchHome'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Arbitrage Intelligence Engine' },
      { name: 'description', content: 'Research resale opportunities with provenance-first marketplace intelligence.' },
    ],
  }),
  component: ArbitrageResearchHome,
})
