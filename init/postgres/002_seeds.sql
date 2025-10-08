-- 002_seeds.sql
-- ITFACT - AUTO SERVICES SUITE
-- Seeds iniciais: Permissions globais e dados base

-- ============================================================================
-- PERMISSIONS (Globais - não dependem de tenant)
-- ============================================================================

INSERT INTO "Permission" (id, code, description) VALUES
  (gen_random_uuid(), 'tenant.read', 'Visualizar informações do tenant'),
  (gen_random_uuid(), 'tenant.write', 'Editar informações do tenant'),
  
  (gen_random_uuid(), 'user.read', 'Visualizar usuários'),
  (gen_random_uuid(), 'user.write', 'Criar e editar usuários'),
  (gen_random_uuid(), 'user.delete', 'Excluir usuários'),
  
  (gen_random_uuid(), 'role.read', 'Visualizar perfis'),
  (gen_random_uuid(), 'role.write', 'Criar e editar perfis'),
  (gen_random_uuid(), 'role.delete', 'Excluir perfis'),
  
  (gen_random_uuid(), 'customer.read', 'Visualizar clientes'),
  (gen_random_uuid(), 'customer.write', 'Criar e editar clientes'),
  (gen_random_uuid(), 'customer.delete', 'Excluir clientes'),
  
  (gen_random_uuid(), 'vehicle.read', 'Visualizar veículos'),
  (gen_random_uuid(), 'vehicle.write', 'Criar e editar veículos'),
  (gen_random_uuid(), 'vehicle.delete', 'Excluir veículos'),
  
  (gen_random_uuid(), 'os.read', 'Visualizar ordens de serviço'),
  (gen_random_uuid(), 'os.write', 'Criar e editar ordens de serviço'),
  (gen_random_uuid(), 'os.delete', 'Excluir ordens de serviço'),
  (gen_random_uuid(), 'os.approve', 'Aprovar orçamentos'),
  (gen_random_uuid(), 'os.close', 'Finalizar ordens de serviço'),
  
  (gen_random_uuid(), 'product.read', 'Visualizar produtos'),
  (gen_random_uuid(), 'product.write', 'Criar e editar produtos'),
  (gen_random_uuid(), 'product.delete', 'Excluir produtos'),
  
  (gen_random_uuid(), 'service.read', 'Visualizar serviços'),
  (gen_random_uuid(), 'service.write', 'Criar e editar serviços'),
  (gen_random_uuid(), 'service.delete', 'Excluir serviços'),
  
  (gen_random_uuid(), 'inventory.read', 'Visualizar estoque'),
  (gen_random_uuid(), 'inventory.write', 'Movimentar estoque'),
  (gen_random_uuid(), 'inventory.adjust', 'Ajustar estoque'),
  
  (gen_random_uuid(), 'supplier.read', 'Visualizar fornecedores'),
  (gen_random_uuid(), 'supplier.write', 'Criar e editar fornecedores'),
  (gen_random_uuid(), 'supplier.delete', 'Excluir fornecedores'),
  
  (gen_random_uuid(), 'purchase.read', 'Visualizar compras'),
  (gen_random_uuid(), 'purchase.write', 'Criar e editar pedidos de compra'),
  (gen_random_uuid(), 'purchase.approve', 'Aprovar pedidos de compra'),
  (gen_random_uuid(), 'purchase.receive', 'Receber mercadorias'),
  
  (gen_random_uuid(), 'invoice.read', 'Visualizar faturas'),
  (gen_random_uuid(), 'invoice.write', 'Criar e editar faturas'),
  (gen_random_uuid(), 'invoice.delete', 'Excluir faturas'),
  
  (gen_random_uuid(), 'payment.read', 'Visualizar pagamentos'),
  (gen_random_uuid(), 'payment.write', 'Registrar pagamentos'),
  
  (gen_random_uuid(), 'report.read', 'Visualizar relatórios'),
  (gen_random_uuid(), 'report.export', 'Exportar relatórios'),
  
  (gen_random_uuid(), 'integration.read', 'Visualizar integrações'),
  (gen_random_uuid(), 'integration.write', 'Configurar integrações'),
  
  (gen_random_uuid(), 'audit.read', 'Visualizar logs de auditoria'),
  
  (gen_random_uuid(), 'ai.use', 'Usar recursos de IA')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- BRANDS (Marcas globais de veículos e peças)
-- ============================================================================

INSERT INTO "Brand" (id, name, type) VALUES
  -- Marcas de veículos
  (gen_random_uuid(), 'Chevrolet', 'vehicle'),
  (gen_random_uuid(), 'Volkswagen', 'vehicle'),
  (gen_random_uuid(), 'Fiat', 'vehicle'),
  (gen_random_uuid(), 'Ford', 'vehicle'),
  (gen_random_uuid(), 'Toyota', 'vehicle'),
  (gen_random_uuid(), 'Honda', 'vehicle'),
  (gen_random_uuid(), 'Hyundai', 'vehicle'),
  (gen_random_uuid(), 'Renault', 'vehicle'),
  (gen_random_uuid(), 'Nissan', 'vehicle'),
  (gen_random_uuid(), 'Jeep', 'vehicle'),
  
  -- Marcas de peças
  (gen_random_uuid(), 'Bosch', 'parts'),
  (gen_random_uuid(), 'NGK', 'parts'),
  (gen_random_uuid(), 'Mann Filter', 'parts'),
  (gen_random_uuid(), 'Mobil', 'parts'),
  (gen_random_uuid(), 'Castrol', 'parts'),
  (gen_random_uuid(), 'Varga', 'parts'),
  (gen_random_uuid(), 'Cofap', 'parts'),
  (gen_random_uuid(), 'Monroe', 'parts'),
  (gen_random_uuid(), 'Nakata', 'parts'),
  (gen_random_uuid(), 'TRW', 'parts')
ON CONFLICT (name, type) DO NOTHING;

-- ============================================================================
-- TENANT DEMO (Opcional - para testes)
-- ============================================================================

-- Descomente para criar tenant de demonstração
/*
DO $$
DECLARE
  demo_tenant_id UUID := gen_random_uuid();
  admin_user_id UUID := gen_random_uuid();
  admin_role_id UUID := gen_random_uuid();
  warehouse_id UUID := gen_random_uuid();
BEGIN
  -- Criar tenant demo
  INSERT INTO "Tenant" (id, name, plan, status)
  VALUES (demo_tenant_id, 'Oficina Demo', 'professional', 'trial');

  -- Criar usuário admin
  INSERT INTO "UserAccount" (id, tenant_id, name, email, password_hash, is_active)
  VALUES (
    admin_user_id,
    demo_tenant_id,
    'Administrador',
    'admin@demo.com',
    '$2a$10$rQZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ9vXqZ', -- senha: demo123
    true
  );

  -- Criar role admin
  INSERT INTO "Role" (id, tenant_id, name, description)
  VALUES (admin_role_id, demo_tenant_id, 'Administrador', 'Acesso total ao sistema');

  -- Associar todas as permissões ao role admin
  INSERT INTO "RolePermission" (role_id, permission_id)
  SELECT admin_role_id, id FROM "Permission";

  -- Associar usuário ao role
  INSERT INTO "UserRole" (user_id, role_id)
  VALUES (admin_user_id, admin_role_id);

  -- Criar warehouse padrão
  INSERT INTO "Warehouse" (id, tenant_id, name, address)
  VALUES (
    warehouse_id,
    demo_tenant_id,
    'Almoxarifado Principal',
    '{"street": "Rua Demo", "number": "123", "city": "São Paulo", "state": "SP"}'::jsonb
  );

  -- Criar método de pagamento padrão
  INSERT INTO "PaymentMethod" (id, tenant_id, name, type)
  VALUES
    (gen_random_uuid(), demo_tenant_id, 'Dinheiro', 'cash'),
    (gen_random_uuid(), demo_tenant_id, 'Cartão de Crédito', 'card'),
    (gen_random_uuid(), demo_tenant_id, 'PIX', 'pix'),
    (gen_random_uuid(), demo_tenant_id, 'Boleto', 'boleto');

  RAISE NOTICE 'Tenant demo criado com sucesso!';
  RAISE NOTICE 'Email: admin@demo.com';
  RAISE NOTICE 'Senha: demo123';
END $$;
*/
