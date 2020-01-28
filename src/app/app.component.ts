import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FusionCharts from 'fusioncharts';

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

  currChart:{id:number,chartType:string,page:string}[]=[];
  charts=[
      {id:1, chartType:'Bar chart',page:'column2d'},
      {id:2, chartType:'Line chart',page:'line'},
      {id:3, chartType:'Comparison chart',page:'mscolumn2d'}]
      ;


  constructor(private router: Router) { 

    
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
  
}
