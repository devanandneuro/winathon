import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  invalidCred:Boolean=false;

  constructor(private http : HttpClient, private loginService:LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username' : new FormControl(null,Validators.required),
      'password' : new FormControl(null,Validators.required),
  });
  }

  onLogin(){
    console.log(JSON.stringify(this.loginForm.value));
    this.loginService.setNid(this.loginForm.value.username);
    this.http.post<Boolean>(
      'http://localhost:8080/credcheck',{
        "username":this.loginForm.value.username,
        "password":this.loginForm.value.password
      }
    ).subscribe(posts => {
      console.log(posts)
      if(posts){
        localStorage.setItem('isUserLoggedIn','true');
        this.loginService.setUser(true);
        this.router.navigate(['/start-page']);
      }
      else{
        localStorage.setItem('isUserLoggedIn','false');
        this.loginService.setUser(false);
        this.invalidCred=true;
      }
      
    });
  }

}
