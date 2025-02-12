import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TxandakService } from 'src/app/service/txandak.service';
@Component({
  selector: 'app-txandak',
  templateUrl: './txandak.page.html',
  styleUrls: ['./txandak.page.scss'],
})
export class TxandakPage implements OnInit {
  txandakList: any[] = []; // <-- Inicializamos como array vacío

  constructor(
    private txandakService: TxandakService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadTxandak();
  }

  loadTxandak() {
    this.txandakService.getAll().subscribe(
      (data) => {
        console.log('Datos cargados:', data);
        this.txandakList = data || []; // Evita errores si `data` es null
      },
      (error) => {
        console.error('Error al cargar los turnos:', error);
        this.txandakList = [];
      }
    );
  }

  async deleteTxanda(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro que deseas eliminar este turno?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.txandakService.delete(id).subscribe(() => this.loadTxandak());
          },
        },
      ],
    });
    await alert.present();
  }
}
