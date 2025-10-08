import { Spin } from 'antd'

export default function Loader() {
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Spin size="large" />
    </div>
  )
}
