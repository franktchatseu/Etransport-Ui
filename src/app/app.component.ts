import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-church';
  message = '';
  translations: any = null;
  subscription: Subscription;
  currentLanguage = 'fr';
  val = 0;

  constructor(
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    // translate.setDefaultLang(this.currentLanguage);
    // this.subscription = this.messageService.getMessage().subscribe(message => {
    //   const data = JSON.parse(message.text);
    //   if (data.code === 'change-lang') {
    //     this.currentLanguage = data.data;
    //     this.translate.use(this.currentLanguage);
    //     this.messageService.sendMessage(JSON.stringify({code: 'chang-lang', data: this.currentLanguage}));
    //     this.translate.getTranslation(this.currentLanguage).subscribe((res: any) => {
    //       this.translations = res;
    //       this.messageService.sendMessage(JSON.stringify({code: 'new-translation', data: res}));
    //     });
    //   } else if (data.code === 'get-translation') {
    //     this.messageService.sendMessage(JSON.stringify({code: 'new-translation', data: this.translations}));
    //   }
    //   // soit on demande à changer la langue
    //   // ensuite on notifie tout les composants chargés
    //   // soit on demande la traduction active
    // });
  }

  updateTranslationToAll() {
    const lang = this.currentLanguage;
    this.translate.getTranslation(lang).subscribe((res: any) => {
      this.translations = res;
      // this.messageService.sendMessage(JSON.stringify({code: 'new-translation', data: res}));
    });
  }

  ngOnInit() {
    this.translate.setDefaultLang(this.currentLanguage);
    this.updateTranslationToAll();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    // this.messageService.sendMessage(JSON.stringify({code: 'chang-lang', data: lang}));
  }

  // changeLang(index) {
  //   const langs = ['fr', 'en'];
  //   const lang = langs[++index % 2];
  //   this.messageService.sendMessage(JSON.stringify({code: 'change-lang', data: lang}));
  // }

  // this.messageService.sendMessage(JSON.stringify({code: '', data: null}));
}

export function TRANSLATE(str: string) {
  return str;
}
