import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AgmMap, GoogleMapsAPIWrapper,} from '@agm/core';
import { GoogleMap, } from '@agm/core/services/google-maps-types';
import { AgmDirectionModule} from 'agm-direction';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  dir: { origin: { lat: number; lng: number; }; destination: { lat: number; lng: number; }; };
  @ViewChild('map') mapref :ElementRef;
   
  lat: number;
  long: number; 
  imagen;
  estilistas: estilista [] = [];
  seguirE: any;
  estilistaNom: any;  
  iniciarMap = false;
  
  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                public db: AngularFirestore,
                public _ubicacion:UbicacionProvider,
              ) {

    db.collection("usuarios", ref => ref.where('estado', '==', true)).valueChanges()
    .subscribe( ( resp:estilista[] ) => {
      this.estilistas = resp;
      console.log(this.estilistas);

      this._ubicacion.geolocalizacionUser().subscribe(res => {
        
        if ( !this.iniciarMap  ) {
          this.lat = res.coords.latitude;
          this.long = res.coords.longitude;
          this.iniciarMap = true;
        }
      })                  
      
      if ( this.seguirE ) {
        resp.forEach( Estilista => {
          if ( Estilista.clave === this.seguirE ) {
            this.lat = Estilista.lat
            this.long = Estilista.long
          }
        });
      }
    })   
  }


  ionViewDidLoad() {
  
  } 
  mapClicked($event: MouseEvent) {
    console.log("eventos" +JSON.stringify( $event))
  }
  

  trackerEstilista(Estilista:estilista) {
    console.log(Estilista);
    this.seguirE = Estilista.clave;
    this.estilistaNom = Estilista.nombre
    this.lat = Estilista.lat;
    this.long = Estilista.long;
  }

  getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    }
  }

  // dragMarker($event:MouseEvent){
  //   console.log($event)
  // }
  
  cancelarEstilista(){
    this.seguirE = null;
    this.estilistaNom = null
    this._ubicacion.geolocalizacionUser().subscribe(res => {
      this.lat = res.coords.latitude,
      this.long = res.coords.longitude;
      this.imagen = "assets/img/cardinal.png"
    })
  }
}


interface estilista {
  nombre: string;
  lat: number;
  long: number;
  clave:string;
  img:string;
}