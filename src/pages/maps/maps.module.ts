import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction';

@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB9nQK0kJrMsjpHmKUpBlHt4Nq-Je3T10k'
    }),
    AgmDirectionModule
  ],
})
export class MapsPageModule {}
