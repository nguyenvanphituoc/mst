import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import {CustExtBrowserXhr} from './cust-ext-browser-xhr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AsyncLocalStorageModule
  ],
  providers: [
    {provide: BrowserXhr, useClass: CustExtBrowserXhr},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
