import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import _ from 'lodash';

@Injectable()
export class ApiService {

  // simple data
  public items = [
    {
      country: 'United Kingdom',
      city: 'Nottingham',
      street: 'Downing St',
      house: '50',
      price: [],
    },
    {
      country: 'France',
      city: 'Ivry-sur-Seine',
      street: 'Rue Pierre Honfroy',
      house: '3',
      price: [],
    },
    {
      country: 'Switzerland',
      city: 'Bern',
      street: 'Brückenstrasse',
      house: '14D',
      price: [],
    },
    {
      country: 'Italy',
      city: 'Perugia',
      street: 'Via Campo di Marte',
      house: '19',
      price: [],
    },
    {
      country: 'Germany',
      city: 'Eisenach',
      street: 'Wiesenstraße',
      house: '8',
      price: '',
    },
    {
      country: 'Poland',
      city: 'Bydgoszcz',
      street: 'Jana Henryka Dąbrowskiego',
      house: '4',
      price: '',
    },
    {
      country: 'Czech Republic',
      city: 'Praha',
      street: 'Bruselská',
      house: '298/4',
      price: '',
    },
  ];

  constructor() {

  }

  /**
   * Generate random address array with random price
   */
  public list(): Observable<any> {
    let items = _.shuffle(this.items).slice(0, 4);

    _.map(items, (el) => {
      // random price
      el.price = [];
      for (let i = 0; i < 3; i++) {
        el.price.push(_.random(-20, 20));
      }

      // initials from name and random background color
      let name = el.street.split(" ");
      el.initials = name[0].charAt(0).toUpperCase() + (name[1] ? name[1].charAt(0).toUpperCase() : '' );
      el.initialsBg = _.random(1, 19);

      return el;
    });

    // return observable
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(items);
        observer.complete();
      }, 1000);
    });
  }
}
