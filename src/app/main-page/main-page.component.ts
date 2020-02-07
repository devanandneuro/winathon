import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import * as FusionCharts from 'fusioncharts';
import { Test } from 'src/app/model/test.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { element } from '@angular/core/src/render3';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit  {

  isActive = true;
  prodName:string;
  datasource=null;
  ifChartSelected=false;
  inputForm : FormGroup;
  products=[{id:1,name:'SD-WAN'},{id:2,name:'MPLS VPN'}];
  currProd:{id:number,name:string}[]=[];
  barData:{month:string,value:number}[]=[];
  currEndDate:{id:number,displayDate:string,actualDate:string}[]=[];
  finEndDate:{id:number,displayDate:string,actualDate:string}[]=[];
  finStartDate:{id:number,displayDate:string,actualDate:string}[]=[];
  inLoop:{id:number,displayDate:string,actualDate:string}[]=[];
  pieData:{label:string, value:string}[]=[];
  inLoopCurrDate: string;
  inLoopNextDate: string;
  curMonth: string;
  mainData:Data[]=[];
  tempData:Data[]=[];
  
  bardatasource=null;
  piedatasource=null;
  ganttdatasource=null;

  temp=0;
  count=0;

  totalCount=0;
  successCount=0;
  pecentage=0.0;

  ifFormFilled=false;
  isSpinnerOn=false;
  

  durDropDown=[{id:1, displayDate:'JAN-2018', actualDate:'2018-01-01'},
  {id:2, displayDate:'FEB-2018', actualDate:'2018-02-01'},
  {id:3, displayDate:'MAR-2018', actualDate:'2018-03-01'},
  {id:4, displayDate:'APR-2018', actualDate:'2018-04-01'},
  {id:5, displayDate:'MAY-2018', actualDate:'2018-05-01'},
  {id:6, displayDate:'JUN-2018', actualDate:'2018-06-01'},
  {id:7, displayDate:'JUL-2018', actualDate:'2018-07-01'},
  {id:8, displayDate:'AUG-2018', actualDate:'2018-08-01'},
  {id:9, displayDate:'SEP-2018', actualDate:'2018-09-01'},
  {id:10, displayDate:'OCT-2018', actualDate:'2018-10-01'},
  {id:11, displayDate:'NOV-2018', actualDate:'2018-11-01'},
  {id:12, displayDate:'DEC-2018', actualDate:'2018-12-01'},
  {id:13, displayDate:'JAN-2019', actualDate:'2019-01-01'},
  {id:14, displayDate:'FEB-2019', actualDate:'2019-02-01'},
  {id:15, displayDate:'MAR-2019', actualDate:'2019-03-01'},
  {id:16, displayDate:'APR-2019', actualDate:'2019-04-01'},
  {id:17, displayDate:'MAY-2019', actualDate:'2019-05-01'},
  {id:18, displayDate:'JUN-2019', actualDate:'2019-06-01'},
  {id:19, displayDate:'JUL-2019', actualDate:'2019-07-01'},
  {id:20, displayDate:'AUG-2019', actualDate:'2019-08-01'},
  {id:21, displayDate:'SEP-2019', actualDate:'2019-09-01'},
  {id:22, displayDate:'OCT-2019', actualDate:'2019-10-01'},
  {id:23, displayDate:'NOV-2019', actualDate:'2019-11-01'},
  {id:24, displayDate:'DEC-2019', actualDate:'2019-12-01'},
  {id:25, displayDate:'JAN-2020', actualDate:'2020-01-01'},
  {id:26, displayDate:'FEB-2020', actualDate:'2020-02-01'}];    



  constructor(private http: HttpClient,private datePipe : DatePipe,private router: Router) { 

    
    
  }

  ngOnInit() {
    this.inputForm = new FormGroup({
      'spec_grp_id' : new FormControl(null,Validators.required),
      'from_time' : new FormControl(null,Validators.required),
      'to_time' : new FormControl(null,Validators.required)
  });
  }



  public onChange(event): void {
    this.ifChartSelected=true;
    this.currEndDate = this.durDropDown.filter(element=>element.id>event.value);
    //console.log(this.currChart[0].page);
    //this.router.navigate(['/app-'+this.currChart[0].page]);

    
  }

  onFormSubmit(){
    this.isSpinnerOn=true;
    this.finStartDate = this.durDropDown.filter(element=>element.id===this.inputForm.value.from_time);
    this.finEndDate = this.durDropDown.filter(element=>element.id===this.inputForm.value.to_time);
    this.currProd=this.products.filter(element=>element.id===this.inputForm.value.spec_grp_id);
    this.prodName=this.currProd[0].name;
    this.http.get<Test[] >(
      'http://localhost:8080/view_calling'
    ).subscribe(posts => {
      this.isSpinnerOn=false;
      this.ifFormFilled=true;
      console.log(posts);
      this.mainData=posts;
      this.temp=this.inputForm.value.from_time;

      while (this.temp<=this.inputForm.value.to_time)
      {
        this.inLoop=this.durDropDown.filter(element=>element.id===this.temp);
        this.inLoopCurrDate=this.inLoop[0].actualDate;
        this.curMonth=this.inLoop[0].displayDate;
        this.inLoop=this.durDropDown.filter(element=>element.id===(this.temp+1));
        this.inLoopNextDate=this.inLoop[0].actualDate;
        this.tempData=this.mainData.filter(element=>element.comp_dt>=this.inLoopCurrDate && element.comp_dt<this.inLoopNextDate && element.task_type==='DD')
        this.barData[this.count]={month:this.curMonth,value:this.tempData.length};
        this.count=this.count+1;
        this.temp=this.temp+1;
      }

      //Bar chart data source
      this.bardatasource={
        "chart": {
            "caption": "Order completion per month",
            "subcaption": this.prodName,
            "xaxisname": "Months",
            "yaxisname": "Orders",
            "theme": "fusion",
            "showValues": "1",
            "lineThickness": "2",
        },
        "data": this.barData
        };

        this.inLoop=this.durDropDown.filter(element=>element.id===this.inputForm.value.from_time);
        this.inLoopCurrDate=this.inLoop[0].actualDate;
        this.inLoop=this.durDropDown.filter(element=>element.id===this.inputForm.value.to_time);
        this.inLoopNextDate=this.inLoop[0].actualDate;
        this.tempData=this.mainData.filter(element=>element.comp_dt>=this.inLoopCurrDate && element.comp_dt<this.inLoopNextDate && element.task_type==='DD');
        this.totalCount=this.tempData.length;
        console.log(this.totalCount);
        this.tempData=this.mainData.filter(element=>element.comp_dt>=this.inLoopCurrDate && element.comp_dt<this.inLoopNextDate && element.task_type==='DD' && element.desired_due_date>=element.task_act_comp_date);
        this.successCount=this.tempData.length;
        console.log(this.successCount);
        this.pecentage=(this.successCount/this.totalCount)*100;
        console.log(this.pecentage);
        this.pieData=[{
                        label: "Met desired due date",
                        value: String(this.pecentage)
                      },
                      {
                        label: "Failed to met desired due date",
                        value: String(100-this.pecentage)
                      }];

        //Pie chart data source
        this.piedatasource={
          "chart": {
            "caption": "DD completion %",
            "subcaption": this.prodName,
            " showpercentvalues": "1",
            "aligncaptionwithcanvas": "0",
            "captionpadding": "0",
            "decimals": "1",
            "theme": "fusion"
          },
          "data": this.pieData
        };

        
    
    });
  }
}


        
          

   


    