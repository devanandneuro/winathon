import { Observable,of as observableOf, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService{
  private user : boolean=Boolean(localStorage.getItem('isUserLoggedIn'));
  private logoutVisible = new Subject<Boolean>();
  private nameDisplay = new Subject<string>();
  private nid;


  constructor(private router: Router){

  }

getUser(){
    return this.user;
}

getLogoutVisible() : Observable<Boolean>{
    return this.logoutVisible.asObservable();
}

LogoutVisible(event : Boolean){
    this.logoutVisible.next(event);
}

getDisplayName() : Observable<string>{
    return this.nameDisplay.asObservable();
}

DisplayName(event : string){
    this.nameDisplay.next(event);
}

getNid() : string{
    return this.nid;
}

setNid(event : string){
    this.nid=event;
}

clearUser(){
    this.user=null;
    this.router.navigate(['/app-login']);
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('displayName');
}

setUser(dom : boolean){
    if(localStorage.getItem('isUserLoggedIn')==null)
    {
        this.user=dom;
    }
    else{
        this.user=Boolean(localStorage.getItem('isUserLoggedIn'));
    }
}


}