import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FusionCharts from 'fusioncharts';
import { Test } from 'src/app/model/test.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isActive = true;
  charttype:string;
  datasource=null;
  ifChartSelected=false;
  inputForm : FormGroup;
  testData:Test[]=[{doc_num:1234,task_type:'DD',compl_dt:'12-10-2019'},{doc_num:2346,task_type:'DD',compl_dt:'12-10-2019'},{doc_num:5677,task_type:'DD',compl_dt:'12-10-2019'}];
  products=[{id:1,name:'Managed Wireless Backup'},{id:2,name:'Advanced Managed Router'},{id:3,name:'Advanced Managed Router'}];
  currChart:{id:number,chartType:string,page:string}[]=[];
  charts=[
      {id:1, chartType:'Bar chart',page:'column2d'},
      {id:2, chartType:'Line chart',page:'line'},
      {id:3, chartType:'Comparison chart',page:'mscolumn2d'}];


  constructor(private http: HttpClient,private datePipe : DatePipe,private router: Router) { 
    
  }

  ngOnInit() {
    //this.fetchData();
    this.inputForm = new FormGroup({
      'spec_grp_id' : new FormControl(null,Validators.required),
      'from_time' : new FormControl(null,Validators.required),
      'to_time' : new FormControl(null,Validators.required)
  });
  }


  public onChange(event): void {
    this.ifChartSelected=true;
    this.currChart = this.charts.filter(element=>element.id===event.value);
    //console.log(this.currChart[0].page);
    //this.router.navigate(['/app-'+this.currChart[0].page]);
    this.charttype=this.currChart[0].page;
    this.datasource={
      "chart": {
          "caption": "SDWAN Product",
          "subcaption": "Last 3 months",
          "xaxisname": "Months",
          "yaxisname": "Orders",
          "theme": "fusion",
          "showValues": "1",
          "lineThickness": "2",
      },
      "data": [
        {
          "label": "October",
          "value": "154",
          "link": "newchart-xml-oct"
      },
      {
          "label": "November",
          "value": "123",
          "link": "newchart-xml-nov"
      },
      {
          "label": "December",
          "value": "143",
          "link": "newchart-xml-dec"
      }
      ]
  }
  }

  onFormSubmit(){
    console.log('spec_grp_id '+this.inputForm.value.spec_grp_id);
    console.log('from_time '+this.datePipe.transform(this.inputForm.value.from_time, 'MM/dd/yyyy'));
    console.log('to_time '+this.datePipe.transform(this.inputForm.value.to_time, 'MM/dd/yyyy'));
  }

  private fetchData()
  {
    this.http
    .post<Test[] >(
      'http://localhost:8080/new_procedure',
      {
        'spec_grp_id':16973,
        'from_time':'06/01/2019',
        'to_time':'12/01/2019'
      }
    ).subscribe(posts => {
      console.log(posts);
      this.testData = posts;
    });
  }
}
