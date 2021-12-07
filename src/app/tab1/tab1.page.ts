import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ipAddress = '192.168.178.250';
  machines = [];

  constructor(private httpClient: HttpClient) { }

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
}