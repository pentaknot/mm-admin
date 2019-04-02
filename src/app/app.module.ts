import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastyModule } from 'ng2-toasty';
import { AuthGuard } from './components/_guard/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { LoginComponent } from './components/login/login.component';

import {
  MatButtonModule, MatToolbarModule, MatIconModule, MatChipsModule, MatTooltipModule,
  MatCardModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule,
  MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatSelectModule, MatDialogModule
} from '@angular/material';
import { CountryComponent } from './components/country/country.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { ProductComponent } from './components/product/product.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { VariantComponent } from './components/variant/variant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoryComponent,
    LoginComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    ProductComponent,
    AttributeComponent,
    CustomerComponent,
    OrderdetailsComponent,
    VariantComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule,
    ToastyModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
