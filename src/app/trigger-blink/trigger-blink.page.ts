import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { AppComponent } from '../app.component';


@Component({
  selector: 'app-trigger-blink',
  templateUrl: './trigger-blink.page.html',
  styleUrls: ['./trigger-blink.page.scss'],
})
export class TriggerBlinkPage implements OnInit {
  private machines = [];

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController, public appComponent: AppComponent) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.sendGetMachines();
  }

  doRefresh(event) {
    console.log('Begin refresh of machines');
    setTimeout(() => {
      this.sendGetMachines();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  public sendGetMachines() {
    this.machines = [];
    var machineCountUrl: string = "http://" + this.appComponent.gatewayAdress + "/machine_count";
    console.log("Trying to load machines using URL: "+machineCountUrl);
    this.httpClient.get<any>(machineCountUrl).subscribe(dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log('http://' + this.appComponent.gatewayAdress + '/machine?it=' + i);
        this.httpClient.get<any>('http://' + this.appComponent.gatewayAdress + '/machine?it=' + i).subscribe(data => {
          this.machines.push(data);
        });
      }
    });
  }

  blink(id) {
    console.log('http://' + this.appComponent.gatewayAdress + '/blink?id=' + id);
    const x = this.httpClient.post('http://' + this.appComponent.gatewayAdress + '/blink?id=' + id, '').subscribe(data => {
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
