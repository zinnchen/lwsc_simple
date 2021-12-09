import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { UDP } from '@frontall/capacitor-udp';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tableau', url: '/trigger-tableau', icon: 'apps' },
    { title: 'Blink', url: '/trigger-blink', icon: 'bulb' },
    { title: 'Liste', url: '/trigger-list', icon: 'reorder-four' },
    { title: 'Einzel', url: '/trigger-single', icon: 'locate' },
  ];

  public gatewayAdress = "172.24.10.58";

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.findGateway();
    } else {
      console.log("Running in web. No UDP available. Using static IP: " + this.gatewayAdress)
      this.openToast("Kann Gateway nicht finden. Nehme " + this.gatewayAdress)
    }
  }

  async findGateway() {
    UDP.create().then((info) => {
      ;
      const socketId = info.socketId;
      this.openToast(`Willkommen!`);
      UDP.bind({ socketId: info.socketId, address: '0.0.0.0', port: 5556 });
      UDP.addListener('receive', data => {

        const str = atob(data.buffer);
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }

        const msg = new TextDecoder().decode(buf);

        if (msg.startsWith('WIFIBRIDGE')) {
          const parts = msg.split(' ');
          this.gatewayAdress = parts[1];
          this.openToast('Gateway gefunden: ' + parts[1]);

          UDP.closeAllSockets();
        }
      });
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
