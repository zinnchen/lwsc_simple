import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  functions = [];
  cache = [];

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController, private appComponent: AppComponent) { }

  ionViewWillEnter() {
    this.sendGetMachines();
  }


  public sendGetMachines(){
    this.functions = [];
    this.httpClient.get<any>('http://' + this.appComponent.ipAddress + '/machine_count').subscribe(dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log( 'http://' + this.appComponent.ipAddress + '/machine?it=' + i );
        this.httpClient.get<any>('http://' + this.appComponent.ipAddress + '/machine?it=' + i).subscribe(data => {
          if(data.functions)
          {
            const lF = data.functions.length;
            console.log(lF);
            for (let j = 0; j < lF; j++)
            {
              console.log(data.functions[j]);
              if(data.functions[j])
              {
                this.functions.push(data.functions[j]);
              }
            }
          }
        });
      }
    });
  }

  clear()
  {
    this.cache = [];
  }

  add(fkt) {
    this.cache.push(fkt);
  }

  fire(fId, mId) {
    console.log('http://' + this.appComponent.ipAddress + '/fire?id=' + mId + '&f_id=' + fId);
    const x = this.httpClient.post<any>('http://' + this.appComponent.ipAddress + '/fire?id=' + mId + '&f_id=' + fId, '')
    .subscribe(data => {
      console.log(data);
      this.openToast(data.result + ': ' + data.roundtriptime + 'ms');
    });
  }

  async openToast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2000
    });
    toast.present();
  }
}
