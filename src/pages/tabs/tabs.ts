import {Component, ViewChild} from '@angular/core';
import {Slides, ModalController, LoadingController, ToastController} from "ionic-angular";
import {InfoPage} from "../info/info";
import {ApiService} from "../../services/api.service";
import _ from "lodash";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [ApiService]
})
export class TabsPage {

  // view for sliders
  @ViewChild('hSlider') public hSlider: Slides;
  @ViewChild('vSlider') public vSlider: Slides;

  public items = [];
  public tabsList = ['day', 'month', 'year'];
  public tab: string;// = 'day';
  public tabIndex: number;
  public total: number;

  public hSliderOptions = {
    // effect: 'coverflow',
    // initialSlide: 0,
    // direction: 'vertical',
    // loop: true
  };

  public vSliderOptions = {
    // effect: 'coverflow',
    initialSlide: 1,
    direction: 'vertical',
    // onlyExternal: true,
    // loop: true
  };

  constructor(private modalCtrl: ModalController,
              private api: ApiService,
              private loadingCtrl: LoadingController,
              private alertCtrl: ToastController) {

    this.tab = this.tabsList[0];
    this.tabIndex = 0;
    this.refresh();
  }

  /**
   * Load data from api
   */
  public refresh(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });

    this.items = [];
    this.total = 0;

    loader.present();

    this.api.list().subscribe((items) => {
      this.items = items;
      this.calcTotal();
      loader.dismiss();
    });
    this.calcTotal();
  }

  /**
   * Calculate total ammount for current list
   */
  public calcTotal(): void {
    this.total = _.reduce(this.items, (result: number, value, key) => {
      return result + parseInt(value.price[this.tabIndex]);
    }, 0);
  }

  /**
   * Change horizontal slider event
   */
  public onSlideChanged(): void {
    this.tab = this.tabsList[this.hSlider.getActiveIndex()] || this.tabsList[0];
    this.tabIndex = this.hSlider.getActiveIndex();
    this.calcTotal();
  }

  /**
   * Select event on bottom segment buttons
   * @param page
   */
  public onSegmentSelect(page: string): void {
    this.hSlider.slideTo(this.tabsList.indexOf(page));
    this.tabIndex = this.tabsList.indexOf(page);
    this.calcTotal();
  }

  /**
   * Show modal box with item info
   * @param item
   */
  public openModal(item: any): void {
    let modal = this.modalCtrl.create(InfoPage, item);
    modal.present();
  }

  /**
   * Return to bottom slide
   */
  public goBack(): void {
    this.vSlider.slideTo(1);
  }

  /**
   * Show "not implemented" message
   */
  public notImplemented(): void {
    let toast = this.alertCtrl.create({
      message: 'This feature is not implemented yet',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
