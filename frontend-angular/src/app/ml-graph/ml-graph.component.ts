import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatashareService } from '../datashare.service';
import {DataaccessService} from '../dataaccess.service'


@Component({
  selector: 'app-ml-graph',
  templateUrl: './ml-graph.component.html',
  styleUrls: ['./ml-graph.component.css']
})
export class MlGraphComponent implements OnInit {

  items = ['Furniture', 'Office Supplies', 'Technology'];
  items1 = ['Appliances'];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public date;
public datalist;
  constructor(private dataShare:DatashareService,private dataAccess:DataaccessService) {
    debugger;
    this.dataShare.statusObservable$
    .subscribe(arg => this.datalist = arg);
    console.log(this.datalist);
    //this.convertDates(this.datalist)

   }

  ngOnInit() {
  }

  convertDates(datal:any) {
    this.lineChartData[0].data=[];
    this.lineChartLabels=[];
    console.log(datal)
    for (const property in datal) {
      console.log(`${property}: ${datal[property]}`);
      this.lineChartData[0].data.push(datal[property])
      this.lineChartLabels.push(this.getFormattedDate(parseInt(property)))
    }
  }

    // showConfig() {
    //   this.dataAccess.getConfig()
    //     .subscribe((data: any) => {
    //       this.convertDates(data);
    //      console.log(data);
    //     });

    // }

    getFormattedDate(date : any) {
      var todayTime = new Date(date);
      var month = todayTime.getMonth();
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      return month + "/" + day + "/" + year;
      }

      model: any = {};
      model1: any = {};
  dataset=[]
  isClicked=false;

  onSubmit() {
    console.log(this.model);
    this.dataAccess.getConfig(this.model.name,this.model.duration)
    .subscribe((data: any) => {
      this.convertDates(data);
     console.log(data);
    });

  }
  onSubmit1() {
    console.log(this.model1);
    this.dataAccess.getConfig1(this.model1.name,this.model1.duration)
    .subscribe((data: any) => {
      this.convertDates(data);
     console.log(data);
    });

  }

}
