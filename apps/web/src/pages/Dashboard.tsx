import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, CarOutlined, ToolOutlined } from '@ant-design/icons';
import EChart from '../charts/EChart';

const { Title } = Typography;

export default function Dashboard() {
  // Dados mock - em produção virão da API
  const metrics = {
    totalRevenue: 125000,
    totalOrders: 45,
    activeVehicles: 32,
    inventoryValue: 85000,
  };

  const ordersByStatusOption = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: 'Status das OS',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 15, name: 'Aguardando Aprovação' },
          { value: 12, name: 'Em Serviço' },
          { value: 8, name: 'Aguardando Peças' },
          { value: 6, name: 'Concluída' },
          { value: 4, name: 'Faturada' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const revenueByMonthOption = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Receita Mensal',
        type: 'line',
        data: [25000, 30000, 28000, 35000, 32000, 38000],
        smooth: true,
      },
    ],
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Dashboard - ITFACT Auto Services Suite</Title>

      {/* Métricas Principais */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Receita Total"
              value={metrics.totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Ordens de Serviço"
              value={metrics.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Veículos Ativos"
              value={metrics.activeVehicles}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Valor do Estoque"
              value={metrics.inventoryValue}
              prefix={<ToolOutlined />}
              precision={2}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Status das Ordens de Serviço" style={{ height: 400 }}>
            <EChart option={ordersByStatusOption as any} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Receita Mensal" style={{ height: 400 }}>
            <EChart option={revenueByMonthOption as any} />
          </Card>
        </Col>
      </Row>

      {/* Tabela de OS Recentes */}
      <Card title="Ordens de Serviço Recentes" style={{ marginTop: 16 }}>
        <p>Implementar tabela de OS recentes aqui...</p>
      </Card>
    </div>
  );
}
