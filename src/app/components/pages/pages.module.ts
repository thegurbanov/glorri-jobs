import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DayPipe } from 'src/app/pipes/day/day.pipe';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    HomeComponent,
    JobsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    PipesModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
 