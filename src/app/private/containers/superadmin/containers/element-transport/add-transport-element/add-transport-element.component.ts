import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TransportelementService } from 'src/app/services/element-transport/transportelement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-add-transport-element',
  templateUrl: './add-transport-element.component.html',
  styleUrls: ['./add-transport-element.component.scss']
})
export class AddTransportElementComponent implements OnInit {

  data: any = null;
  types: any = null;
  user: any = null;
  errors: any = null;
  handleError: any = null;
  createForm: FormGroup;
  page: any = 1;
  active: any = null;
  detail: any = null;
  toShow: any = null;
  file: File = null;


  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  // language
  translations: any = null;
  dataBase: any = { name: '', description: '', type_id: '', localisation: '', phone1: '', phone2: '', email: '', function: '', presentation_file: '' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dataService: TransportelementService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.initForm({ name: '', description: '', type_id: '', localisation: '', phone1: '', phone2: '', email: '', function: '', presentation_file: '' });
    this.getTypes();
  }

  initForm(obj) {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.createForm = this.formBuilder.group({
      name: [obj.name, Validators.required],
      description: [obj.description, Validators.required],
      type_id: [obj.type_id, Validators.required],
      localisation: [obj.localisation, Validators.required],
      phone1: [obj.phone1],
      phone2: [obj.phone2],
      email: [obj.email,Validators.required],
      function: [obj.function, Validators.required],
      presentation_file: [obj.presentation_file, Validators.required],
    });
  }

  getTypes() {
    this.dataService.getTypes().then((response) => {
      this.types = response;
      console.log(this.types);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSelectfile(event) {
    this.file = event.target.files[0];
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
        if (k === 'presentation_file') { formData.append(k + '', this.file, data[k].value); }
        else { formData.append(k + '', data[k].value); }
      }
    }
    this.dataService.post(formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.isSubmitted = false;
        this.initForm({ name: '', description: '', type_id: '', localisation: '', phone1: '', phone2: '', email: '', function: '', presentation_file: '' });
      //  this.createForm.reset();
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  update() {
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
        if (k === 'presentation_file') { formData.append(k + '', this.file, data[k].value); }
        else { formData.append(k + '', data[k].value); }
      }
    }
    this.dataService.put(this.active.id, formData)
      .then(resp => {
        console.log(resp);
        this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
        this.isSubmitted = false;
        this.initForm({ name: '', description: '', type_id: '', localisation: '', phone1: '', phone2: '', email: '', function: '', presentation_file: '' });
        this.active = null;
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  activate(item) {
    this.detail = null;
    this.active = item;
    this.page = this.data.current_page;
    this.initForm(item);
  }

  showDetails(item: any) {
    this.detail = item;
  }

  cancel() {
    this.active = null;
    this.initForm({color: '', description: ''});
  }


}
