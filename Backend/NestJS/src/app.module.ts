import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { TenantsModule } from './tenants/tenants.module'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { PermissionsModule } from './permissions/permissions.module'
import { CustomersModule } from './customers/customers.module'
import { VehiclesModule } from './vehicles/vehicles.module'
import { ProductsModule } from './products/products.module'
import { ServiceOrdersModule } from './service-orders/service-orders.module'
import { InventoryModule } from './inventory/inventory.module'
import { SuppliersModule } from './suppliers/suppliers.module'
import { PurchasesModule } from './purchases/purchases.module'
import { FinanceModule } from './finance/finance.module'
import { IntegrationsModule } from './integrations/integrations.module'
import { AuditModule } from './audit/audit.module'
import { AIModule } from './ai/ai.module'

@Module({
  imports: [
    AuthModule,
    TenantsModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    CustomersModule,
    VehiclesModule,
    ProductsModule,
    ServiceOrdersModule,
    InventoryModule,
    SuppliersModule,
    PurchasesModule,
    FinanceModule,
    IntegrationsModule,
    AuditModule,
    AIModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
