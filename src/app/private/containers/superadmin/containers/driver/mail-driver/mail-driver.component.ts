import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DriverService } from '../../../services/driver.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mail-driver',
  templateUrl: './mail-driver.component.html',
  styleUrls: ['./mail-driver.component.scss']
})
export class MailDriverComponent implements OnInit {

  drivers: any;
  translations: any = null;
  data: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  page: any = 1;
  active: any = null;
  detail: any = null;
  toShow: any = null;

  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  dataBase: any = { email: '', sms: '', object: ''};
  constructor(
    private router: Router,
     private internationalizationService: InternationalizationService,
     private notificationService: NotificationService,
     private dataService: DriverService,
     private notifService: NotificationService,
     private translate: TranslateService,
     private formBuilder: FormBuilder,
     private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getDriver();
    this.initForm({email: localStorage.getItem('driver_email'), sms: '', object:''});

   }

   initForm(obj) {
    this.createForm = this.formBuilder.group({
      email: [obj.email, Validators.required],
      sms: [obj.sms, Validators.required],
      object: [obj.object],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  create() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    if (this.form.invalid) {
      this.notificationService.danger(this.translations.Superadmins.AllFieldsAreRequired);
    }

    this.isLoading = true;
    const formData = new FormData();
    const data = this.form;
    for (const k in data) {
      if (k) {
        formData.append(k + '', data[k].value);
      }
    }
    this.dataService.mailDriver(formData)
      .then(resp => {
        console.log(resp);
        this.isSubmitted = false;
        this.openSnackBar("Message Envoye avec success", "Chauffeur");
        this.initForm({email: localStorage.getItem('driver_email'), sms: '', object:''});
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
          this.isLoading = false;
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

getDriver(){
  this.dataService.getDrivers().subscribe((res) => {
    this.drivers = res;
    console.log(this.drivers)
  }, (error) => {
    this.notificationService.danger(this.translations.Drivers.NoDriver);
  });
}

}
