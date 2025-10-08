import { Button, Card, Form, Input, Typography, notification } from 'antd'
import { api } from '../shared/api/http'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/'

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const { data } = await api.post('/auth/login', values)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      notification.success({ message: 'Bem-vindo', description: 'Login realizado com sucesso', duration: 2 })
      navigate(from, { replace: true })
    } catch {
      // handled by interceptor
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa', padding: 16 }}>
      <Card style={{ width: 360 }}>
        <Typography.Title level={4} style={{ marginBottom: 16 }}>Entrar</Typography.Title>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ email: '', password: '' }}>
          <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Informe o e-mail' }, { type: 'email', message: 'E-mail inválido' }]}>
            <Input placeholder="seu@email.com" />
          </Form.Item>
          <Form.Item name="password" label="Senha" rules={[{ required: true, message: 'Informe a senha' }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Entrar</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
