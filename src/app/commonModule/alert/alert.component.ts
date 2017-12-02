import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfirmationService, Message} from "primeng/primeng";
import {ConfirmDialogModal} from "../../models/confirmDialog-modal";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, AfterViewInit {

  msgs: Message[] = [];
  growlLife:number = 3000;

  display: boolean;
  isShow:boolean;
  constructor(private alertService: AlertService,private confirmationService: ConfirmationService,
              ) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.alertService.growalObserve.subscribe((message) => {
      if(message.severity == "success") {
        this.growlLife = 5000;
      }
      this.msgs = [];
      this.msgs.push(message);
    },(error)=> {console.log(error)});

    this.alertService.confirmDialogObserve.subscribe((confirmDialog:ConfirmDialogModal) => {
      this.confirmationService.confirm({
        message: confirmDialog.message,
        header: '警告',
        icon: 'fa fa-question-circle',
        accept: () => {
          if(confirmDialog.acceptF) {
            confirmDialog.acceptF();
          }

        },
        reject: () => {
          if(confirmDialog.cancelF) {
            confirmDialog.cancelF();
          }
        }
      });
    },(error)=> {console.log(error)});

    this.alertService.loadingProcessObserve.subscribe((isOpen: boolean) => setTimeout(() => {
      if(isOpen) {
        this.isShow = true;
        this.display = this.isShow;
      }else {
        this.isShow = false;
        this.display = this.isShow;
      }
    },100));
  }

}
