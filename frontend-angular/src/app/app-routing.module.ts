import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MlGraphComponent} from '../app/ml-graph/ml-graph.component';


const routes: Routes = [{path:"graph",component:MlGraphComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
