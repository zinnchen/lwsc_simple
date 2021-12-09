import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { AppComponent } from '../app.component';
import { UdpHandlerService } from '../shared/udp-handler.service';


@Component({
  selector: 'app-trigger-blink',
  templateUrl: './trigger-blink.page.html',
  styleUrls: ['./trigger-blink.page.scss'],
})
export class TriggerBlinkPage implements OnInit {
  public machines = [];

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController, public udpService: UdpHandlerService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.sendGetMachines();
  }

  doRefresh(event) {
    console.log('Begin refresh of machines');
    setTimeout(async () => {
      await this.sendGetMachines();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  public async sendGetMachines() {
    this.machines = [];

    let machineCountUrl: string = "http://" + this.udpService.gatewayAdress + "/machine_count";
    console.log("Trying to load machines using URL: "+machineCountUrl);
    this.httpClient.get<any>(machineCountUrl).subscribe(async dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log('http://' + this.udpService.gatewayAdress + '/machine?it=' + i);
        const data = await this.httpClient.get<any>('http://' + this.udpService.gatewayAdress + '/machine?it=' + i).toPromise();
        this.machines.push(data);
      }
    });
  }

  blink(id) {
    console.log('http://' + this.udpService.gatewayAdress + '/blink?id=' + id);
    const x = this.httpClient.post('http://' + this.udpService.gatewayAdress + '/blink?id=' + id, '').subscribe(data => {
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
