import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  machines = [];
  name = '';

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController, public appComponent: AppComponent) { }


  ionViewWillEnter() {
    this.sendGetMachines();
  }


  public sendGetMachines(){
    this.machines = [];
    this.httpClient.get<any>('http://' + this.appComponent.ipAddress + '/machine_count').subscribe(dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log( 'http://' + this.appComponent.ipAddress + '/machine?it=' + i );
        this.httpClient.get<any>('http://' + this.appComponent.ipAddress + '/machine?it=' + i).subscribe(data => {
          this.machines.push(data);
        });
      }
    });
  }

  blink(id) {
    console.log('http://' + this.appComponent.ipAddress + '/blink?id=' + id);
    const x = this.httpClient.post('http://' + this.appComponent.ipAddress + '/blink?id=' + id, '').subscribe(data => {
      console.log(data);
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
