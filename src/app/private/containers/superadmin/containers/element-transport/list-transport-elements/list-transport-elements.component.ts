import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Lang } from 'src/app/services/config/lang';
import { TransportelementService } from "src/app/services/element-transport/transportelement.service";



@Component({
  selector: 'app-list-transport-elements',
  templateUrl: './list-transport-elements.component.html',
  styleUrls: ['./list-transport-elements.component.scss']
})
export class ListTransportElementsComponent implements OnInit {




  data: any = null;
  errors: any = null;
  handleError: any = null;
  page: any = 1;
  active: any = null;
  detail: any = null;
  toShow: any = null;

  loading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(
    private router: Router,
    private internationalizationService: InternationalizationService,
    private notificationService: NotificationService,
    private dataService: TransportelementService
  ) { }

  ngOnInit() {
    this.changeLanguage(this.currentLanguage);
    this.gets(this.page);

  }



  gets(page) {
    this.dataService.gets(page).then((response) => {
      this.data = response;
      console.log(this.data);
    }).catch((error) => {
      this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
    });
  }

  getPage(url) {
    if (url) {
      this.dataService.get(url).then((res) => {
        this.data = res;
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.ServerUnavailable);
      });
    } else {
      this.notificationService.warning(this.translations.Superadmins.EndOfListMessage);
    }
  }


  delete(item) {
    const confirm = window.confirm(this.translations.Superadmins.ReallyDelete);
    if (confirm) {
      this.dataService.delete(item.id).then((res) => {
        this.notificationService.success(this.translations.Superadmins.DeleteWithSuccess);
        this.gets(this.page);
      }).catch((error) => {
        this.notificationService.danger(this.translations.Superadmins.DeleteWithError);
      });
    }
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
  

  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }


}




