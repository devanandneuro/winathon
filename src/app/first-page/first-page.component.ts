import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(private loginservice: LoginService) { 
    if(Boolean(localStorage.getItem('isUserLoggedIn'))){
      this.loginservice.LogoutVisible(true);

    }
    if(localStorage.getItem('displayName')==null){
      this.loginservice.DisplayName(this.loginservice.getNid());
    }
  }

  ngOnInit() {
  }

  

}
