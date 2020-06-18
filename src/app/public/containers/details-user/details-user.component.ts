import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from 'src/app/services/person/registration.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

  user;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;


  constructor(
    private registrationservice: RegistrationService,
    private notificationService: NotificationService,
    private internationalizationService: InternationalizationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const user_id = +this.route.snapshot.paramMap.get("id");
    this.registrationservice.find(user_id).then(
      data => {
        this.user = data;
        console.log(this.user)
      }
    ).catch(
      error => {
        this.translations.get('Role.'+error.error.code)
        .subscribe(val => this.notificationService.danger(val));
        this.router.navigate(['/public/list-users'])
      }
    )

  }

  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }

  getImage(url){
    url='http://localhost:8000/'+JSON.parse(url);
    return url;
  }
}
