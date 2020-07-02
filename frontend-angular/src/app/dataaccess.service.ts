import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DatashareService } from './datashare.service';
@Injectable({
  providedIn: 'root'
})
export class DataaccessService {
  public datalist
  constructor(private http: HttpClient,private dataShare:DatashareService ) {

    this.dataShare.statusObservable$
    .subscribe(arg => this.datalist = arg);
    console.log(this.datalist);
  }


getConfig(category:string,time:string) {

 var configUrl = `http://127.0.0.1:5000/predict-category?category=${category}&time=${time}`;
  return this.http.get(configUrl);
}
getConfig1(category:string,time:string) {

  var configUrl = `http://127.0.0.1:5000/predict-sub-category?category=${category}&time=${time}`;
   return this.http.get(configUrl);
 }
}
