import {Component} from '@angular/core';
import {ViewController, NavParams} from "ionic-angular";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: [ApiService]
})
export class InfoPage {

  constructor(private viewCtrl: ViewController,
              private api: ApiService,
              private  item: NavParams) {
  }

  /**
   * Close modal box
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
