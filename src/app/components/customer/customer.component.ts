import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { Customer, CustomerPageList } from './Models/customer.model';
import { CustomerService } from './Services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [ToastyService, ToastyConfig, CustomerService]
})
export class CustomerComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Customer: Customer = new Customer();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;
  CountryList: Array<any>;
  StateList: Array<any>;
  CityList: Array<any>;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _CustomerService: CustomerService,
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
    console.log(this.Customer);
    this._CustomerService.AddCustomer(this.Customer).subscribe(
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

  GetAllCustomer() {
    // this.isdisabled = true;
    this._CustomerService.GetAllCustomerDetails().subscribe(
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
    this.Customer.name = '';
    this.Customer.cityId = undefined;
    this.Customer.stateId = undefined;
    this.Customer.countryId = undefined;
    this.Customer.email = undefined;
    this.Customer.phoneNumber = undefined;
    this.Customer.passwordHash = undefined;
    this.Customer.shippingAddress = undefined;
    this.Customer.billingAddress = undefined;
    this.Customer.pincode = undefined;



  }

  GetAllCountry() {
    this._CustomerService.GetAllCountryDetails().subscribe(
      data => {
        this.CountryList = data;
      }
    )
  }

  GetAllState() {
    this._CustomerService.GetAllStateDetails().subscribe(
      data => {
        this.StateList = data;
      }
    )
  }

  GetAllStateByCountryId(id: string) {
    this._CustomerService.GetAllStateByCountryId(id).subscribe(
      data => {
        this.StateList = data;
      }
    )
  }

  GetAllCityByStateId(id: string) {
    this._CustomerService.GetAllCityByStateId(id).subscribe(
      data => {
        this.CityList = data;
      }
    )
  }

  

  GetAllCity() {
    this._CustomerService.GetAllCityDetails().subscribe(
      data => {
        this.CityList = data;
      }
    )
  }
  changeCountry(event) {
    // this.StateList = undefined;
    if (event.isUserInput) {
      this.GetAllStateByCountryId(event.source.value);
    }
  }

  ngOnInit() {
    this.GetAllCountry();
    // this.GetAllState();
    this.GetAllCity();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Customer.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._CustomerService.EditCustomer(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Customer = <Customer>data;
          this.Customer.updatedBy = this.user.AdminId;
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
