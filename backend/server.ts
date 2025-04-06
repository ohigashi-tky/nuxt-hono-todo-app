import app from './index'
import { serve } from 'bun'

serve({
  fetch: app.fetch,
  port: 3001
})

console.log('🚀 Hono server running on http://localhost:3001')
