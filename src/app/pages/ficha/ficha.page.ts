import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

interface Bezeroa {
  id: number;
  izena: string;
  abizena: string;
  telefonoa: string;
  azalSentikorra: string; // Debe coincidir con la API
  sortzeData: string;
  eguneratzeData: string;
  ezabatzeData: string | null;
}


@Component({
  selector: 'app-cliente-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss']
})
export class FichaPage implements OnInit {
  bezeroa: Bezeroa | null = null;
  private apiUrl = 'http://localhost:8080/bezeroak';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private cd: ChangeDetectorRef 

  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarCliente(id);
    }
  }
  

  async cargarCliente(id: string) {
    const loading = await this.loadingCtrl.create({ message: 'Cargando...' });
    await loading.present();
  
    this.http.get<Bezeroa>(`${this.apiUrl}/${id}`).subscribe(
      async (data) => {
        console.log("✅ Datos recibidos de la API:", data);
  
        if (!data) {
          console.error("❌ La API devolvió NULL o un objeto vacío.");
          this.bezeroa = null; // Asigna null si los datos no existen
        } else {
          this.bezeroa = data;
          console.log("📌 Objeto bezeroa en Angular después de asignación:", this.bezeroa);
          this.cd.detectChanges(); // 🔥 Forzar actualización de la vista
        }
  
        await loading.dismiss();
      },
      async (error) => {
        console.error("❌ Error en la API:", error);
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo cargar la ficha del cliente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}  
