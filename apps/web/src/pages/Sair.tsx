import { useEffect } from 'react'

export default function Sair() {
  useEffect(() => {
    // TODO: limpar tokens/localStorage e redirecionar para login quando existir autenticação
    // Por ora, apenas volta ao dashboard
    window.location.href = '/'
  }, [])
  return null
}
