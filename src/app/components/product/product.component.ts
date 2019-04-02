import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { Product, ProductPageList } from './Models/product.model';
import { ProductService } from './Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ToastyService, ToastyConfig, ProductService]
})
export class ProductComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Product: Product = new Product();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _ProductService: ProductService,
    private _routeParams: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';

    // this.selectedMoment = new Date();
  }

  onSubmit() {
    this.loading = true;
    // this.isdisabled = true;
    console.log(this.Product);
    this._ProductService.AddProduct(this.Product).subscribe(
      data => {
        this.loading = false;
        if (this.Viewname !== 'edit') {
          this.resetFormdata();
          this.toastyService.success('Data Added Sucessfuly');
        } else {
          this.toastyService.success('Records Updated Sucessfuly');
        }
      },
      err => {
        if (err) {
          this.toastyService.warning(
            'An Error has occured please try again after some time !' + err
          );
          this.loading = false;
        }
      }
    );
  }

  GetAllCategory() {
    // this.isdisabled = true;
    this._ProductService.GetAllCategoryDetails().subscribe(
      data => {
        this.items = data;
      },
      err => {
        if (err) {
          this.toastyService.warning(
            'An Error has occured please try again after some time !' + err
          );
        }
      }
    );
  }

  resetFormdata() {
    // this.isdisabled = false;
    this.Product.name = '';
    this.Product.productId = undefined;
    this.Product.categoryId = undefined;
    this.Product.basePrice = '';
    this.Product.sku = '';
    this.Product.stockQuantity =  undefined;
    this.Product.minimumQuantity = undefined;
    this.Product.description = '';
  

  }

  ngOnInit() {
      this.GetAllCategory();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Product.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._ProductService.EditProduct(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Product = <Product>data;
          this.Product.updatedBy = this.user.AdminId;
        },
        err => {
          if (err) {
            this.toastyService.warning(
              'An Error has occured please try again after some time !' + err
            );
          }
        }
      );
    }
  }
}
