import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dataSource={
    "chart": {
        "caption": "SDWAN Product",
        "subCaption": "Last week",
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
