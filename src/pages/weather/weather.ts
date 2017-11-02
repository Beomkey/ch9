import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { Geolocation } from '@ionic-native/geolocation';
import { CurrentLoc } from '../../interfaces/current-loc';

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  day1: any = {};
  day2: any = {};
  day3: any = {};
  loader: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = {lat:0, lon: 0};
  pageTitle: string = 'Current Location';

  constructor(public navCtrl: NavController, public navParams: NavParams, public weatherService: WeatherServiceProvider, public loadingCtrl: LoadingController, public geolocation: Geolocation) {
    let loader = this.loadingCtrl.create({
      content: "Loading weather data...",
    });
    loader.present();

    let loc = this.navParams.get('geoloc');
    if (loc == undefined) {
      geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.currentLoc.lat = pos.coords.latitude;
      this.currentLoc.lon = pos.coords.longitude;
      this.currentLoc.timestamp = pos.timestamp;
      return this.currentLoc;
    }).then(currentLoc => { 
      weatherService.getWeather(currentLoc).then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.day1 = this.theWeather.daily.data[0];
        this.day2 = this.theWeather.daily.data[1];
        this.day3 = this.theWeather.daily.data[2];
        loader.dismiss();
      });
    });
    } else {
      this.currentLoc = loc;
      weatherService.getWeather(this.currentLoc)
      .then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.day1 = this.theWeather.daily.data[0];
        this.day2 = this.theWeather.daily.data[1];
        this.day3 = this.theWeather.daily.data[2];
        this.pageTitle = this.navParams.get('title');        
        loader.dismiss();
      });
    }
  }
  doRefresh(refresher) {
    this.weatherService.getWeather(this.currentLoc)
    .then(theResult => {
      this.theWeather = theResult;
      this.currentData = this.theWeather.currently;
      this.day1 = this.theWeather.daily.data[0];
      this.day2 = this.theWeather.daily.data[1];
      this.day3 = this.theWeather.daily.data[2];
      refresher.complete();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }
}