import { getInstanceLobbyCount, getInstancePlayerCount } from "./LobbyManager"
import { getWSClientsSize } from "./WSClientManager"

interface Stat {
  timestamp: Date
  value: number
}

declare global {
  var statManager: {
    stats: {
      [key: string]: Stat[]
    }
  }
}

const MAX_SAMPLES = Number(process.env.STATS_MAX_SAMPLES) || 3600
const INTERVAL = Number(process.env.STATS_INTERVAL) || 5

let lastCpuUsage = process.cpuUsage()
let lastTimestamp = Date.now()

function initializeStatManager() {
  if (globalThis.statManager) return

  globalThis.statManager = {
    stats: { clients: [], players: [], lobbies: [], processCPU: [], processMemory: [] }
  }

  setInterval(() => {
    const stats = globalThis.statManager.stats
    const now = Date.now()
    const timestamp = new Date(now)

    const currentCpuUsage = process.cpuUsage()
    
    const userDiff = currentCpuUsage.user - lastCpuUsage.user
    const systemDiff = currentCpuUsage.system - lastCpuUsage.system
    
    const timeDiff = (now - lastTimestamp) * 1000

    let cpuPercent = 0
    if (timeDiff > 0) {
      cpuPercent = ((userDiff + systemDiff) / timeDiff) * 100
    }

    lastCpuUsage = currentCpuUsage
    lastTimestamp = now

    const dataPoints = [
      { key: 'clients', value: getWSClientsSize() },
      { key: 'players', value: getInstancePlayerCount() },
      { key: 'lobbies', value: getInstanceLobbyCount() },
      { key: 'processCPU', value: Math.min(100, Math.round(cpuPercent)) },
      { key: 'processMemory', value: Math.round(process.memoryUsage().rss / 1024 / 1024) }
    ]

    dataPoints.forEach(({ key, value }) => {
      stats[key].push({ timestamp, value })
      if (stats[key].length > MAX_SAMPLES) stats[key].shift()
    })
  }, 1000 * INTERVAL)
}Math.max(10, Number(process.env.STATS_MAX_SAMPLES) || 3600)

export const getStats = () => {
  initializeStatManager()
  const { clients, players, lobbies } = globalThis.statManager.stats
  return { clients, players, lobbies }
}

export const getDebugStats = () => {
  initializeStatManager()
  return globalThis.statManager.stats
}