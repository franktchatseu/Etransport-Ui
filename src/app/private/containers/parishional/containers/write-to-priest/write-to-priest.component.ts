import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserUtypeService } from 'src/app/services/person/user-utype.service';
import { NotificationService } from 'src/app/services/notification.service';
import { InternationalizationService } from 'src/app/services/features/internationalization.service';
import { Lang } from 'src/app/services/config/lang';
import { WriteToPriestService } from 'src/app/private/containers/parishional/services/write-to-priest.service';
import { getLocaleDayNames } from '@angular/common';
import { HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-write-to-priest',
  templateUrl: './write-to-priest.component.html',
  styleUrls: ['./write-to-priest.component.css']
})
export class WriteToPriestComponent implements OnInit {

  parishs: any;
  activeParish: any;
  user: any = null;
  priests: Array<any>[];
  priestsPage: Array<any>[];
  discussionPage: Array<any>[];
  discussions: Array<any>[];
  curent_page: number;
  nextpage_url: string;
  previous_url: string;
  currentUserAvatar: any = '';
  priestAvatar: any = '';
  priest: any;
  content: any;
  key: any;
  chatForm: FormGroup;
  discussion_id: any;
  discussion_id2: any;
  classIsActive : string = null;
  applyOnM: any = null;

  // language
  currentLanguage = Lang.currentLang;
  translations: any = null;

  constructor(private authService: AuthService,
              private router: Router,
              private internationalizationService: InternationalizationService,
              private notificationService: NotificationService,
              private WriteToPriestService: WriteToPriestService,
              private formBuilder: FormBuilder,
              private userTypeService: UserUtypeService) {}

  ngOnInit() {
    this.user = this.authService.getUserInfos();
    this.changeLanguage(this.currentLanguage);
    //this.getDiscussions(7);
   this.getUserParishs(this.user.infos.id);
    console.log(this.user);
    this.getpriests();
  this.chatForm = this.formBuilder.group({
      content: ['', Validators.required]
  });
}
 getUserParishs(idUser: number) {
    this.userTypeService.getUserParishs(this.user.infos.id).subscribe((res) => {
      this.parishs = res;
      this.getDefaultParish(res);
    }, (error) => {
      this.notificationService.danger(this.translations.priests.ServerUnavailable);
    });
  }
  getPage(url) {
    if ( url ) {
      this.userTypeService.get(url).subscribe( (res) => {
        this.parishs = res;
      }, (error) => {
        this.notificationService.danger(this.translations.priests.ServerUnavailable);
      });
    } else {
      this.notificationService.warning(this.translations.priests.EndOfListMessage);
    }
  }
  activateParish(parish) {
    this.userTypeService.put(this.user.infos.id, parish.parish_id).then((response) => {
      console.log('result ', response);
      this.getUserParishs(this.user.infos.id);
    }).catch((error) => {
      this.notificationService.danger(this.translations.priests.ServerUnavailable);
    });
  }
  showParishDetails(parish: any) {
    this.activeParish = parish;
  }
  getDefaultParish(parishs: any) {
    for (const parish of parishs.data) {
      if (parish.parish_is_active) {
        this.activeParish = parish;
        return;
      }
    }
  }
  /* Reactive translation */
  changeLanguage(value) {
    this.currentLanguage = value;
    this.internationalizationService.changeLanguage(this.currentLanguage, (res) => { this.translations = res; });
  }
  /**
   * fonction de recupération des prètres
   */
  getpriests(){
    this.WriteToPriestService.Listpriest(1000).subscribe(result => {
      this.priests = result.data;
      this.curent_page = result.current_page;
      this.nextpage_url = result.next_page_url;
      this.previous_url = result.prev_page_url;
      this.getCurentUserAvatar();
    }, (error) => {
      this.notificationService.danger(this.translations.priests.AProbleOccured);
    });
  }
  creatDiscussion(priest_id: number){
    this.applyOnM = priest_id;
    const formData = new FormData();
    formData.append('user_utype1_id', '' + this.user.infos.id);
    formData.append('user_utype2_id', '' + priest_id);
    if (priest_id) {
      this.WriteToPriestService.openDiscussion(formData).subscribe( (res) => {
        this.getDiscussions(res[0].id);
      }, (error) => {
        this.notificationService.danger(this.translations.priests.AProbleOccured);
      });
    } else {
      this.notificationService.warning(this.translations.priests.ElementSelectedNotAvailable);   
    }
    this.getAvatar(priest_id);
  }
  getAvatar( user_id ){
    if ( user_id ) {
      this.WriteToPriestService.getPriest(user_id).subscribe( (res) => {
      this.priest = res;
      this.priestAvatar = res.avatar;
      }, (error) => {
        this.notificationService.danger(this.translations.priests.AProbleOccured);
      });
    } else {
      this.notificationService.warning(this.translations.priests.ElementSelectedNotAvailable);   
  }
  }
  getDiscussions(discussion_id: number) {
    if (discussion_id) {
      this.discussion_id = discussion_id;
      this.WriteToPriestService.getDiscussion(discussion_id).subscribe( (res) => {
        this.discussionPage = res;
        this.discussions = res.data;
      }, (error) => {
        this.notificationService.danger(this.translations.priests.AProbleOccured);
      });
    } else {
      this.notificationService.warning(this.translations.priests.ElementSelectedNotAvailable);
    }
  }
get form() {
  return this.chatForm.controls;
}
onSubmit() {
  const formData = new FormData();
  formData.append('content', '' + this.form.content.value);
  formData.append('chat_discussion_id', ''+ this.discussion_id);
  formData.append('sender_id', ''+ this.user.infos.id);
  this.WriteToPriestService.sendMessage(formData)
    .subscribe(resp => {
      this.notificationService.success(this.translations.priests.MessageSendSuccessfully);
      this.chatForm.reset();
    },(error) => {
      this.notificationService.danger(this.translations.priests.AProbleOccured);
    });
    this.getDiscussions(this.discussion_id);
}
getCurentUserAvatar(){
  if(this.user.infos.avatar) {
    this.currentUserAvatar = JSON.parse(this.user.infos.avatar).images;
  }
  if(this.priestAvatar){
    this.priestAvatar = JSON.parse(this.priestAvatar).images;
  }
}
getPriestAvatar(avatar : string){
  if(avatar){
    return JSON.parse(avatar).images;
  }
}
}
