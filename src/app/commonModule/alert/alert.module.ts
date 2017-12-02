import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import {GrowlModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {CheckboxModule, DataTableModule} from "primeng/primeng";
import {FormsModule} from '@angular/forms';
import {AlertService} from "../services/alert.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    CheckboxModule,
    DataTableModule,
    FormsModule
  ],
  providers: [ConfirmationService,AlertService],
  exports: [AlertComponent],
  declarations: [AlertComponent]
})
export class AlertModule { }
