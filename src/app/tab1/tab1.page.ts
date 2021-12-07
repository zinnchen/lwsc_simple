import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import 'capacitor-udp';
import {UdpPluginUtils, IUdpPlugin} from 'capacitor-udp';
import {Plugins} from '@capacitor/core';
const {UdpPlugin} = Plugins;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ipAddress = '192.168.178.250';
  machines = [];
  name = '';

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController) { }

  async process() {
    const plg: IUdpPlugin = UdpPlugin as IUdpPlugin;

    plg.closeAllSockets().then(() => {
      this.openToast('all sockets closed');
      plg.create({properties: {name: 'tello_command', bufferSize: 2048}}).then((info) => {
          const socketId = info.socketId;
          this.openToast(`Created socked : socketId: ${socketId}`);
          plg.bind({socketId: info.socketId, address: '0.0.0.0', port: 5556});
          plg.addListener('receive', data => {
            this.openToast('receive:' + data);
          });
      });
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.sendGetMachines();
  }


  public sendGetMachines(){
    this.machines = [];
    this.httpClient.get<any>('http://' + this.ipAddress + '/machine_count').subscribe(dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log( 'http://' + this.ipAddress + '/machine?it=' + i );
        this.httpClient.get<any>('http://' + this.ipAddress + '/machine?it=' + i).subscribe(data => {
          this.machines.push(data);
        });
      }
    });
  }

  blink(id) {
    console.log('http://' + this.ipAddress + '/blink?id=' + id);
    const x = this.httpClient.post('http://' + this.ipAddress + '/blink?id=' + id, '').subscribe(data => {
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
