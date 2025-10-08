import React from 'react'
import type { MenuProps } from 'antd'
import { DashboardOutlined, LaptopOutlined, AppstoreOutlined, TeamOutlined, UserOutlined, CarOutlined, SettingOutlined, LogoutOutlined, DollarOutlined, DatabaseOutlined, ApiOutlined } from '@ant-design/icons'

export const routeTitles: Record<string, string> = {
  '/': 'DASHBOARD',
  '/os': 'OS',
  '/catalog': 'CATÁLOGO',
  '/cadastros': 'CADASTROS',
  '/cadastros/pf': 'CLIENTES - PF',
  '/cadastros/pj': 'CLIENTES - PJ',
  '/cadastros/veiculos': 'VEÍCULOS',
  '/financeiro': 'FINANCEIRO',
  '/estoque': 'ESTOQUE',
  '/integracoes': 'INTEGRAÇÕES',
  '/sistema': 'SISTEMA',
  '/sistema/usuarios': 'USUÁRIOS',
  '/sistema/perfil': 'PERFIL',
  '/sistema/permissoes': 'PERMISSÕES',
  '/sair': 'SAIR',
}

export const menuItems: MenuProps['items'] = [
  { key: '/', icon: React.createElement(DashboardOutlined), label: 'DASHBOARD' },
  { key: '/os', icon: React.createElement(LaptopOutlined), label: 'OS' },
  { key: '/catalog', icon: React.createElement(AppstoreOutlined), label: 'CATÁLOGO' },
  {
    key: '/cadastros',
    icon: React.createElement(TeamOutlined),
    label: 'CADASTROS',
    children: [
      { key: '/cadastros/pf', icon: React.createElement(UserOutlined), label: 'CLIENTES - PF' },
      { key: '/cadastros/pj', icon: React.createElement(UserOutlined), label: 'CLIENTES - PJ' },
      { key: '/cadastros/veiculos', icon: React.createElement(CarOutlined), label: 'VEÍCULOS' },
    ],
  },
  { key: '/financeiro', icon: React.createElement(DollarOutlined), label: 'FINANCEIRO' },
  { key: '/estoque', icon: React.createElement(DatabaseOutlined), label: 'ESTOQUE' },
  { key: '/integracoes', icon: React.createElement(ApiOutlined), label: 'INTEGRAÇÕES' },
  {
    key: '/sistema',
    icon: React.createElement(SettingOutlined),
    label: 'SISTEMA',
    children: [
      { key: '/sistema/usuarios', label: 'USUÁRIOS' },
      { key: '/sistema/perfil', label: 'PERFIL' },
      { key: '/sistema/permissoes', label: 'PERMISSÕES' },
    ],
  },
  { key: '/sair', icon: React.createElement(LogoutOutlined), label: 'SAIR' },
]

export function flattenKeys(items?: MenuProps['items']): string[] {
  if (!items) return []
  const out: string[] = []
  const walk = (arr: NonNullable<MenuProps['items']>) => {
    for (const it of arr) {
      if (!it) continue
      if (typeof it.key === 'string') out.push(it.key)
      // @ts-ignore
      if (it.children) walk(it.children)
    }
  }
  walk(items)
  return out
}
