import { theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

// Configuração centralizada de tema. Altere aqui para refletir em todo o sistema.
const theme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677ff',
    colorLink: '#1677ff',
    borderRadius: 8,
    fontSize: 14,
    colorBgLayout: '#f5f7fa',
  },
  components: {
    Layout: { headerBg: '#0b2a4d', headerHeight: 56 },
    Menu: { itemBorderRadius: 6 },
    Button: { borderRadius: 8 },
    Card: { borderRadius: 10 },
  },
}

export default theme
