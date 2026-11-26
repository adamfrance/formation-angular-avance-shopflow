import { Routes } from '@angular/router';
import { adminGuard } from '../guards/admin-guard';
import { AdminLayout } from './admin-layout';
import { AdminDashboard } from './admin-dashboard';
import { StockTable } from './stock-table';
import { ProductForm } from './product-form';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivateChild: [adminGuard],
    children: [
      { path: '', component: AdminDashboard },
      { path: 'stock', component: StockTable },
      { path: 'produits/nouveau', component: ProductForm },
    ],
  },
];
