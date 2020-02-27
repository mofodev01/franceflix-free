import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,MenuController} from 'ionic-angular';

import { JsonDataProvider } from '../../providers/json-data/json-data';
//import { DetailPage } from '../detail/detail'
import { ListeServeLivePage } from '../liste-serve-live/liste-serve-live';

//import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';



@Component({
  selector: 'page-live',
  templateUrl: 'live.html',
})
export class LivePage {
  countries: any;
         
  errorMessage: string;

  limit = 100;



  constructor(public navCtrl: NavController, public navParams: NavParams
    , public JsonDataProvider: JsonDataProvider, public loadingCtrl: LoadingController 
    ,public menuCtrl:MenuController
    //,private admobFree: AdMobFree
    ) {
      this.menuCtrl.enable(true)
      //this.getLiveCountry_json();
  }

  ngOnInit() {
    this.launchInterstitial();
    this.getLiveCountry_json();
             }

  getLiveCountry_json() {

     
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.JsonDataProvider.getLiveCountry()
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
  this.navCtrl.push(ListeServeLivePage,{categorie: categorie,title: title});
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
