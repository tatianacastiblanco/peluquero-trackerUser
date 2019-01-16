import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  constructor  (
                  public http: HttpClient,
                  private geolocation: Geolocation
               ) {

    console.log('Hello UbicacionProvider Provider');
  }
  
  geolocalizacionUser(){
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
 
  
      // watch.subscribe((data) => {
      //   // data can be a set of coordinates, or an error (if an error occurred).
      //   // data.coords.latitude
      //   // data.coords.longitude
      //   console.log(data.coords);
      //   return data;
        
      // });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    return this.geolocation.watchPosition();

  }
}
