import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';
import { CountryComponent } from './components/country/country.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { ProductComponent } from './components/product/product.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { VariantComponent } from './components/variant/variant.component';







import { AuthGuard } from './components/_guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: 'state', component: StateComponent, canActivate: [AuthGuard] },
  { path: 'city', component: CityComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'attribute', component: AttributeComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'orderdetails', component: OrderdetailsComponent, canActivate: [AuthGuard] },
  { path: 'variant', component: VariantComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'dashboard', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
