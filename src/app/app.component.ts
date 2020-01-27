import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'winathon';
  isActive = true;
  
  currChart:{id:number,chartType:string,page:string}[]=[];
  charts=[
      {id:1, chartType:'Bar chart',page:'column2d'},
      {id:2, chartType:'Line chart',page:'line'},
      {id:3, chartType:'Comparison chart',page:'mscolumn2d'}]
      ;
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private router: Router) { }

  public onChange(event): void {
    this.currChart = this.charts.filter(element=>element.id===event.value);
    console.log(this.currChart[0].page);
    this.router.navigate(['/app-'+this.currChart[0].page]);
  }
  
}
