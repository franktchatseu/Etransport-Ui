import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TransportelementService } from 'src/app/services/element-transport/transportelement.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';


@Component({
  selector: 'app-add-transport-element',
  templateUrl: './add-transport-element.component.html',
  styleUrls: ['./add-transport-element.component.scss']
})
export class AddTransportElementComponent implements OnInit {

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
  
    // language
    translations: any = null;
  
    constructor(
      private router: Router,
      private internationalizationService: InternationalizationService,
      private notificationService: NotificationService,
      private formBuilder: FormBuilder,
      private dataService: TransportelementService
    ) { }
  
    ngOnInit() {
      this.initForm({name: '', description: ''});
  
    }
  
    
    initForm(obj) {
      this.createForm = this.formBuilder.group({
        name: [obj.name, Validators.required],
        description: [obj.description, Validators.required],
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
      this.dataService.post(formData)
        .then(resp => {
          console.log(resp);
          this.notificationService.success(this.translations.Superadmins.DoneWithSuccess);
          this.isSubmitted = false;
          this.initForm({name: '', description: ''});
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
  
    Visualize(value) {
      this.toShow = value;
      window.open(value);
    }
  
    getPartOfcontent(content: string): string {
      return (content.length < 50)? content: (content.substr(0,50) + '...');
    }

}
