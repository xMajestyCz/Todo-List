import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertCtrl: AlertController) {}

  async presentConfirmAlert(options: {
    header: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
  }) {
    const alert = await this.alertCtrl.create({
      header: options.header,
      buttons: [
        {
          text: options.cancelText || 'Cancel',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: options.confirmText || 'OK',
          cssClass: 'alert-button-confirm',
          handler: options.onConfirm
        }
      ]
    });
    await alert.present();
  }
}