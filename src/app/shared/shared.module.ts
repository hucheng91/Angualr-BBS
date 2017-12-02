import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPipePipe } from './tabs-pipe.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  TabsPipePipe],
  exports:[TabsPipePipe]
})
export class SharedModule { }
