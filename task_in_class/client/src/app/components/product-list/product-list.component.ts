import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errMess: String = null;
  products: any[];
  addedProducts = [];
  searchParams = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('addedForm') addedForm: NgForm;
  constructor(
    protected storage: AsyncLocalStorage,
    private http: Http,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.listProduct();
    this.searchParams = {
      q: '',
      from: '',
      to: ''
    };
    this.addedProducts = [];
  }

  checkboxOnchanges($checkbox) {
    let product = null;
    this.products.forEach((value, index) => {
      if (value['_id'] === $checkbox.target.id) {
        product = value;
      }
    });
    if ($checkbox.target.checked) {
      this.addedProducts.push(product['_id']);
    } else {
      this.addedProducts = this.addedProducts.filter((value, index) => {
        return value !== product['_id'];
      });
    }
  }

  addedProduct() {
    this.storage.getItem('addedProducts').subscribe(
      addedProducts => {
        const newProducts = addedProducts ? [...addedProducts, ...this.addedProducts] : this.addedProducts;
        this.extensionAddProducts(newProducts);
      },
      error => {
        alert(error);
      }
    );
  }

  extensionAddProducts(products: any[]) {
    this.storage.setItem('addedProducts', products).subscribe(() => {
      // done
      this.router.navigate(['/cart']);
    });
    this.addedProducts = [];
    this.addedForm.resetForm();
    this.ngOnInit();
    alert('Add completed');
  }

  searchProduct() {
    const options = new RequestOptions({
      url: 'http://127.0.0.1:8080/product/list',
      method: 'Get',
      withCredentials: true,
      search: {
        q: this.searchParams.q ? this.searchParams.q : '',
        from: this.searchParams.from ? this.searchParams.from : '',
        to: this.searchParams.to ? this.searchParams.to : ''
      }
    });
    this.http
      .get(options.url, options)
      .map(res => res)
      .subscribe(
        data => {
          this.products = data.json();
        },
        error => {
          this.errMess = error._body;
        }
      );
  }

  listProduct() {
    this.http
      .get('http://127.0.0.1:8080/product/list', { withCredentials: true })
      .map(res => res)
      .subscribe(
        data => {
          this.products = data.json();
        },
        error => {
          this.errMess = error._body;
        }
      );
  }
}
