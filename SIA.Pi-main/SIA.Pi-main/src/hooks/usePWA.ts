import { useEffect, useState } from 'react'
import { registerSW } from 'virtual:pwa-register'

interface PWAState {
  needRefresh: boolean
  offlineReady: boolean
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>
}

export function usePWA(): PWAState {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  const updateServiceWorker = registerSW({
    onNeedRefresh() {
      setNeedRefresh(true)
    },
    onOfflineReady() {
      setOfflineReady(true)
    },
  })

  return { needRefresh, offlineReady, updateServiceWorker }
}
