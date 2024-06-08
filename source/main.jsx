import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { logEvent } from 'firebase/analytics'
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB } from 'web-vitals'

import '@/services/i18n'
import { analytics } from '@/services/firebase'

import '@/styles/globals.css'

import App from '@/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

function sendToAnalytics({ name, delta, value, id }) {
  logEvent(analytics, name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-performance-in-the-field/
    // metric_rating: 'good' | 'needs-improvement' | 'poor',
    // debug_info: '...',
    // ...
  })
}

onCLS(sendToAnalytics)
onFCP(sendToAnalytics)
onFID(sendToAnalytics)
onINP(sendToAnalytics)
onLCP(sendToAnalytics)
onTTFB(sendToAnalytics)
