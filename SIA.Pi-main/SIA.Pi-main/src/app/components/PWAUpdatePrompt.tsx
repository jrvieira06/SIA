import { usePWA } from '@/hooks/usePWA'

/**
 * Exibe um banner discreto quando há uma nova versão disponível do app.
 * Não modifica nenhum design das telas existentes.
 */
export function PWAUpdatePrompt() {
  const { needRefresh, offlineReady, updateServiceWorker } = usePWA()

  if (!needRefresh && !offlineReady) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#004aad] text-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-4 text-sm font-semibold">
      {offlineReady && !needRefresh && (
        <span>App disponível offline ✓</span>
      )}
      {needRefresh && (
        <>
          <span>Nova versão disponível!</span>
          <button
            onClick={() => updateServiceWorker(true)}
            className="bg-white text-[#004aad] rounded-xl px-3 py-1 text-xs font-bold hover:bg-white/90 transition-colors"
          >
            Atualizar
          </button>
        </>
      )}
    </div>
  )
}
