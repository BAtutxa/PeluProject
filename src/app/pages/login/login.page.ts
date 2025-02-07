import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AutentificadorService } from 'src/app/service/autentificador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AutentificadorService, private router: Router) {} 

  onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, ingresa usuario y contraseña');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);

        localStorage.setItem('user', JSON.stringify(response));

        const role = response.role === 'IK' ? 'ADMIN' : 'ALUMNO';

        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'ALUMNO') {
          this.router.navigate(['/alumno']);
        } else {
          alert('Rol desconocido, contacta con soporte.');
        }
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
      },
    });
  }
}