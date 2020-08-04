import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TransportelementService } from 'src/app/services/element-transport/transportelement.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transport-element',
  templateUrl: './transport-element.component.html',
  styleUrls: ['./transport-element.component.scss']
})
export class TransportElementComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;
  @ViewChild('fileInputAvatar')
  fileInputAvatar: ElementRef;
  file: any
  fileAvatar: any;
  fileInformation: any
  fileInformationAvatar: any


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


  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  // language
  translations: any = null;
  dataBase: any = { name: '', description: '', type_id: '', localisation: '', phone1: '', phone2: '', email: '', function: '', presentation_file: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private dataService: TransportelementService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUserInfos();
    this.initForm();
    this.getTypes();
    const element_id = +this.route.snapshot.paramMap.get("id");
    this.dataService.find(element_id).then(
      data => {
        console.log(data)
        this.data = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('data.' + error.error.code)
          .subscribe(val => this.notificationService.danger(val));
      }
    )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
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

  initForm(withElement = false) {
    if (withElement) {
      this.createForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
        type_id: [this.data.type_id, [Validators.required]],
        localisation: [this.data.localisation, [Validators.required]],
        description: [this.data.description, [Validators.required]],
        phone1: [this.data.phone1, [Validators.required]],
        phone2: [this.data.phone2, [Validators.required]],
        email: [this.data.email, [Validators.required]],
        function: [this.data.function, [Validators.required]],
        presentation_file: [this.data.presentation_file, [Validators.required]]
      });
    } else {
      this.createForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        type_id: ['', Validators.required],
        localisation: ['', Validators.required],
        phone1: [''],
        phone2: [''],
        email: ['',Validators.required],
        function: ['', Validators.required],
        presentation_file: ['', Validators.required],
      });
    }

  }

  get form() {
    return this.createForm.controls;
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.createForm.get('presentation_file').setValue(this.file.name); (1)
      this.fileInformation = null;
    }
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
    formData.append('name', '' + this.form.name.value);
    formData.append('type_id', '' + this.form.type_id.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('localisation', '' + this.form.localisation.value);
    formData.append('phone1', '' + this.form.phone1.value);
    formData.append('phone2', '' + this.form.phone2.value);
    formData.append('email', '' + this.form.email.value);
    formData.append('function', '' + this.form.function.value);
    formData.append('presentation_file', this.file);

    this.dataService.put(this.data.id, formData)
      .then(resp => {
        console.log(resp);
        this.openSnackBar("Mise a jour Reussi", "element de transport");
        this.isSubmitted = false;
        this.router.navigate(['/private/superadmins/list-element']);
      })
      .catch(err => {
        this.errors = err.error.errors;
        this.handleError = err.error.errors;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

}



