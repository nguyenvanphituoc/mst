import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './../components/product-list/product-list.component';
import { ProductFormComponent } from './../components/product-form/product-form.component';
import { CartListComponent } from './../components/cart-list/cart-list.component';

const routes: Routes = [
  {path: 'product/list', component: ProductListComponent},
  {path: 'product', component: ProductFormComponent},
  {path: 'cart', component: CartListComponent},
  {path: '', redirectTo: '/product', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
