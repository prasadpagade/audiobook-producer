import { rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const nextDir = resolve(process.cwd(), '.next')

try {
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true })
    console.info(`[clean-next] Removed stale build folder at ${nextDir}`)
  }
} catch (error) {
  console.warn('[clean-next] Failed to delete .next directory:', error)
}
