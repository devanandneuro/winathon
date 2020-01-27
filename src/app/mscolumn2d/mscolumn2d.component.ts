import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mscolumn2d',
  templateUrl: './mscolumn2d.component.html',
  styleUrls: ['./mscolumn2d.component.css']
})
export class Mscolumn2dComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dataSource={
    "chart": {
      "caption": "SDWAN Product",
      "subcaption": "Last 3 months",
      "xaxisname": "Months",
      "yaxisname": "Orders",
      "theme": "fusion",
      "showValues": "1",
      "plotFillAlpha": "80"
    },
    "categories": [
        {
            "category": [
                {
                    "label": "Order Validation"
                },
                {
                    "label": "Provisioning"
                },
                {
                    "label": "Testing"
                },
                {
                    "label": "Activation"
                },
                {
                    "label": "Billing"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Desired no. of completion days",
            "data": [
                {
                    "value": "20"
                },
                {
                    "value": "30"
                },
                {
                    "value": "15"
                },
                {
                    "value": "20"
                },
                {
                    "value": "10"
                }
            ]
        },
        {
            "seriesname": "Actual no. of completion days",
            "data": [
                {
                    "value": "24"
                },
                {
                    "value": "42"
                },
                {
                    "value": "18"
                },
                {
                    "value": "23"
                },
                {
                    "value": "8"
                }
            ]
        }
    ]
}

}
