import { useMemo, useState } from 'react'
import { AlertTriangle, ArrowRight, Barcode, CheckCircle2, CircleDollarSign, CloudOff, Search, ShieldCheck, SlidersHorizontal, Upload, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { calculateArbitrage } from '@/lib/arbitrage-engine'
import { AmazonCreatorsProvider, EbayProvider } from '@/lib/marketplace-providers'
import type { MarketplaceSnapshot } from '@/lib/marketplace-types'

const amazon = new AmazonCreatorsProvider()
const ebay = new EbayProvider()
const money = (value: number | null) => value === null ? '—' : `$${value.toFixed(2)}`

function StatusBadge({ status }: { status: string }) {
  const configured = status === 'CONFIRMED'
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${configured ? 'border-primary/40 bg-primary/10 text-primary' : 'border-accent/40 bg-accent/10 text-accent'}`}>
    {configured ? <CheckCircle2 className="size-3" /> : <CloudOff className="size-3" />}{status.replace('_', ' ')}
  </span>
}

function ProviderCard({ name, snapshot, accent }: { name: string; snapshot: MarketplaceSnapshot; accent: 'green' | 'gold' }) {
  return <section className="rounded-xl border border-border bg-card/70 p-4 shadow-md">
    <div className="flex items-start justify-between gap-3">
      <div><p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accent === 'green' ? 'text-primary' : 'text-accent'}`}>{name}</p><h3 className="mt-1 text-lg font-semibold">Marketplace signal</h3></div>
      <StatusBadge status={snapshot.status} />
    </div>
    <div className="mt-4 rounded-lg border border-dashed border-border bg-background/50 p-3 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{snapshot.note}</p>
      <p className="mt-1 text-xs">No marketplace-derived values are shown until this provider returns them.</p>
    </div>
    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"><span>Active listings</span><span className="font-mono text-foreground">{snapshot.activeListings.length || 'NOT AVAILABLE'}</span></div>
  </section>
}

export function ArbitrageResearchHome() {
  const [query, setQuery] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [searched, setSearched] = useState(false)
  const [searching, setSearching] = useState(false)
  const [amazonResult, setAmazonResult] = useState<MarketplaceSnapshot | null>(null)
  const [ebayResult, setEbayResult] = useState<MarketplaceSnapshot | null>(null)
  const [cost, setCost] = useState({ acquisition: '0', sale: '0', shipping: '0', packaging: '0', fees: '0.15', quantity: '1' })
  const calculation = useMemo(() => calculateArbitrage({ acquisitionCost: Number(cost.acquisition) || 0, expectedSalePrice: Number(cost.sale) || 0, shippingCost: Number(cost.shipping) || 0, packagingCost: Number(cost.packaging) || 0, otherCosts: 0, marketplaceFeeRate: Number(cost.fees) || 0, fixedMarketplaceFee: 0, tax: 0, quantity: Number(cost.quantity) || 1 }), [cost])

  async function runResearch() {
    if (!query.trim() && !identifier.trim()) return
    setSearching(true)
    setSearched(false)
    const [amazonSnapshot, ebaySnapshot] = await Promise.all([amazon.search({ query, identifierValue: identifier }), ebay.search({ query, identifierValue: identifier })])
    setAmazonResult(amazonSnapshot); setEbayResult(ebaySnapshot); setSearched(true); setSearching(false)
  }

  function updateCost(key: keyof typeof cost, value: string) { setCost(previous => ({ ...previous, [key]: value })) }

  return <main className="min-h-dvh bg-background text-foreground">
    <header className="border-b border-border bg-sidebar/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 lg:px-8"><div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md"><SlidersHorizontal className="size-5" /></div><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">AIE / 01</p><p className="font-semibold tracking-tight">Arbitrage Intelligence Engine</p></div></div><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><ShieldCheck className="size-4 text-primary" /> Provenance-first research</div></div>
    </header>
    <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-8"><div className="absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" /><div className="relative"><div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><span className="text-primary">01 / Identify</span><span>→</span><span>02 / Compare</span><span>→</span><span>03 / Decide</span></div><h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl">Find the signal<br /><span className="text-primary">behind the shelf.</span></h1><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Search a product by identifier or keywords. The engine keeps live marketplace evidence, estimates, and unavailable data visibly separate.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]"><div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => event.key === 'Enter' && void runResearch()} placeholder="Search product title, brand, or model" className="h-11 border-border bg-background pl-10" /></div><Button onClick={() => void runResearch()} disabled={searching || (!query.trim() && !identifier.trim())} className="h-11 gap-2">{searching ? 'Researching…' : 'Run research'}<ArrowRight className="size-4" /></Button></div>
          <div className="mt-3 flex flex-wrap gap-2"><div className="flex min-w-[180px] flex-1 items-center gap-2"><Barcode className="size-4 text-muted-foreground" /><Input value={identifier} onChange={event => setIdentifier(event.target.value)} placeholder="UPC / ASIN / ePID / MPN" className="h-9 border-border bg-background text-xs" /></div><Button type="button" variant="outline" className="h-9 gap-2 border-border text-xs"><Upload className="size-3.5" />Upload image</Button></div>
        </div></section>
        {searched && amazonResult && ebayResult ? <><section className="grid gap-4 sm:grid-cols-2"><ProviderCard name="Amazon / Creators API" snapshot={amazonResult} accent="green" /><ProviderCard name="eBay / Catalog + Browse" snapshot={ebayResult} accent="gold" /></section><section className="rounded-xl border border-accent/30 bg-accent/5 p-4"><div className="flex gap-3"><AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent" /><div><h2 className="font-semibold">Research is blocked by configuration</h2><p className="mt-1 text-sm text-muted-foreground">The query was accepted, but no real marketplace result was returned. Configure server-side provider credentials before treating a product match or price as confirmed.</p></div></div></section></> : <section className="rounded-xl border border-dashed border-border p-8 text-center"><CircleDollarSign className="mx-auto size-8 text-muted-foreground" /><h2 className="mt-3 text-lg font-semibold">Your first research run starts here</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Enter a barcode, ASIN, model number, or product title. Empty and unavailable states are intentional until real provider access is configured.</p></section>}
      </div>
      <aside className="space-y-4"><section className="rounded-xl border border-border bg-card p-5 shadow-md"><div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Economics</p><h2 className="mt-1 text-xl font-semibold">Test the spread</h2></div><CircleDollarSign className="size-5 text-primary" /></div><p className="mt-2 text-xs leading-5 text-muted-foreground">Inputs are user assumptions until a marketplace API supplies a value.</p><div className="mt-5 grid grid-cols-2 gap-3">{([['acquisition','Buy cost'],['sale','Expected sale'],['shipping','Shipping'],['packaging','Packaging'],['fees','Fee rate'],['quantity','Quantity']] as const).map(([key, label]) => <label key={key} className="space-y-1.5"><span className="text-xs text-muted-foreground">{label}</span><Input type="number" min="0" step="0.01" value={cost[key]} onChange={event => updateCost(key, event.target.value)} className="h-9 bg-background text-sm" /></label>)}</div><div className="mt-5 space-y-3 border-t border-border pt-4"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Gross revenue</span><strong>{money(calculation.grossRevenue)}</strong></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Marketplace fees</span><strong>{money(calculation.marketplaceFees)}</strong></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Total costs</span><strong>{money(calculation.totalCosts)}</strong></div><div className="flex justify-between border-t border-border pt-3"><span className="font-medium">Estimated profit</span><strong className={calculation.netProfit >= 0 ? 'text-primary' : 'text-destructive'}>{money(calculation.netProfit)}</strong></div><div className="grid grid-cols-2 gap-2 pt-1"><div className="rounded-lg bg-background p-3"><p className="text-[10px] uppercase text-muted-foreground">ROI</p><p className="mt-1 font-mono text-lg">{calculation.roiPercent === null ? '—' : `${calculation.roiPercent.toFixed(1)}%`}</p></div><div className="rounded-lg bg-background p-3"><p className="text-[10px] uppercase text-muted-foreground">Break-even</p><p className="mt-1 font-mono text-lg">{money(calculation.breakEvenSalePrice)}</p></div></div></div><div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground"><XCircle className="size-4 shrink-0 text-accent" /> {calculation.verdict.replace(/_/g, ' ')}</div></section><section className="rounded-xl border border-border bg-sidebar p-5"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Data quality</p><div className="mt-4 space-y-3 text-sm"><div className="flex items-center justify-between"><span className="text-muted-foreground">Confirmed marketplace data</span><span className="font-mono text-accent">0</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Estimated assumptions</span><span className="font-mono text-primary">{cost.sale !== '0' ? '1' : '0'}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Sold history</span><span className="font-mono text-accent">NOT AVAILABLE</span></div></div></section></aside>
    </div>
  </main>
}
