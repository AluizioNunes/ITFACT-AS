import { Layout, Menu, Breadcrumb, Avatar, Space, theme } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { menuItems, flattenKeys, routeTitles } from '../config/menu'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const location = useLocation()
  const navigate = useNavigate()

  const rootKeys = useMemo(() => ['/cadastros', '/sistema'], [])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  useEffect(() => {
    const currentRoot = '/' + (location.pathname.split('/')[1] || '')
    if (rootKeys.includes(currentRoot)) setOpenKeys([currentRoot])
    else setOpenKeys([])
  }, [location.pathname, rootKeys])

  const allKeys = flattenKeys(menuItems)
  const selected = allKeys.sort((a, b) => b.length - a.length).find((k) => location.pathname.startsWith(k)) || '/'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontWeight: 600 }}>
        <div>ITFACT AutoService</div>
        <Space size={12}>
          <Breadcrumb
            items={location.pathname
              .split('/')
              .filter(Boolean)
              .reduce((acc: any[], seg, idx, arr) => {
                const href = '/' + arr.slice(0, idx + 1).join('/')
                const title = routeTitles[href] || seg.charAt(0).toUpperCase() + seg.slice(1)
                acc.push({ title: <NavLink to={href}>{title}</NavLink> })
                return acc
              }, [{ title: <NavLink to="/">{routeTitles['/']}</NavLink> }] as any[])}
          />
          <Avatar size={32} style={{ background: '#1677ff' }}>IT</Avatar>
        </Space>
      </Header>
      <Layout>
        <Sider width={220} breakpoint="lg" collapsible collapsedWidth={0} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[selected]}
            openKeys={openKeys}
            onOpenChange={(keys) => {
              const latest = keys.find((k) => !openKeys.includes(k))
              if (latest && rootKeys.includes(latest)) setOpenKeys([latest])
              else setOpenKeys(keys as string[])
            }}
            onClick={({ key }) => {
              if (typeof key === 'string') navigate(key)
            }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: 12 }}>
          <Content style={{ padding: 0, background: 'transparent', width: '100%', overflow: 'auto' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
