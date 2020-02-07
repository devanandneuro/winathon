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


      
  dataSource = {
    chart: {
      dateformat: "mm/dd/yyyy",
      caption: "Event Planning Process",
      theme: "fusion",
      canvasborderalpha: "40",
      ganttlinealpha: "50"
    },
    tasks: {
      color: "#5D62B5",
      task: [
        {
          start: "03/07/2018",
          end: "03/17/2018"
        },
        {
          start: "03/14/2018",
          end: "03/28/2018"
        },
        {
          start: "03/15/2018",
          end: "03/31/2018"
        },
        {
          start: "04/02/2018",
          end: "04/12/2018"
        },
        {
          start: "04/12/2018",
          end: "04/30/2018"
        },
        {
          start: "04/20/2018",
          end: "05/06/2018"
        },
        {
          start: "04/30/2018",
          end: "05/10/2018"
        },
        {
          start: "04/30/2018",
          end: "05/25/2018"
        },
        {
          start: "05/04/2018",
          end: "06/05/2018"
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
          label: "Define event goals"
        },
        {
          label: "Source venue options"
        },
        {
          label: "Finalize speaker reach out list"
        },
        {
          label: "Compose sponsorship strategy"
        },
        {
          label: "Reach out to sponsors"
        },
        {
          label: "Create social media campaign"
        },
        {
          label: "Reach out to blogs for backlinks"
        },
        {
          label: "Optimize SEO ranking"
        },
        {
          label: "Publish event lead up vlog series"
        }
      ]
    },
    categories: [
      {
        category: [
          {
            start: "03/05/2018",
            end: "03/31/2018",
            label: "March"
          },
          {
            start: "04/01/2018",
            end: "04/30/2018",
            label: "April"
          },
          {
            start: "05/01/2018",
            end: "05/31/2018",
            label: "May"
          },
          {
            start: "06/01/2018",
            end: "06/10/2018",
            label: "June"
          }
        ]
      },
      {
        category: [
          {
            start: "03/05/2018",
            end: "03/11/2018",
            label: "W 1"
          },
          {
            start: "03/12/2018",
            end: "03/18/2018",
            label: "W 2"
          },
          {
            start: "03/19/2018",
            end: "03/25/2018",
            label: "W 3"
          },
          {
            start: "03/26/2018",
            end: "04/01/2018",
            label: "W 4"
          },
          {
            start: "04/02/2018",
            end: "04/08/2018",
            label: "W 5"
          },
          {
            start: "04/09/2018",
            end: "04/15/2018",
            label: "W 6"
          },
          {
            start: "04/16/2018",
            end: "04/22/2018",
            label: "W 7"
          },
          {
            start: "04/23/2018",
            end: "04/29/2018",
            label: "W 8"
          },
          {
            start: "04/30/2018",
            end: "05/06/2018",
            label: "W 9"
          },
          {
            start: "05/07/2018",
            end: "05/13/2018",
            label: "W 10"
          },
          {
            start: "05/14/2018",
            end: "05/20/2018",
            label: "W 11"
          },
          {
            start: "05/21/2018",
            end: "05/27/2018",
            label: "W 12"
          },
          {
            start: "05/28/2018",
            end: "06/03/2018",
            label: "W 13"
          },
          {
            start: "06/04/2018",
            end: "06/10/2018",
            label: "W 14"
          }
        ]
      }
    ]
  };


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
