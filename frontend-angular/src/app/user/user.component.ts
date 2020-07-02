import { Component, OnInit } from '@angular/core';
import {DataaccessService} from '../dataaccess.service';
import {DatashareService} from '../datashare.service';
import {  RouterModule,Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  items = ['hariOm', 'Deeksha', 'Babita'];
  constructor(private dataAccess:DataaccessService,private dataShare:DatashareService
    ,private router:Router) { }

  ngOnInit(): void {
  }
  model: any = {};
  dataset=[]
  isClicked=false;

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
//this.showConfig()
this.isClicked=true;
this.dataShare.SendBoolean(this.model);
this.router.navigate(['graph']);
  }


}
