import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
//import { LoadingController, App , AlertController,MenuController,Platform  } from 'ionic-angular';
//import { HttpClient,HttpHeaders  } from '@angular/common/http';


//

import { LivePage } from '../live/live';
import { FilmsPage } from '../films/films';

//
//import { SafariViewController } from '@ionic-native/safari-view-controller';

//import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
//import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

import * as dl from 'cordova-plugin-android-downloadmanager';
import {  
  File  
} from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  app_link:any;
  app_title:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl:MenuController
    //public http:  HttpClient,
   // private downloader: Downloader,
   , private inAppBrowser: InAppBrowser
    //private admobFree: AdMobFree
    , private file: File
) {this.menuCtrl.enable(true)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    //this.download_app();
  }
  gotolive() {
    this.navCtrl.setRoot(LivePage);
  }
  gotovod() {
    this.navCtrl.setRoot(FilmsPage);
  }


download_app(){
     //https://github.com/emilbayes/cordova-plugin-android-downloadmanager
          //https://forum.ionicframework.com/t/how-to-download-file-natively/114329/14
              //----------------------------------------------------------
              let req = {
                uri: 'http://iptvreseller.xyz:1234/Premium_IptvTVBox.apk',
                title: 'androidbox',
                description: 'android box apk',
                mimeType: 'application/vnd.android.package-archive',
              
                visibleInDownloadsUi: true,
                notificationVisibility: 0,
              
                // Either of the next three properties
                destinationInExternalFilesDir: {
                  dirType: this.file.externalRootDirectory + '/Download/',
                  subPath: ''
                }
              };
                console.log(dl);
                let dl2= dl.__proto__;
                console.log(dl2);
                  dl2.enqueue(req, console.info);
          //----------------------------------------------------------
}



openWebpage(){
  
 const options: InAppBrowserOptions = {
  zoom: 'yes',
  shouldPauseOnSuspend: 'yes',
  location: 'yes'

}

this.inAppBrowser.create('http://appmofix.com/', '_system', options);

}


}
