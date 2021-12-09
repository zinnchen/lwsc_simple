import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { UdpHandlerService } from '../shared/udp-handler.service';

@Component({
  selector: 'app-trigger-single',
  templateUrl: './trigger-single.page.html',
  styleUrls: ['./trigger-single.page.scss'],
})
export class TriggerSinglePage implements OnInit {

  private functions = [];

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController, private udpService: UdpHandlerService) { }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sendGetMachines();
  }

  doRefresh(event) {
    console.log('Begin refresh of machines and functions');
    setTimeout(async () => {
      await this.sendGetMachines();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  public async sendGetMachines() {
    this.functions = [];
    const countData = await this.httpClient.get<any>('http://' + this.udpService.gatewayAdress + '/machine_count').toPromise();
    const machineCount = countData.count;

    for (let i = 0; i < machineCount; i++) {
      console.log('http://' + this.udpService.gatewayAdress + '/machine?it=' + i);
      const data = await this.httpClient.get<any>('http://' + this.udpService.gatewayAdress + '/machine?it=' + i).toPromise();

      if (data.functions) {
        const functionsSize = data.functions.length;
        console.log(functionsSize);
        for (let j = 0; j < functionsSize; j++) {
          console.log(data.functions[j]);
          if (data.functions[j]) {
            this.functions.push(data.functions[j]);
          }
        }
      }
    }
  }

  async fire(fId, mId) {
    console.log('http://' + this.udpService.gatewayAdress + '/fire?id=' + mId + '&f_id=' + fId);
    const data = await this.httpClient.post<any>('http://' + this.udpService.gatewayAdress + '/fire?id=' + mId + '&f_id=' + fId, '').toPromise();
    console.log(data);
    this.openToast(data.result + ': ' + data.roundtriptime + 'ms');
  }

  async openToast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2000
    });
    toast.present();
  }

}
