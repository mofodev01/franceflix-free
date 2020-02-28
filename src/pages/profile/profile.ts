import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, App, AlertController, NavParams,MenuController ,Content} from 'ionic-angular';
//import { LoadingController, App , AlertController,MenuController,Platform  } from 'ionic-angular';
import { HttpClient,HttpHeaders  } from '@angular/common/http';


import { LivePage } from '../live/live';
import { FilmsPage } from '../films/films';

import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting'
import { LoginPage } from '../login/login';

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
  @ViewChild(Content) content: Content;
  app_link:any;
  app_title:any;
  data_storage:any;
  items:any;
  index: string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl:MenuController,public storage: Storage, public appCtrl: App, public alertCtrl: AlertController,
    public http:  HttpClient,
   // private downloader: Downloader,
    private inAppBrowser: InAppBrowser,
    //private admobFree: AdMobFree
     private file: File
) {this.menuCtrl.enable(true);
  this.index = "home";
}

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
  scrollTo() {
   
    // this.content.scrollTo(0, 500, 200);
    this.content.scrollToBottom(1500);
   }

download_app(){
     //https://github.com/emilbayes/cordova-plugin-android-downloadmanager
          //https://forum.ionicframework.com/t/how-to-download-file-natively/114329/14
              //----------------------------------------------------------
              let req = {
                
                //uri: 'http://iptvreseller.xyz:1234/Premium_IptvTVBox.apk',
                uri: 'http://appmofix.com/apps/story-kids.apk',
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

logout(){
  this.storage.clear();
  this.storage.remove("session_storage");
  this.appCtrl.getRootNav().setRoot(LoginPage);
 
  let alert = this.alertCtrl.create({
 
    title:"Au revoir",
    subTitle:"Déconnexion réussie",
    buttons: ['OK']
    });
   
    alert.present();

   }

   setting(
    username :number,
    telephone:String,
    email :String,
    mac_addr :String
    
  ){
   this.storage.get("session_storage").then((res)=>{
     this.data_storage=res;

    this.navCtrl.push(SettingPage,{
      username: username,telephone: telephone,email: email,mac_addr: mac_addr
});

})
  }
  ionViewWillEnter(){
  
    this.storage.get("session_storage").then((res)=>{
     this.data_storage=res;
     
     console.log(this.data_storage);
/**----------------------------------------- */
let httpHeaders = new HttpHeaders({
  'Content-Type' : 'application/json',
  'Cache-Control': 'no-cache'
     });    
     let options = {
  headers: httpHeaders
     };
/**----------------------------------------- */    
  
this.http.get('http://space.appmofix.com/api/fetch_user.php?username='+this.data_storage,options)

   .subscribe(res => {
   
   
   this.items=res;
   
   console.log(this.items);
   });




///-----
})
///-----

    }

}
