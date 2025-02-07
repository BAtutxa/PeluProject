import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductComponent } from 'src/app/shared/product/product.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  selectedTab: string = 'productos';
  productos: any[] = [];
  materiales: any[] = [];
  categorias: any[] = [];

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.loadProductos();
    this.loadMateriales();
    this.loadCategorias();
  }

  loadProductos() {
    this.http.get<any[]>('http://localhost:8080/produktuak').subscribe({
      next: (data) => {
        console.log("✅ Datos recibidos del backend:", data);
  
        this.productos = data.map(p => ({
          id: p.id,
          nombre: p.izena, 
          descripcion: p.deskribapena,
          categoria: p.kategoriak?.izena ?? "Sin categoría", // ✅ Manejo seguro de categoría
          marca: p.marka,
          stock: p.stock,
          stockAlerta: p.stockAlerta
        }));
  
        console.log("✅ Productos asignados:", this.productos);
      },
      error: (err) => {
        console.error("❌ Error en la petición:", err);
      }
    });
  }

  loadMateriales() {
    this.http.get<any[]>('http://localhost:8080/materialak').subscribe(data => {
      this.materiales = data;
    });
  }

  loadCategorias() {
    this.http.get<any[]>('http://localhost:8080/kategoriak').subscribe(data => {
      this.categorias = data;
    });
  }

  async openModal(tipo: string, item?: any) {
    const modal = await this.modalCtrl.create({
      component: ProductComponent,
      componentProps: { tipo, item, categorias: this.categorias },
    });
    await modal.present();
  }

  deleteItem(tipo: string, id: number) {
    const url = tipo === 'producto' ? 'http://localhost:8080/produktuak' : 'http://localhost:8080/materialak';
    this.http.delete(`${url}/${id}`).subscribe(() => {
      if (tipo === 'producto') {
        this.productos = this.productos.filter(p => p.id !== id);
      } else {
        this.materiales = this.materiales.filter(m => m.id !== id);
      }
    });
  }
}
