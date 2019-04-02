import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { State, StatePageList } from './Models/state.model';
import { StateService } from './Services/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  providers: [ToastyService, ToastyConfig, StateService]
})
export class StateComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  State: State = new State();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _StateService: StateService,
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
    this._StateService.AddState(this.State).subscribe(
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

  GetAllCountry() {
    // this.isdisabled = true;
    this._StateService.GetAllCountryDetails().subscribe(
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
    this.State.name = '';
    this.State.countryId = '';
  }

  ngOnInit() {
      this.GetAllCountry();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.State.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._StateService.EditState(this.ID).subscribe(
        data => {
          this.loading = false;
          this.State = <State>data;
          this.State.updatedBy = this.user.AdminId;
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
