import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import 'rxjs/add/operator/map';
import { ReturnStatement } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  carts: any[];
  constructor(private http: Http, protected storage: AsyncLocalStorage) {}

  ngOnInit() {
    this.checkout();
  }

  deleteCartItem(productId) {
    this.storage.getItem('addedProducts').subscribe((addedProducts) => {
      for (let i = addedProducts.length - 1; i >= 0; i--) {
        if (addedProducts[i] === productId) {
          const newProducts = addedProducts.splice(i, 1);
          this.storage.setItem('addedProducts', addedProducts).subscribe(newAddedProducts => {
            this.checkout();
          }, error => {
            this.checkout();
          });
          return ;
        }
      }
    });
  }

  checkout() {
    this.storage.getItem('addedProducts').subscribe((addedProducts) => {
      const options = new RequestOptions({
        url: 'http://127.0.0.1:8080/product/list',
        method: 'Post',
        body: {
          products: addedProducts || []
        },
        withCredentials: true
      });

      this.http
        .post(options.url, options.body)
        .map(res => res)
        .subscribe(data => {
          this.carts = data.json();
        }, error => {
            alert(error.json());
            this.carts = null;
          });
    });
  }
}
