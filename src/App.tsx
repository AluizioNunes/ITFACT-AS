import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import './App.css'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import RequireAuth from './routes/RequireAuth'

const Dashboard = loadable(() => import('./pages/Dashboard'), { fallback: <Loader/> })
const Orders = loadable(() => import('./pages/Orders'), { fallback: <Loader/> })
const Catalog = loadable(() => import('./pages/Catalog'), { fallback: <Loader/> })
const CadPF = loadable(() => import('./pages/cadastros/PF'), { fallback: <Loader/> })
const CadPJ = loadable(() => import('./pages/cadastros/PJ'), { fallback: <Loader/> })
const CadVeiculos = loadable(() => import('./pages/cadastros/Veiculos'), { fallback: <Loader/> })
const SisUsuarios = loadable(() => import('./pages/sistema/Usuarios'), { fallback: <Loader/> })
const SisPerfil = loadable(() => import('./pages/sistema/Perfil'), { fallback: <Loader/> })
const SisPermissoes = loadable(() => import('./pages/sistema/Permissoes'), { fallback: <Loader/> })
const Financeiro = loadable(() => import('./pages/Financeiro'), { fallback: <Loader/> })
const Estoque = loadable(() => import('./pages/Estoque'), { fallback: <Loader/> })
const Integracoes = loadable(() => import('./pages/Integracoes'), { fallback: <Loader/> })
const Sair = loadable(() => import('./pages/Sair'), { fallback: <Loader/> })
const Login = loadable(() => import('./pages/Login'), { fallback: <Loader/> })

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
      {children}
    </motion.div>
  )
}

export default function App() {
  // prefetch das rotas mais acessadas
  try {
    Dashboard.preload?.();
    Orders.preload?.();
    Catalog.preload?.();
  } catch {}
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route element={<AppLayout />}> 
          <Route element={<RequireAuth />}> 
            <Route index element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/os" element={<PageTransition><Orders /></PageTransition>} />
            <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
            <Route path="/cadastros/pf" element={<PageTransition><CadPF /></PageTransition>} />
            <Route path="/cadastros/pj" element={<PageTransition><CadPJ /></PageTransition>} />
            <Route path="/cadastros/veiculos" element={<PageTransition><CadVeiculos /></PageTransition>} />
            <Route path="/financeiro" element={<PageTransition><Financeiro /></PageTransition>} />
            <Route path="/estoque" element={<PageTransition><Estoque /></PageTransition>} />
            <Route path="/integracoes" element={<PageTransition><Integracoes /></PageTransition>} />
            <Route path="/sistema/usuarios" element={<PageTransition><SisUsuarios /></PageTransition>} />
            <Route path="/sistema/perfil" element={<PageTransition><SisPerfil /></PageTransition>} />
            <Route path="/sistema/permissoes" element={<PageTransition><SisPermissoes /></PageTransition>} />
            <Route path="/sair" element={<PageTransition><Sair /></PageTransition>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
