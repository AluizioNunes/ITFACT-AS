
import React, { useState } from 'react';
import { Table, Button, Input, Select, Tag, Space, Modal, Form, Input as AntInput, DatePicker, Typography } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

// Dados mock - em produção virão da API
const mockOrders = [
  {
    id: '1',
    number: 'OS-2024-001',
    customer: 'João Silva',
    vehicle: 'ABC-1234 - Onix 1.0',
    status: 'in_service',
    open_date: '2024-01-15',
    total_amount: 450.00,
    assigned_to: 'Carlos Mecânico',
  },
  {
    id: '2',
    number: 'OS-2024-002',
    customer: 'Maria Santos',
    vehicle: 'XYZ-5678 - Gol 1.6',
    status: 'awaiting_parts',
    open_date: '2024-01-16',
    total_amount: 320.00,
    assigned_to: 'Ana Técnica',
  },
  {
    id: '3',
    number: 'OS-2024-003',
    customer: 'Pedro Costa',
    vehicle: 'DEF-9012 - Civic 2.0',
    status: 'completed',
    open_date: '2024-01-14',
    total_amount: 680.00,
    assigned_to: 'Roberto Especialista',
  },
];

const statusMap = {
  draft: { color: 'default', text: 'Rascunho' },
  approved: { color: 'processing', text: 'Aprovado' },
  in_service: { color: 'warning', text: 'Em Serviço' },
  awaiting_parts: { color: 'orange', text: 'Aguardando Peças' },
  completed: { color: 'success', text: 'Concluída' },
  invoiced: { color: 'cyan', text: 'Faturada' },
  canceled: { color: 'error', text: 'Cancelada' },
};

export default function Orders() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'Número',
      dataIndex: 'number',
      key: 'number',
      sorter: (a: any, b: any) => a.number.localeCompare(b.number),
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
      filteredValue: [searchText],
      onFilter: (value: any, record: any) =>
        record.customer.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Veículo',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusMap[status as keyof typeof statusMap]?.color}>
          {statusMap[status as keyof typeof statusMap]?.text}
        </Tag>
      ),
      filters: Object.entries(statusMap).map(([key, value]) => ({
        text: value.text,
        value: key,
      })),
      filteredValue: statusFilter ? [statusFilter] : null,
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Data Abertura',
      dataIndex: 'open_date',
      key: 'open_date',
      sorter: (a: any, b: any) => new Date(a.open_date).getTime() - new Date(b.open_date).getTime(),
    },
    {
      title: 'Valor Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount: number) => `R$ ${amount.toFixed(2)}`,
      sorter: (a: any, b: any) => a.total_amount - b.total_amount,
    },
    {
      title: 'Responsável',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            Ver
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  const handleView = (record: any) => {
    // TODO: Implementar modal de visualização
    console.log('View order:', record);
  };

  const handleEdit = (record: any) => {
    // TODO: Implementar edição
    console.log('Edit order:', record);
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Ordens de Serviço</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Nova OS
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Buscar por cliente..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginRight: 16 }}
        />
        <Select
          placeholder="Filtrar por status"
          style={{ width: 200 }}
          allowClear
          onChange={setStatusFilter}
        >
          {Object.entries(statusMap).map(([key, value]) => (
            <Option key={key} value={key}>
              {value.text}
            </Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={mockOrders}
        rowKey="id"
        pagination={{
          total: mockOrders.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
        }}
      />

      <Modal
        title="Nova Ordem de Serviço"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="Cliente">
            <AntInput placeholder="Selecionar cliente" />
          </Form.Item>
          <Form.Item label="Veículo">
            <AntInput placeholder="Selecionar veículo" />
          </Form.Item>
          <Form.Item label="Descrição do Serviço">
            <AntInput.TextArea rows={4} placeholder="Descreva o problema ou serviço solicitado" />
          </Form.Item>
          <Form.Item label="Data Prevista">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Criar OS
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
