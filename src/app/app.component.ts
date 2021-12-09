import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { UDP } from '@frontall/capacitor-udp';
import { ToastController } from '@ionic/angular';
import { UdpHandlerService } from './shared/udp-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Tableau', url: '/trigger-tableau', icon: 'apps' },
    { title: 'Blinken', url: '/trigger-blink', icon: 'bulb' },
    // { title: 'Liste', url: '/trigger-list', icon: 'reorder-four' },
    { title: 'Einzel', url: '/trigger-single', icon: 'locate' },
  ];

  constructor(private udpService: UdpHandlerService) { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      console.log("Trying to find gateway via UDP.")
      this.udpService.findGateway();
    } else {
      console.log("Running in web. No UDP available. Using static IP: " + this.udpService.gatewayAdress)
      this.udpService.openToast("Kann Gateway nicht finden. Nehme " + this.udpService.gatewayAdress)
    }
  }

}
