import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'winathon';
  isActive = true;
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  


  chartInstance: any = {};

    
    initialized(e) {
        this.chartInstance = e.chart; 

        this.chartInstance.configureLink({
            type: "stackedcolumn2d",
            overlayButton: {
                message: 'close',
                fontColor: '880000',
                bgColor: 'FFEEEE',
                borderColor: '660000'
            }
        }, 0)
    }
    dataSource = {
        "chart": {
            "caption": "SDWAN Product",
            "subcaption": "Last 3 months",
            "xaxisname": "Months",
            "yaxisname": "Orders",
            "theme": "fusion",
            "showValues": "1"
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
        ],
        "linkeddata": [{
                "id": "oct",
                "linkedchart": {
                    "chart": {
                        "caption": "Task completion days",
                        "subcaption": "October month",
                        "theme": "fusion",
                        "xaxisname": "Task group",
                        "yaxisname": "Days",
                        "showValues": "1"

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
                            "seriesname": "Days took to complete",
                            "data": [
                                {
                                    "value": "21"
                                },
                                {
                                    "value": "35"
                                },
                                {
                                    "value": "15"
                                },
                                {
                                    "value": "20"
                                },
                                {
                                    "value": "13"
                                }
                            ]
                        },
                        {
                            "seriesname": "Actual days",
                            "data": [
                                {
                                    "value": "18"
                                },
                                {
                                    "value": "30"
                                },
                                {
                                    "value": "18"
                                },
                                {
                                    "value": "15"
                                },
                                {
                                    "value": "10"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "nov",
                "linkedchart": {
                    "chart": {
                        "caption": "Task completion days",
                        "subcaption": "November month",
                        "theme": "fusion",
                        "xaxisname": "Task group",
                        "yaxisname": "Days",
                        "showValues": "1"

                    },
                    "data": [{
                      "label": "Order Validation",
                      "value": "34"
                  }, {
                      "label": "Provisioning",
                      "value": "43"
                  }, {
                      "label": "Testing",
                      "value": "13"
                  }, {
                      "label": "Activation",
                      "value": "32"
                  },{
                    "label": "Billing",
                    "value": "24"
                }
                ]
                }
            },
            {
                "id": "dec",
                "linkedchart": {
                    "chart": {
                        "caption": "Task completion days",
                        "subcaption": "December month",
                        "theme": "fusion",
                        "xaxisname": "Task group",
                        "yaxisname": "Days",
                        "showValues": "1"

                    },
                    "data": [{
                      "label": "Order Validation",
                      "value": "21"
                  }, {
                      "label": "Provisioning",
                      "value": "37"
                  }, {
                      "label": "Testing",
                      "value": "21"
                  }, {
                      "label": "Activation",
                      "value": "15"
                  },{
                    "label": "Billing",
                    "value": "16"
                }
                ]
                }
            }
        ]
    };
}
