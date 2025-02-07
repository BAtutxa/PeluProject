import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() item: any = {};
  @Input() isEditing: boolean = false;
  categorias: any[] = [];  // Aquí se almacenarán las categorías

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.loadCategorias(); // Cargar categorías cuando se abre el modal
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  loadCategorias() {
    this.http.get<any[]>('http://localhost:8080/kategoriak').subscribe({
      next: (data) => {
        this.categorias = data;
        console.log("✅ Categorías cargadas:", this.categorias);
      },
      error: (err) => {
        console.error("❌ Error al cargar categorías:", err);
      }
    });
  }

  saveItem() {
    if (!this.item.nombre || !this.item.kategoria || !this.item.marka || this.item.stock < 0) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const producto = {
      izena: this.item.nombre,
      deskribapena: this.item.descripcion || "",
      kategoriak: { id: this.item.kategoria },  // Enviar solo el ID de la categoría
      marka: this.item.marka,
      stock: this.item.stock
      
    };

    if (this.isEditing) {
      this.http.put(`http://localhost:8080/produktuak/${this.item.id}`, producto).subscribe({
        next: () => {
          console.log("✅ Producto editado correctamente.");
          this.modalCtrl.dismiss(true);
        },
        error: (err) => {
          console.error("❌ Error al editar producto:", err);
        }
      });
    } else {
      this.http.post(`http://localhost:8080/produktuak`, producto).subscribe({
        next: () => {
          console.log("✅ Producto añadido correctamente.");
          this.modalCtrl.dismiss(true);
        },
        error: (err) => {
          console.error("❌ Error al añadir producto:", err);
        }
      });
    }
  }
}
