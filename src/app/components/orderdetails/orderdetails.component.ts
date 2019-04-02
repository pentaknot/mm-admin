import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { Order, OrderPageList } from './Models/orderdetails.model';
import { OrderService } from './Services/orderdetails.service';

@Component({
  selector: 'app-order',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css'],
  providers: [ToastyService, ToastyConfig, OrderService]
})
export class OrderdetailsComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Order: Order = new Order();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;
  CountryList: Array<any>;
  StateList: Array<any>;
  CityList: Array<any>;
  products: Array<any>;
  customers: Array<any>;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _OrderService: OrderService,
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
    console.log(this.Order);
    this._OrderService.AddOrder(this.Order).subscribe(
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

  GetAllProduct() {
    // this.isdisabled = true;
    this._OrderService.GetAllProductDetails().subscribe(
      data => {
        this.products = data;
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

  GetAllCustomer() {
    // this.isdisabled = true;
    this._OrderService.GetAllCustomerDetails().subscribe(
      data => {
        this.customers = data;
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
   
    this.Order.customerId = undefined;
    this.Order.productId = undefined;
    this.Order.orderNumber = undefined;
    this.Order.quantity = undefined;
    this.Order.total = undefined;
   



  }

 


  ngOnInit() {
    this.GetAllCustomer();
    
    this.GetAllProduct();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Order.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._OrderService.EditOrder(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Order = <Order>data;
          this.Order.updatedBy = this.user.AdminId;
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
