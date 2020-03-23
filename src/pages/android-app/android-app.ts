import { Component } from '@angular/core';
import {  NavController, NavParams ,Platform } from 'ionic-angular';
import { LoadingController, App , AlertController,MenuController } from 'ionic-angular';
///import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



@Component({
  selector: 'page-android-app',
  templateUrl: 'android-app.html',
})
export class AndroidAppPage {

  constructor(
   public platform: Platform,
    public navCtrl: NavController
    , public navParams: NavParams
    ,public loadingCtrl: LoadingController
    , public appCtrl: App 
    , public alertCtrl: AlertController
    ,public menuCtrl:MenuController
   // ,private youtube: YoutubeVideoPlayer
   
  ) {
  }

 

}
