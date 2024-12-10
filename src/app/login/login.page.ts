import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} 

  onLogin() {

    if (this.username === 'admin' && this.password === '1234') {
      console.log('Login exitoso');
      // Redirige a la página Home
      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales incorrectas');
      alert('Usuario o contraseña incorrectos');
    }
  }
}
