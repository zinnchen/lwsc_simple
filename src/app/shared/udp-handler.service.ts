import { Injectable } from "@angular/core";
import { UDP } from "@frontall/capacitor-udp";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: "root"
})
export class UdpHandlerService {

    public gatewayAdress = "172.24.10.58";

    constructor(private toastCtrl: ToastController) { }

    async findGateway() {
        UDP.create().then((info) => {
            console.log(info)
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
                    console.log("Gateway found: " + this.gatewayAdress)
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