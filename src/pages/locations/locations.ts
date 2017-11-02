import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrentLoc } from '../../interfaces/current-loc';
import { WeatherLocation } from '../../interfaces/weather-location';
import { LocationsServiceProvider } from '../../providers/locations-service/locations-service';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
  locs: Array<WeatherLocation>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public locationsService: LocationsServiceProvider) {
    locationsService.getLocations().then(res => {
      this.locs = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }
  deleteLocation(loc) {
    console.log('deleteLocation');
    this.locationsService.removeLocation(loc);
  }
  addLocation() {
    console.log('addLocation');
  }
}
export class Locations {
}