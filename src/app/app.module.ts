import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DayPage } from '../pages/day/day';
import { MonthPage } from '../pages/month/month';
import { YearPage } from '../pages/year/year';
import { TabsPage } from '../pages/tabs/tabs';
import {InfoPage} from "../pages/info/info";

@NgModule({
  declarations: [
    MyApp,
    InfoPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InfoPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
