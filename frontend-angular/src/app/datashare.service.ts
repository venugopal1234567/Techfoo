import { Injectable } from '@angular/core';
import{ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  private status=new ReplaySubject<any>();
  statusObservable$=this.status.asObservable();
  constructor() { }
  SendBoolean(itemlist:any)
  {
    this.status.next(itemlist);

  }
}
