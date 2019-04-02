import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { Country, CountryPageList } from './Models/country.model';
import { CountryService } from './Services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [ToastyService, ToastyConfig, CountryService]
})
export class CountryComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Country: Country = new Country();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _CountryService: CountryService,
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
    this._CountryService.AddCountry(this.Country).subscribe(
      data => {
        this.loading = false;
        if (this.Viewname !== 'edit') {
          this.resetFormdata();
          this.toastyService.success('Data Added Sucessfuly');
        } else {
          this.toastyService.success('Records Updated Sucessfuly');
        }
        this.GetAllCountry();
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

  GetAllCountry() {
    // this.isdisabled = true;
    this._CountryService.GetAllCountryDetails().subscribe(
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
    this.Country.name = '';
    this.Country.countryId = '';
  }

  ngOnInit() {
      this.GetAllCountry();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Country.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._CountryService.EditCountry(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Country = <Country>data;
          this.Country.updatedBy = this.user.AdminId;
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
