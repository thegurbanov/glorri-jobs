import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayPipe } from './day/day.pipe';
import { TranslatePipe } from './translate/translate.pipe';
import { SafePipe } from './safe/safe.pipe';
import { DoEscapePipe } from './doEscape/do-escape.pipe';



@NgModule({
  declarations: [
    DayPipe,
    TranslatePipe,
    SafePipe,
    DoEscapePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DayPipe, 
    TranslatePipe,
    SafePipe,
    DoEscapePipe
  ]
})
export class PipesModule { }
