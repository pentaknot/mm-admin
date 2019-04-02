import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from 'ng2-toasty';

import { variant, VariantImageRel, ImageList, VariantPageList } from './Models/variant.model';
import { VariantService } from './Services/variant.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css'],
  providers: [ToastyService, ToastyConfig, VariantService]
})
export class VariantComponent implements OnInit {
  user: any;
  varJsonString: any;
  public loading = false;
  position = 'below';

  public test: string;
  Variant: variant = new variant();
  VariantImageRel: VariantImageRel = new VariantImageRel();
  items: Array<any>;
  ID: string;
  Viewname: string;
  Isdisabled: boolean;
  selectedMoment: any;
  products: Array<any>;
  displayPreview: boolean;
  fileUrl: any;
  ImageList: ImageList = new ImageList();
  urls = [];

  // tslint:disable-next-line:max-line-length
  constructor(
    private _router: Router,
    private _VariantService: VariantService,
    private _routeParams: ActivatedRoute,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
    this.toastyConfig.position = 'top-center';

    // this.selectedMoment = new Date();
  }

  onSelectImages(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                   this.VariantImageRel.images = [...this.urls];
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  onImageSubmit() {
    this.loading = true;
    // this.VariantImageRel.variantId = 'C6D725DA-3D53-4712-B8E9-07CCD69C960F';
    // this.
    // this.isdisabled = true;
    this._VariantService.AddVariantImages(this.VariantImageRel).subscribe(
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

  onSubmit() {
    this.loading = true;
    // this.isdisabled = true;
    this._VariantService.AddVariant(this.Variant).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.VariantImageRel.variantId = data.data;
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

  onSelectFile(event) { // called each time file input changes
    this.displayPreview = true;
    if (event.target.files && event.target.files[0]) {
      // this.fileUrl = URL.createObjectURL(event.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);  // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.fileUrl = event.target.result;
        let toArray = this.fileUrl.split(',');
        this.Variant.sampleImage = toArray[1];
      }
      console.log(this.Variant.sampleImage);

    }
  }

  GetAllProduct() {
    // this.isdisabled = true;
    this._VariantService.GetAllProductDetails().subscribe(
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

  resetFormdata() {
    // this.isdisabled = false;
    this.Variant.productId = '';
    this.Variant.colorName = '';
    this.Variant.sampleImage = '';
  }

  ngOnInit() {
    this.GetAllProduct();
    this.varJsonString = localStorage.getItem('SPKey');
    this.user = JSON.parse(this.varJsonString);
    this.ID = this._routeParams.snapshot.params['ID'];
    this.Viewname = this._routeParams.snapshot.params['Viewname'];
    if (this.ID == null) {
      this.Variant.createdBy = this.user.AdminId;
    }
    if (this.Viewname === 'view') {
      this.Isdisabled = true;
    }
    if (this.Viewname === 'edit') {
      this.Isdisabled = false;
    }
    if (this.ID != null) {
      this.loading = true;
      this._VariantService.EditVariant(this.ID).subscribe(
        data => {
          this.loading = false;
          this.Variant = <variant>data;
          this.Variant.updatedBy = this.user.AdminId;
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
