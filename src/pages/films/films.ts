import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController} from 'ionic-angular';

import { JsonDataProvider } from '../../providers/json-data/json-data';
import { ListeServerFilmsPage } from '../liste-server-films/liste-server-films';

//import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';


@Component({
  selector: 'page-films',
  templateUrl: 'films.html'
})

export class FilmsPage {


  countries: any;
         
  errorMessage: string;

  limit = 100;



  constructor(public navCtrl: NavController, public navParams: NavParams
    , public JsonDataProvider: JsonDataProvider, public loadingCtrl: LoadingController
    ,public menuCtrl:MenuController
    //,private admobFree: AdMobFree
    ) {
      this.menuCtrl.enable(true)
  }

  ngOnInit() {
    this.launchInterstitial();
    this.getFilmsCountry();
             }

  getFilmsCountry() {

     
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.JsonDataProvider.getFilmsCountry()
             .subscribe(
               countries =>{
                 this.countries = countries 
                     loading.dismiss();
                           } ,
               error => {
                 this.errorMessage = <any>error
                    loading.dismiss();
                        });
  
   }

   doInfinite(infiniteScrollEvent) {
    this.limit += 20;
    infiniteScrollEvent.complete();
    infiniteScrollEvent.disabled = true;
}

push_data_country(categorie: String,title: String){
  this.navCtrl.push(ListeServerFilmsPage,{categorie: categorie,title: title});
}
  
launchInterstitial() {
  /*
  //if (this.platform.is('android')) {
  const interstitialConfig: AdMobFreeInterstitialConfig = {
          isTesting: true,// Remove in production
          autoShow: true,
      //id: Your Ad Unit ID goes here
     //id:'ca-app-pub-3000905870244951/5491408793'
  };

  this.admobFree.interstitial.config(interstitialConfig);

  
  this.admobFree.interstitial.prepare().then(() => {
      // success
      
  });

  /* }else if (this.platform.is('ios')) {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true,// Remove in production
      autoShow: true,
  //id: Your Ad Unit ID goes here
 //id:'ca-app-pub-3000905870244951/5491408793'
};

this.admobFree.interstitial.config(interstitialConfig);


this.admobFree.interstitial.prepare().then(() => {
  // success
  
});

  } */

  
}//fin interstitial


}