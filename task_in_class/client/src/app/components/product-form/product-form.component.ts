import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('productForm') productForm: NgForm;
  errMess: String = null;
  product = this.productInit();
  constructor(private http: Http) {}

  ngOnInit() {}

  productInit() {
    return {
      name: '',
      description: '',
      price: 0
    };
  }

  createProduct() {
    this.http
      .post('http://127.0.0.1:8080/product', this.product, {withCredentials: true})
      .map(res => res)
      .subscribe(
        data => {
          console.log(data.json());
          alert(data.json());
        },
        error => {
          this.errMess = error._body;
        }
      );
    this.product = this.productInit();
    this.errMess = '';
    this.productForm.resetForm();
  }
}
