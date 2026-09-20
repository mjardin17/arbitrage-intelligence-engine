import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'arbitrage-intel-engine-gjxpirlq',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_VjebpgUSSOEE7Hb8X-Pmh2B6hpn46enk',
  authRequired: false,
  auth: { mode: 'managed' },
})
