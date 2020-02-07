import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as FusionCharts from 'fusioncharts';
import { Test } from 'src/app/model/test.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginService } from './service/login.service';
import { Subscription } from 'rxjs';


const data = {
  chart: {
    dateformat: "mm/dd/yyyy",
    caption: "Project Schedule for Operation BigHead",
    subcaption: "",
    theme: "fusion",
    canvasborderalpha: "40",
    ganttlinealpha: "50",
    plottooltext: "$PercentComplete complete"
  },
  tasks: {
    color: "#008000",
    task: [
      {
        start: "01/01/2016",
        end: "01/06/2016",
        percentcomplete: "90",
        height: "27%",
        toppadding: "32%"
      },
      {
        start: "01/05/2016",
        end: "01/18/2016",
        percentcomplete: "70",
        height: "27%",
        toppadding: "32%"
      },
      {
        start: "01/15/2016",
        end: "01/24/2016",
        percentcomplete: "85",
        height: "27%",
        toppadding: "32%"
      },
      {
        start: "01/28/2016",
        end: "02/07/2017",
        percentcomplete: "80",
        height: "27%",
        toppadding: "32%"
      }
    ]
  },
  processes: {
    headertext: "Task",
    headeralign: "left",
    fontsize: "14",
    isbold: "0",
    align: "left",
    process: [
      {
        label: "Finalize and Approve Plan"
      },
      {
        label: "Prerpare Drawings"
      },
      {
        label: "Analyze Potential Market"
      },
      {
        label: "Write Specification"
      }
    ]
  },
  categories: [
    {
      category: [
        {
          start: "01/01/2016",
          end: "01/10/2016",
          label: "1-10 days"
        },
        {
          start: "01/11/2016",
          end: "01/20/2016",
          label: "11-20 days"
        },
        {
          start: "01/21/2016",
          end: "01/30/2016",
          label: "21-30 days"
        },
        {
          start: "02/01/2016",
          end: "02/10/2016",
          label: "31-40 days"
        }
      ]
    }
  ]
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent{


  width = 600;
  height = 400;
  type = "gantt";
  dataFormat = "json";
  dataSource = data;
 
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
