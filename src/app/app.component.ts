import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as FusionCharts from 'fusioncharts';
import { Test } from 'src/app/model/test.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginService } from './service/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
 
  title = 'winathon';
  isActive = true;
  charttype:string;
  datasource=null;
  ifChartSelected=false;
  inputForm : FormGroup;
  isLoggedIn:Boolean=false;
  loginCheck = new Subscription;
  displayCheck = new Subscription;
  usename:string;


  
  testData:Test[]=[{doc_num:1234,task_type:'DD',compl_dt:'12-10-2019'},{doc_num:2346,task_type:'DD',compl_dt:'12-10-2019'},{doc_num:5677,task_type:'DD',compl_dt:'12-10-2019'}];
  products=[{id:1,name:'Managed Wireless Backup'},{id:2,name:'Advanced Managed Router'},{id:3,name:'Advanced Managed Router'}];
  currChart:{id:number,chartType:string,page:string}[]=[];
  charts=[
      {id:1, chartType:'Bar chart',page:'column2d'},
      {id:2, chartType:'Line chart',page:'line'},
      {id:3, chartType:'Comparison chart',page:'mscolumn2d'}];


  constructor(private http: HttpClient,private datePipe : DatePipe,private router: Router,private loginService:LoginService) { 
    this.loginCheck=this.loginService.getLogoutVisible().subscribe(event=>
      {
        this.isLoggedIn=Boolean(localStorage.getItem('isUserLoggedIn'));
        
      }
    );
    this.displayCheck=this.loginService.getDisplayName().subscribe(event=>
      {
        const temp=event;
        this.http.post(
          'http://localhost:8080/displayname',temp,{responseType:'text'}
        ).subscribe(posts => {
          console.log(posts)
          this.usename=posts;
          localStorage.setItem('displayName',this.usename);
        });
        
      }
    );

    if(localStorage.getItem('displayName')!=null){
      this.usename=localStorage.getItem('displayName');
    }
    
    
  }

  onLogout(){
    this.loginService.clearUser();
    this.isLoggedIn=false;
  }

  ngOnInit() {
    this.isLoggedIn=Boolean(localStorage.getItem('isUserLoggedIn'));
  }

  
}
