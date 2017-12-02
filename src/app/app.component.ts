import {AfterViewInit, Component} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  implements AfterViewInit{


  constructor() {
  }
  /*onChange(): void {
    this.cd.detectChanges();
  }*/
  ngAfterViewInit(): void {
  }

}
