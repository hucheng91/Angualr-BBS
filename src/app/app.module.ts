import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";
// Routing Module
import {AppRoutingModule} from "./app.routing";
// Layouts
import {FullLayoutComponent} from "./layouts/full-layout.component";
import {SimpleLayoutComponent} from "./layouts/simple-layout.component";


import {AppServicesModule} from "./app.services";


import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";

import {AlertModule} from "./commonModule/alert/alert.module";
import {FooterComponent} from "./components/footer/footer.component";
import {NavComponent} from "./components/nav/nav.component";
import {TopicModule} from "./container/topic/topic.module";
import {LoginAndRegisterModule} from "./container/loginAndRegister/loginAndRegister.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UserModule} from "./container/user/user.module";
import {MessagesModule} from "./container/messages/messages.module";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    AppServicesModule,
    SharedModule,
    AlertModule,
    TopicModule,
    LoginAndRegisterModule,
    UserModule,
    MessagesModule


  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    FooterComponent,
    NavComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    }
  ],
  exports: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
