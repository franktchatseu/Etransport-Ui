import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info1',
  templateUrl: './info1.component.html',
  styleUrls: ['./info1.component.css']
})
export class Info1Component implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}
  message = 'Info personel';
  ngOnInit() {
  }
}
