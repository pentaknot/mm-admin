import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { Attribute, AttributePageList } from './Models/attribute.model';
import { AttributeService } from './Services/attribute.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css'],
  providers: [ToastyService, ToastyConfig, AttributeService]
})
export class AttributeComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Attribute: Attribute = new Attribute();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _AttributeService: AttributeService,
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
    this._AttributeService.AddAttribute(this.Attribute).subscribe(
      data => {
        this.loading = false;
        if (this.Viewname !== 'edit') {
          this.resetFormdata();
          this.toastyService.success('Data Added Sucessfuly');
        } else {
          this.toastyService.success('Records Updated Sucessfuly');
        }
        this.GetAllAttribute();
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

  GetAllAttribute() {
    // this.isdisabled = true;
    this._AttributeService.GetAllAttributeDetails().subscribe(
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
    this.Attribute.name = '';
    this.Attribute.attributeId = '';
  }

  ngOnInit() {
      this.GetAllAttribute();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Attribute.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._AttributeService.EditAttribute(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Attribute = <Attribute>data;
          this.Attribute.updatedBy = this.user.AdminId;
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
