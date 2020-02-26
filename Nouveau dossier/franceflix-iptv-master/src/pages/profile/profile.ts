import { Component,ViewChild } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { LoadingController, App , AlertController,MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SettingPage } from '../setting/setting'
import { LoginPage } from '../login/login';

import { Content } from 'ionic-angular';

import { DownloadPage } from '../download/download';
import { AndroidAppPage } from '../android-app/android-app';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { SafariViewController } from '@ionic-native/safari-view-controller';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild("username") username;
  @ViewChild("amount") amount;
  @ViewChild("duration") duration;
  @ViewChild("gateway") gateway;

  @ViewChild(Content) content: Content;

  scrollTo() {
   
   // this.content.scrollTo(0, 500, 200);
   this.content.scrollToBottom(1500);
  }
data:any;

items:any;
data_storage:any;
item_pay_show:any;
item_free_show:any;
item_pay_stop:any;
index: string

CopyTextUser:string ;
CopyTextPass:string ;


  constructor(
    private safariViewController: SafariViewController,
    private inAppBrowser: InAppBrowser,
    public http:  HttpClient,
    public navCtrl: NavController, public navParams: NavParams
    ,public loadingCtrl: LoadingController,public storage: Storage 
    , public appCtrl: App , public alertCtrl: AlertController
    ,public menuCtrl:MenuController
    ,private payPal: PayPal
   // ,public MyApp: MyApp
    ,private clipboard: Clipboard
    ,private toast: Toast
    
    ) {
      this.menuCtrl.enable(true);
      this.index = "home";
  }
  copyTextUser(){
    this.clipboard.copy(this.CopyTextUser);
    this.toast.show('copie', '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  copyTextPass(){
    this.clipboard.copy(this.CopyTextPass);
    this.toast.show('copie', '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  openWebpage() {


    this.safariViewController.isAvailable()
    .then((available: boolean) => {
        if (available) {
  
          this.safariViewController.show({
            url: 'http://appmofix.com/',
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: true,
            tintColor: '#ff0000'
          })
          .subscribe((result: any) => {
              if(result.event === 'opened') console.log('Opened');
              else if(result.event === 'loaded') console.log('Loaded');
              else if(result.event === 'closed') console.log('Closed');
            },
            (error: any) => console.error(error)
          );
  
        } else {
          //-----------------
          const options: InAppBrowserOptions = {
            zoom: 'yes',
            shouldPauseOnSuspend: 'yes',
            location: 'yes'
      
          }
        
          this.inAppBrowser.create('http://appmofix.com/', '_system', options);
          //-----------------
        }
      }
    );

  
  
  }

  godownloadPage() {
    this.navCtrl.setRoot(DownloadPage);
  }
  gotutorialPage() {
    this.navCtrl.setRoot(AndroidAppPage);
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
/**----------------------------------------- */    
  
this.http.get('http://space.appmofix.com/api/setting.php')

   .subscribe(res => {
   
   
   this.item_pay_show=res;
   
   console.log(this.item_pay_show);
   });


///-----
/**----------------------------------------- */    
/**----------------------------------------- */    
  
this.http.get('http://space.appmofix.com/api/setting.php')

   .subscribe(res => {
   
   
   this.item_free_show=res;
   
   console.log(this.item_free_show);
   });


///-----
/**----------------------------------------- */    
  
this.http.get('http://space.appmofix.com/api/setting.php')

   .subscribe(res => {
   
   
   this.item_pay_stop=res;
   
   console.log(this.item_pay_stop);
   });


///-----
})
///-----

    }

    refresh(){
  
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
  /**----------------------------------------- */    
    
  this.http.get('http://space.appmofix.com/api/setting.php')
  
     .subscribe(res => {
     
     
     this.item_pay_show=res;
     
     console.log(this.item_pay_show);
     });
  
  
  ///-----
  /**----------------------------------------- */    
  /**----------------------------------------- */    
    
  this.http.get('http://space.appmofix.com/api/setting.php')
  
     .subscribe(res => {
     
     
     this.item_free_show=res;
     
     console.log(this.item_free_show);
     });
  
  
  ///-----
  /**----------------------------------------- */    
    
  this.http.get('http://space.appmofix.com/api/setting.php')
  
     .subscribe(res => {
     
     
     this.item_pay_stop=res;
     
     console.log(this.item_pay_stop);
     });
  
  
  ///-----
  })
  ///-----
  
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
    
      
    
    /*--------------------------------free-2-day-------------------------------*/
    
    free(){
      let loading = this.loadingCtrl.create({
        content: 'Attendez...'
      });
    
      loading.present();
  
     /**----------------------------------------- */
   


      let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Cache-Control': 'no-cache'
           });    
           let options = {
        headers: httpHeaders
           };
   
     let data = {
          username: this.data_storage   
         };
   

   
    
   this.http.post('http://space.appmofix.com/api/free_trailer.php',data, options)
   .map(res => res.toString())
   .subscribe(res => {
   
    loading.dismiss();
    
   if(res=="You have enable 2 Day Free trailer"){
     let alert = this.alertCtrl.create({
       title:"CONGRATS",
       subTitle:(res),
       buttons: ['OK']
       });
      
       alert.present();
      this.refresh();
      
   }else
   {
    let alert = this.alertCtrl.create({
    title:"ERROR",
    subTitle:(res),
    buttons: ['OK']
    });
   
    alert.present();
     } 
   });
   

    }

    /*--------------------------------Before-free---------------------------------*/
    confirm_free(){
    const confirm = this.alertCtrl.create({
      title: 'Free 2 Day',
      message: 'Are you sure want to test free 2 Day ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            
           this.free();
          }
        }
      ]
    });
    confirm.present();
  }
    /*--------------------------------Before-free---------------------------------*/
    



/*--------------------------------1-month---------------------------------*/
      payement_1_Month(){

         
        /**/
        this.payPal.init({
          PayPalEnvironmentProduction: 'AVRQ7igUT9AjJgnzCapuKNc_s3pHhCNXoOiNAPeLg7hwFsn2dtBg2P_App179qm_nAm1mON5R5AUxn08',
          PayPalEnvironmentSandbox: ''
        }).then(() => {
         
          this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
            
          })).then(() => {
            let payment = new PayPalPayment('12', 'USD', '1 Month', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then(() => {
              
              // Successfully paid
              let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
                   });    
                   let options = {
                headers: httpHeaders
                   };
           
             let data = {
                  username: this.data_storage,
                  amount: this.amount=12,
                  duration: this.duration='1 Month',
                  gateway: this.gateway='paypal'   
                 };
           
           
            
           this.http.post('http://space.appmofix.com/api/paid.php',data, options)
           .map(res => res.toString())
           .subscribe(res => {
           
            
           if(res=="payment successfull"){
             let alert = this.alertCtrl.create({
               title:"CONGRATS",
               subTitle:(res),
               buttons: ['OK']
               });
              
               alert.present();
           
              
           }else
           {
            let alert = this.alertCtrl.create({
            title:"ERROR",
            subTitle:(res),
            buttons: ['OK']
            });
           
            alert.present();
             } 
           });
           
            
            }, () => {
              // Error or render dialog closed without being successful
              
              let alert = this.alertCtrl.create({
                title:"Erreur",
                subTitle:"Erreur ou rendu du dialogue fermé sans succès",
                buttons: ['OK']
                });
               
                alert.present();
            });
          }, () => {
            // Error in configuration
            
            let alert = this.alertCtrl.create({
              title:"Erreur",
              subTitle:"Erreur de configuration",
              buttons: ['OK']
              });
             
              alert.present();
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
         
          let alert = this.alertCtrl.create({
            title:"Error",
            subTitle:"Erreur lors de l'initialisation, peut-être que PayPal n'est pas pris en charge ou autre chose",
            buttons: ['OK']
            });
           
            alert.present();
        });
         /* */
      }

      /*-------------------------------------------3-month------30-----EUR------3 Month------------------------------*/
      payement_3_Month(){

        this.payPal.init({
          PayPalEnvironmentProduction: 'AVRQ7igUT9AjJgnzCapuKNc_s3pHhCNXoOiNAPeLg7hwFsn2dtBg2P_App179qm_nAm1mON5R5AUxn08',
          PayPalEnvironmentSandbox: ''
        }).then(() => {
         
          this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
            
          })).then(() => {
            let payment = new PayPalPayment('30', 'USD', '3 Month', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then(() => {
              // Successfully paid
              let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
                   });    
                   let options = {
                headers: httpHeaders
                   };
           
             let data = {
                  username: this.data_storage,
                  amount: this.amount=30,
                  duration: this.duration='3 Month',
                  gateway: this.gateway='paypal'   
                 };
           
           
            
           this.http.post('http://space.appmofix.com/api/paid.php',data, options)
           .map(res => res.toString())
           .subscribe(res => {
           
            
           if(res=="payment successfull"){
             let alert = this.alertCtrl.create({
               title:"CONGRATS",
               subTitle:(res),
               buttons: ['OK']
               });
              
               alert.present();
           
               
           }else
           {
            let alert = this.alertCtrl.create({
            title:"ERROR",
            subTitle:(res),
            buttons: ['OK']
            });
           
            alert.present();
             } 
           });
           
             
            }, () => {
              // Error or render dialog closed without being successful
              
              let alert = this.alertCtrl.create({
                title:"Error",
                subTitle:"Error or render dialog closed without being successful",
                buttons: ['OK']
                });
               
                alert.present();
            });
          }, () => {
            // Error in configuration
            
            let alert = this.alertCtrl.create({
              title:"Error",
              subTitle:"Error in configuration",
              buttons: ['OK']
              });
             
              alert.present();
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
         
          let alert = this.alertCtrl.create({
            title:"Error",
            subTitle:"Error in initialization, maybe PayPal isn't supported or something else",
            buttons: ['OK']
            });
           
            alert.present();
        });
      
      }
      /*---------------------------------------6-month----60---EUR----6 Month------sale--------------------------*/
      payement_6_Month(){

        this.payPal.init({
          PayPalEnvironmentProduction: 'AVRQ7igUT9AjJgnzCapuKNc_s3pHhCNXoOiNAPeLg7hwFsn2dtBg2P_App179qm_nAm1mON5R5AUxn08',
          PayPalEnvironmentSandbox: ''
        }).then(() => {
         
          this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
            
          })).then(() => {
            let payment = new PayPalPayment('50', 'USD', '6 Month', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then(() => {
              // Successfully paid
              let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
                   });    
                   let options = {
                headers: httpHeaders
                   };
           
             let data = {
                  username: this.data_storage,
                  amount: this.amount=50,
                  duration: this.duration='6 Month',
                  gateway: this.gateway='paypal'   
                 };
           
           
            
           this.http.post('http://space.appmofix.com/api/paid.php',data, options)
           .map(res => res.toString())
           .subscribe(res => {
           
            
           if(res=="payment successfull"){
             let alert = this.alertCtrl.create({
               title:"CONGRATS",
               subTitle:(res),
               buttons: ['OK']
               });
              
               alert.present();
           
               
           }else
           {
            let alert = this.alertCtrl.create({
            title:"ERROR",
            subTitle:(res),
            buttons: ['OK']
            });
           
            alert.present();
             } 
           });
           
             
            }, () => {
              // Error or render dialog closed without being successful
              
              let alert = this.alertCtrl.create({
                title:"Error",
                subTitle:"Error or render dialog closed without being successful",
                buttons: ['OK']
                });
               
                alert.present();
            });
          }, () => {
            // Error in configuration
            
            let alert = this.alertCtrl.create({
              title:"Error",
              subTitle:"Error in configuration",
              buttons: ['OK']
              });
             
              alert.present();
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
         
          let alert = this.alertCtrl.create({
            title:"Error",
            subTitle:"Error in initialization, maybe PayPal isn't supported or something else",
            buttons: ['OK']
            });
           
            alert.present();
        });
        
      }
      /*---------------------------------1-years---90----EUR-----1 Year------sale---------------------- */
      payement_1_Years(){

        this.payPal.init({
          PayPalEnvironmentProduction: 'AVRQ7igUT9AjJgnzCapuKNc_s3pHhCNXoOiNAPeLg7hwFsn2dtBg2P_App179qm_nAm1mON5R5AUxn08',
          PayPalEnvironmentSandbox: ''
        }).then(() => {
         
          this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
            
          })).then(() => {
            let payment = new PayPalPayment('80', 'USD', '1 Year', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then(() => {
              // Successfully paid
              let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json',
                'Cache-Control': 'no-cache'
                   });    
                   let options = {
                headers: httpHeaders
                   };
           
             let data = {
                  username: this.data_storage,
                  amount: this.amount=80,
                  duration: this.duration='1 Year',
                  gateway: this.gateway='paypal'   
                 };
           
           
            
           this.http.post('http://space.appmofix.com/api/paid.php',data, options)
           .map(res => res.toString())
           .subscribe(res => {
           
            
           if(res=="payment successfull"){
             let alert = this.alertCtrl.create({
               title:"CONGRATS",
               subTitle:(res),
               buttons: ['OK']
               });
              
               alert.present();
           
           }else
           {
            let alert = this.alertCtrl.create({
            title:"ERROR",
            subTitle:(res),
            buttons: ['OK']
            });
           
            alert.present();
             } 
           });
           
             
            }, () => {
              // Error or render dialog closed without being successful
              
              let alert = this.alertCtrl.create({
                title:"Error",
                subTitle:"Error or render dialog closed without being successful",
                buttons: ['OK']
                });
               
                alert.present();
            });
          }, () => {
            // Error in configuration
            
            let alert = this.alertCtrl.create({
              title:"Error",
              subTitle:"Error in configuration",
              buttons: ['OK']
              });
             
              alert.present();
          });
        }, () => {
          // Error in initialization, maybe PayPal isn't supported or something else
         
          let alert = this.alertCtrl.create({
            title:"Error",
            subTitle:"Error in initialization, maybe PayPal isn't supported or something else",
            buttons: ['OK']
            });
           
            alert.present();
        });

      }


  

}
