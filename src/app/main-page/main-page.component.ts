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


    this.ganttdatasource={
      "chart": {
          "caption": "Construction management of a new store in Denver",
          "subcaption": "Planned vs Actual",
          "dateformat": "dd/mm/yyyy",
          "outputdateformat": "ddds mns yy",
          "ganttwidthpercent": "60",
          "ganttPaneDuration": "40",
          "ganttPaneDurationUnit": "d",
          "plottooltext": "$processName{br} $label starting date $start{br}$label ending date $end",
          "legendBorderAlpha": "0",
          "flatScrollBars": "1",
          "gridbordercolor": "#333333",
          "gridborderalpha": "20",
          "slackFillColor": "#e44a00",
          "taskBarFillMix": "light+0",
          "theme": "fusion"
      },
      "categories": [
          {
              "bgcolor": "#999999",
              "category": [
                  {
                      "start": "1/4/2014",
                      "end": "30/6/2014",
                      "label": "Months",
                      "align": "middle",
                      "fontcolor": "#ffffff",
                      "fontsize": "12"
                  }
              ]
          },
          {
              "bgcolor": "#999999",
              "align": "middle",
              "fontcolor": "#ffffff",
              "fontsize": "12",
              "category": [
                  {
                      "start": "1/4/2014",
                      "end": "30/4/2014",
                      "label": "April"
                  },
                  {
                      "start": "1/5/2014",
                      "end": "31/5/2014",
                      "label": "May"
                  },
                  {
                      "start": "1/6/2014",
                      "end": "30/6/2014",
                      "label": "June"
                  }
              ]
          },
          {
              "bgcolor": "#ffffff",
              "fontcolor": "#333333",
              "fontsize": "11",
              "align": "center",
              "category": [
                  {
                      "start": "1/4/2014",
                      "end": "5/4/2014",
                      "label": "Week 1"
                  },
                  {
                      "start": "6/4/2014",
                      "end": "12/4/2014",
                      "label": "Week 2"
                  },
                  {
                      "start": "13/4/2014",
                      "end": "19/4/2014",
                      "label": "Week 3"
                  },
                  {
                      "start": "20/4/2014",
                      "end": "26/4/2014",
                      "label": "Week 4"
                  },
                  {
                      "start": "27/4/2014",
                      "end": "3/5/2014",
                      "label": "Week 5"
                  },
                  {
                      "start": "4/5/2014",
                      "end": "10/5/2014",
                      "label": "Week 6"
                  },
                  {
                      "start": "11/5/2014",
                      "end": "17/5/2014",
                      "label": "Week 7"
                  },
                  {
                      "start": "18/5/2014",
                      "end": "24/5/2014",
                      "label": "Week 8"
                  },
                  {
                      "start": "25/5/2014",
                      "end": "31/5/2014",
                      "label": "Week 9"
                  },
                  {
                      "start": "1/6/2014",
                      "end": "7/6/2014",
                      "label": "Week 10"
                  },
                  {
                      "start": "8/6/2014",
                      "end": "14/6/2014",
                      "label": "Week 11"
                  },
                  {
                      "start": "15/6/2014",
                      "end": "21/6/2014",
                      "label": "Week 12"
                  },
                  {
                      "start": "22/6/2014",
                      "end": "28/6/2014",
                      "label": "Week 13"
                  }
              ]
          }
      ],
      "processes": {
          "headertext": "Task",
          "fontcolor": "#000000",
          "fontsize": "11",
          "isanimated": "1",
          "bgcolor": "#6baa01",
          "headervalign": "bottom",
          "headeralign": "left",
          "headerbgcolor": "#999999",
          "headerfontcolor": "#ffffff",
          "headerfontsize": "12",
          "align": "left",
          "isbold": "1",
          "bgalpha": "25",
          "process": [
              {
                  "label": "Clear site",
                  "id": "1"
              },
              {
                  "label": "Excavate Foundation",
                  "id": "2",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Concrete Foundation",
                  "id": "3",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Footing to DPC",
                  "id": "4",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Drainage Services",
                  "id": "5",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Backfill",
                  "id": "6",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Ground Floor",
                  "id": "7"
              },
              {
                  "label": "Walls on First Floor",
                  "id": "8"
              },
              {
                  "label": "First Floor Carcass",
                  "id": "9",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "First Floor Deck",
                  "id": "10",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Roof Structure",
                  "id": "11"
              },
              {
                  "label": "Roof Covering",
                  "id": "12"
              },
              {
                  "label": "Rainwater Gear",
                  "id": "13"
              },
              {
                  "label": "Windows",
                  "id": "14"
              },
              {
                  "label": "External Doors",
                  "id": "15"
              },
              {
                  "label": "Connect Electricity",
                  "id": "16"
              },
              {
                  "label": "Connect Water Supply",
                  "id": "17",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Install Air Conditioning",
                  "id": "18",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Interior Decoration",
                  "id": "19",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Fencing And signs",
                  "id": "20"
              },
              {
                  "label": "Exterior Decoration",
                  "id": "21",
                  "hoverBandColor": "#e44a00",
                  "hoverBandAlpha": "40"
              },
              {
                  "label": "Setup racks",
                  "id": "22"
              }
          ]
      },
      "datatable": {
          "showprocessname": "1",
          "namealign": "left",
          "fontcolor": "#000000",
          "fontsize": "10",
          "valign": "right",
          "align": "center",
          "headervalign": "bottom",
          "headeralign": "center",
          "headerbgcolor": "#999999",
          "headerfontcolor": "#ffffff",
          "headerfontsize": "12",
          "datacolumn": [
              {
                  "bgcolor": "#eeeeee",
                  "headertext": "Actual{br}Start{br}Date",
                  "text": [
                      {
                          "label": "9/4/2014"
                      },
                      {
                          "label": "13/4/2014"
                      },
                      {
                          "label": "26/4/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "4/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "6/5/2014"
                      },
                      {
                          "label": "5/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "11/5/2014"
                      },
                      {
                          "label": "16/5/2014"
                      },
                      {
                          "label": "16/5/2014"
                      },
                      {
                          "label": "21/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "25/5/2014"
                      },
                      {
                          "label": "28/5/2014"
                      },
                      {
                          "label": "4/6/2014"
                      },
                      {
                          "label": "4/6/2014"
                      },
                      {
                          "label": "4/6/2014"
                      },
                      {
                          "label": "2/6/2014"
                      },
                      {
                          "label": "5/6/2014"
                      },
                      {
                          "label": "18/6/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "16/6/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "23/6/2014"
                      },
                      {
                          "label": "18/6/2014"
                      },
                      {
                          "label": "25/6/2014"
                      }
                  ]
              },
              {
                  "bgcolor": "#eeeeee",
                  "headertext": "Actual{br}End{br}Date",
                  "text": [
                      {
                          "label": "12/4/2014"
                      },
                      {
                          "label": "25/4/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "4/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "10/5/2014"
                      },
                      {
                          "label": "10/5/2014"
                      },
                      {
                          "label": "11/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "14/5/2014"
                      },
                      {
                          "label": "19/5/2014"
                      },
                      {
                          "label": "21/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "24/5/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "27/5/2014"
                      },
                      {
                          "label": "1/6/2014"
                      },
                      {
                          "label": "6/6/2014"
                      },
                      {
                          "label": "4/6/2014"
                      },
                      {
                          "label": "4/6/2014"
                      },
                      {
                          "label": "7/6/2014"
                      },
                      {
                          "label": "17/6/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "20/6/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "23/6/2014"
                      },
                      {
                          "label": "23/6/2014"
                      },
                      {
                          "label": "23/6/2014",
                          "bgcolor": "#e44a00",
                          "bgAlpha": "40"
                      },
                      {
                          "label": "28/6/2014"
                      }
                  ]
              }
          ]
      },
      "tasks": {
          "task": [
              {
                  "label": "Planned",
                  "processid": "1",
                  "start": "9/4/2014",
                  "end": "12/4/2014",
                  "id": "1-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "1",
                  "start": "9/4/2014",
                  "end": "12/4/2014",
                  "id": "1",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "2",
                  "start": "13/4/2014",
                  "end": "23/4/2014",
                  "id": "2-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "2",
                  "start": "13/4/2014",
                  "end": "25/4/2014",
                  "id": "2",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "2",
                  "start": "23/4/2014",
                  "end": "25/4/2014",
                  "id": "2-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 2 days."
              },
              {
                  "label": "Planned",
                  "processid": "3",
                  "start": "23/4/2014",
                  "end": "30/4/2014",
                  "id": "3-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "3",
                  "start": "26/4/2014",
                  "end": "4/5/2014",
                  "id": "3",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "3",
                  "start": "3/5/2014",
                  "end": "4/5/2014",
                  "id": "3-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 1 days."
              },
              {
                  "label": "Planned",
                  "processid": "4",
                  "start": "3/5/2014",
                  "end": "10/5/2014",
                  "id": "4-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "4",
                  "start": "4/5/2014",
                  "end": "10/5/2014",
                  "id": "4",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "5",
                  "start": "6/5/2014",
                  "end": "11/5/2014",
                  "id": "5-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "5",
                  "start": "6/5/2014",
                  "end": "10/5/2014",
                  "id": "5",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "6",
                  "start": "4/5/2014",
                  "end": "7/5/2014",
                  "id": "6-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "6",
                  "start": "5/5/2014",
                  "end": "11/5/2014",
                  "id": "6",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "6",
                  "start": "7/5/2014",
                  "end": "11/5/2014",
                  "id": "6-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 4 days."
              },
              {
                  "label": "Planned",
                  "processid": "7",
                  "start": "11/5/2014",
                  "end": "14/5/2014",
                  "id": "7-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "7",
                  "start": "11/5/2014",
                  "end": "14/5/2014",
                  "id": "7",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "8",
                  "start": "16/5/2014",
                  "end": "19/5/2014",
                  "id": "8-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "8",
                  "start": "16/5/2014",
                  "end": "19/5/2014",
                  "id": "8",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "9",
                  "start": "16/5/2014",
                  "end": "18/5/2014",
                  "id": "9-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "9",
                  "start": "16/5/2014",
                  "end": "21/5/2014",
                  "id": "9",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "9",
                  "start": "18/5/2014",
                  "end": "21/5/2014",
                  "id": "9-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 3 days."
              },
              {
                  "label": "Planned",
                  "processid": "10",
                  "start": "20/5/2014",
                  "end": "23/5/2014",
                  "id": "10-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "10",
                  "start": "21/5/2014",
                  "end": "24/5/2014",
                  "id": "10",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "10",
                  "start": "23/5/2014",
                  "end": "24/5/2014",
                  "id": "10-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 1 days."
              },
              {
                  "label": "Planned",
                  "processid": "11",
                  "start": "25/5/2014",
                  "end": "27/5/2014",
                  "id": "11-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "11",
                  "start": "25/5/2014",
                  "end": "27/5/2014",
                  "id": "11",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "12",
                  "start": "28/5/2014",
                  "end": "1/6/2014",
                  "id": "12-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "12",
                  "start": "28/5/2014",
                  "end": "1/6/2014",
                  "id": "12",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "13",
                  "start": "4/6/2014",
                  "end": "6/6/2014",
                  "id": "13-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "13",
                  "start": "4/6/2014",
                  "end": "6/6/2014",
                  "id": "13",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "14",
                  "start": "4/6/2014",
                  "end": "4/6/2014",
                  "id": "14-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "14",
                  "start": "4/6/2014",
                  "end": "4/6/2014",
                  "id": "14",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "15",
                  "start": "4/6/2014",
                  "end": "4/6/2014",
                  "id": "15-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "15",
                  "start": "4/6/2014",
                  "end": "4/6/2014",
                  "id": "15",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "16",
                  "start": "2/6/2014",
                  "end": "7/6/2014",
                  "id": "16-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "16",
                  "start": "2/6/2014",
                  "end": "7/6/2014",
                  "id": "16",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "17",
                  "start": "5/6/2014",
                  "end": "10/6/2014",
                  "id": "17-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "17",
                  "start": "5/6/2014",
                  "end": "17/6/2014",
                  "id": "17",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "17",
                  "start": "10/6/2014",
                  "end": "17/6/2014",
                  "id": "17-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 7 days."
              },
              {
                  "label": "Planned",
                  "processid": "18",
                  "start": "10/6/2014",
                  "end": "12/6/2014",
                  "id": "18-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Delay",
                  "processid": "18",
                  "start": "18/6/2014",
                  "end": "20/6/2014",
                  "id": "18",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 8 days."
              },
              {
                  "label": "Planned",
                  "processid": "19",
                  "start": "15/6/2014",
                  "end": "23/6/2014",
                  "id": "19-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "19",
                  "start": "16/6/2014",
                  "end": "23/6/2014",
                  "id": "19",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "20",
                  "start": "23/6/2014",
                  "end": "23/6/2014",
                  "id": "20-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "20",
                  "start": "23/6/2014",
                  "end": "23/6/2014",
                  "id": "20",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Planned",
                  "processid": "21",
                  "start": "18/6/2014",
                  "end": "21/6/2014",
                  "id": "21-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "21",
                  "start": "18/6/2014",
                  "end": "23/6/2014",
                  "id": "21",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              },
              {
                  "label": "Delay",
                  "processid": "21",
                  "start": "21/6/2014",
                  "end": "23/6/2014",
                  "id": "21-2",
                  "color": "#e44a00",
                  "toppadding": "56%",
                  "height": "32%",
                  "tooltext": "Delayed by 2 days."
              },
              {
                  "label": "Planned",
                  "processid": "22",
                  "start": "24/6/2014",
                  "end": "28/6/2014",
                  "id": "22-1",
                  "color": "#008ee4",
                  "height": "32%",
                  "toppadding": "12%"
              },
              {
                  "label": "Actual",
                  "processid": "22",
                  "start": "25/6/2014",
                  "end": "28/6/2014",
                  "id": "22",
                  "color": "#6baa01",
                  "toppadding": "56%",
                  "height": "32%"
              }
          ]
      },
      "connectors": [
          {
              "connector": [
                  {
                      "fromtaskid": "1",
                      "totaskid": "2",
                      "color": "#008ee4",
                      "thickness": "2",
                      "fromtaskconnectstart_": "1"
                  },
                  {
                      "fromtaskid": "2-2",
                      "totaskid": "3",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "3-2",
                      "totaskid": "4",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "3-2",
                      "totaskid": "6",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "7",
                      "totaskid": "8",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "7",
                      "totaskid": "9",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "12",
                      "totaskid": "16",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "12",
                      "totaskid": "17",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "17-2",
                      "totaskid": "18",
                      "color": "#008ee4",
                      "thickness": "2"
                  },
                  {
                      "fromtaskid": "19",
                      "totaskid": "22",
                      "color": "#008ee4",
                      "thickness": "2"
                  }
              ]
          }
      ],
      "milestones": {
          "milestone": [
              {
                  "date": "2/6/2014",
                  "taskid": "12",
                  "color": "#f8bd19",
                  "shape": "star",
                  "tooltext": "Completion of Phase 1"
              }
          ]
      },
      "legend": {
          "item": [
              {
                  "label": "Planned",
                  "color": "#008ee4"
              },
              {
                  "label": "Actual",
                  "color": "#6baa01"
              },
              {
                  "label": "Slack (Delay)",
                  "color": "#e44a00"
              }
          ]
      }
  }

    
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


        
          

   


    