import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ipAddress = '192.168.178.250';

  functions = [];

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    this.sendGetMachines();
  }


  public sendGetMachines(){
    this.functions = [];
    this.httpClient.get<any>('http://' + this.ipAddress + '/machine_count').subscribe(dataL => {
      const l = dataL.count;

      for (let i = 0; i < l; i++) {
        console.log( 'http://' + this.ipAddress + '/machine?it=' + i );
        this.httpClient.get<any>('http://' + this.ipAddress + '/machine?it=' + i).subscribe(data => {
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

  fire(fId, mId) {
    console.log('http://' + this.ipAddress + '/fire?id=' + mId + '&f_id=' + fId);
    const x = this.httpClient.post<any>('http://' + this.ipAddress + '/fire?id=' + mId + '&f_id=' + fId, '').subscribe(data => {
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
