import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TransportelementService } from 'src/app/services/element-transport/transportelement.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transport-element',
  templateUrl: './transport-element.component.html',
  styleUrls: ['./transport-element.component.scss']
})
export class TransportElementComponent implements OnInit {
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
    private route: ActivatedRoute,
    private authService: AuthService,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private dataService: TransportelementService
  ) { }

  ngOnInit(): void {
    this.getTypes();
    this.user = this.authService.getUserInfos();
    const element_id = +this.route.snapshot.paramMap.get("id");
    this.dataService.find(element_id).then(
      data => {
        console.log(data)
        this.data = data;
        this.initForm(true, this.dataBase);
      }
    ).catch(
      error => {
        this.translate.get('data.'+error.error.code)
        .subscribe(val => this.notificationService.danger(val));
      }
    )

  }

  getTypes() {
    this.dataService.getTypes().then((response) => {
      this.types = response;
      console.log(this.types);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  initForm(withElement = false, obj) {
    if(withElement) {
      this.createForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]],
        type_id: [this.data.type_id.id, [Validators.required]],
        localisation: [this.data.localisation.id, [Validators.required]],
        phone1: [this.data.phone1.id, [Validators.required]],
        phone2: [this.data.phone2.id, [Validators.required]],
        email: [this.data.email.id, [Validators.required]],        
        function: [this.data.function.id, [Validators.required]],        
        presentation_file: [this.data.presentation_file.id, [Validators.required]]        

      });
    }else {
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
    
    }

    get form() {
      return this.createForm.controls;
    }
  
    onSelectfile(event) {
      this.file = event.target.files[0];
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
      this.dataService.put(this.data.id, formData)
        .then(resp => {
          console.log(resp);
          this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
          this.isSubmitted = false;
          this.router.navigate(['/private/superadmins/add-element']);
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

  

