import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../guard/auth.service';
import { CommonModule } from '@angular/common';
import { SvgsComponent } from '../svgs/svgs.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule, SvgsComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:9191/login'; 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}
  
  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleIcon = document.getElementById('togglePassword') as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye');
    }
  }

  onSubmit(form: NgForm): void {
    const loginData = { username: this.username, password: this.password };
  
    this.http.post(this.apiUrl, loginData).subscribe(
      (response: any) => {
        if (response) {
          localStorage.setItem("menu", JSON.stringify(response));
          this.authService.login();
  
          // Alerta de bienvenida
          Swal.fire({
            title: '¡Bienvenido a Fincaudita!',
            html: `
            <div style="text-align: center;">
            
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
<svg fill="#96ff82" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120px" height="120px" viewBox="0 0 114.008 114.008" xml:space="preserve" stroke="#96ff82">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g> <g> <path d="M99.221,81.124c-4.931-6.69-11.385-11.681-18.191-16.115c-5.523-3.59-11.811-2.827-17.669-0.482 c-0.366,0.146-0.732,0.223-1.099,0.346c-0.202-1.007-0.346-1.988-0.619-3.022c-0.486-1.913-1.16-3.822-1.807-5.709 c-0.75-1.94-1.562-3.864-2.547-5.698c-0.491-0.917-0.985-1.836-1.552-2.706c-0.527-0.896-1.122-1.733-1.721-2.568 c-0.568-0.853-1.254-1.605-1.869-2.397c-0.648-0.763-1.338-1.475-1.993-2.19c-0.708-0.666-1.377-1.348-2.081-1.959 c-0.729-0.589-1.396-1.211-2.116-1.727c-1.417-1.08-2.829-1.986-4.16-2.769c-0.678-0.371-1.326-0.726-1.946-1.066 c-0.638-0.294-1.24-0.579-1.809-0.843c-1.131-0.529-2.173-0.873-3-1.213c-1.706-0.551-2.681-0.869-2.681-0.869 s0.957,0.364,2.632,0.992c0.806,0.382,1.826,0.773,2.922,1.355c0.551,0.291,1.136,0.596,1.752,0.926 c0.594,0.361,1.216,0.743,1.868,1.143c1.276,0.833,2.622,1.793,3.953,2.919c0.685,0.535,1.311,1.184,1.99,1.79 c0.659,0.628,1.28,1.328,1.939,2.009c0.602,0.726,1.241,1.449,1.829,2.221c0.558,0.799,1.188,1.555,1.699,2.411 c0.541,0.832,1.076,1.672,1.542,2.558c0.508,0.866,0.943,1.774,1.371,2.685c0.869,1.819,1.552,3.711,2.173,5.554 c0.561,1.956,1.113,3.814,1.492,5.649c0.222,1.054,0.4,2.087,0.547,3.1c-2.467,0.459-4.905,0.363-7.299-0.362 c-4.598-1.39-9.223-1.54-13.919-1.554c-2.011-0.007-3.682,0.694-4.882,2.275c-0.669,0.883,4.812,4.552,9.512,4.552 C42.61,72.1,27.416,68.41,25.39,68.561l-11.502-1.472c-4.083-0.328-4.079-1.875-8.095,0.404c-0.135,0.075-0.332,0.075-0.5,0.068 c-2.233-0.134-3.498,0.582-4.738,2.057c-0.719,0.855-0.659,1.902-0.277,2.902c0.402,1.04,1.425,0.77,2.271,1.105 c5.14,2.039,6.798,3.028,13.772,4.75c4.959,1.225,9.788,2.724,14.743,3.839c2.047,0.466,4.127,0.814,5.974,1.852 c3.925,2.204,8.092,2.878,12.575,2.673c5.083-0.232,10.186-0.027,15.282-0.055c8.945-0.041,15.742,3.539,20.338,11.416 l28.776-0.062C107.732,90.702,104.964,88.919,99.221,81.124z"/> <path d="M59.129,51.389c0.08,0.313,0.207,0.578,0.264,0.751c0.073,0.174,0.114,0.272,0.114,0.272s0.079-0.063,0.236-0.178 c0.137-0.123,0.373-0.287,0.605-0.515c0.5-0.448,1.14-1.116,1.772-1.949c0.637-0.83,1.264-1.833,1.808-2.939 c0.54-1.11,1.006-2.32,1.338-3.567c0.691-2.488,0.831-5.126,0.554-7.209c-0.13-1.037-0.352-1.93-0.564-2.575 c-0.078-0.315-0.201-0.578-0.264-0.75c-0.071-0.18-0.112-0.274-0.112-0.274s-0.086,0.063-0.239,0.178 c-0.138,0.12-0.377,0.284-0.606,0.517c-0.503,0.452-1.146,1.114-1.776,1.944c-1.283,1.662-2.484,4.016-3.14,6.511 c-0.337,1.244-0.544,2.527-0.631,3.758c-0.091,1.23-0.048,2.411,0.084,3.447C58.697,49.85,58.922,50.747,59.129,51.389z"/> <path d="M47.716,34.839c0.081,0.315,0.202,0.577,0.262,0.75c0.077,0.178,0.116,0.274,0.116,0.274s0.081-0.06,0.234-0.177 c0.137-0.123,0.372-0.287,0.603-0.515c0.501-0.452,1.143-1.114,1.774-1.949c0.633-0.83,1.265-1.833,1.804-2.939 c0.544-1.107,1.006-2.32,1.343-3.567c0.69-2.488,0.83-5.126,0.556-7.204c-0.131-1.042-0.357-1.935-0.563-2.577 c-0.085-0.315-0.203-0.577-0.263-0.75c-0.077-0.178-0.117-0.277-0.117-0.277s-0.083,0.063-0.237,0.18 c-0.137,0.118-0.372,0.288-0.603,0.515c-0.505,0.452-1.146,1.114-1.776,1.946c-1.283,1.66-2.484,4.011-3.14,6.511 c-0.337,1.247-0.544,2.529-0.631,3.759c-0.091,1.23-0.05,2.411,0.084,3.448C47.285,33.301,47.509,34.197,47.716,34.839z"/> <path d="M35.632,53.331c-0.281,0.161-0.501,0.351-0.655,0.452c-0.151,0.123-0.231,0.187-0.231,0.187s0.08,0.063,0.231,0.182 c0.15,0.097,0.371,0.287,0.659,0.448c0.564,0.364,1.374,0.812,2.341,1.203c1.942,0.802,4.524,1.345,7.107,1.321 c1.292-0.003,2.586-0.144,3.795-0.381c1.211-0.236,2.337-0.585,3.304-0.989c0.97-0.396,1.772-0.844,2.337-1.213 c0.284-0.161,0.504-0.349,0.659-0.448c0.147-0.122,0.23-0.182,0.23-0.182s-0.08-0.066-0.234-0.183 c-0.151-0.101-0.375-0.287-0.655-0.445c-0.568-0.364-1.377-0.809-2.344-1.198c-0.972-0.397-2.103-0.739-3.316-0.97 c-1.211-0.232-2.501-0.361-3.795-0.357c-2.582-0.012-5.164,0.546-7.096,1.362C37.006,52.511,36.2,52.963,35.632,53.331z"/> <path d="M24.839,41.089c0.595,0.32,1.44,0.695,2.437,1.003c2,0.638,4.622,0.959,7.193,0.715c1.287-0.113,2.562-0.358,3.747-0.702 c1.184-0.335,2.281-0.78,3.213-1.261c0.931-0.478,1.696-0.992,2.225-1.405c0.27-0.187,0.474-0.39,0.616-0.505 c0.144-0.13,0.218-0.204,0.218-0.204s-0.084-0.057-0.245-0.157c-0.161-0.087-0.395-0.253-0.693-0.39 c-0.594-0.315-1.437-0.693-2.44-0.998c-0.999-0.31-2.154-0.562-3.381-0.688c-1.227-0.128-2.527-0.15-3.812-0.038 c-2.573,0.207-5.099,0.98-6.961,1.956c-0.927,0.476-1.695,0.994-2.224,1.411c-0.271,0.187-0.474,0.392-0.618,0.505 c-0.141,0.134-0.214,0.204-0.214,0.204s0.085,0.055,0.25,0.161C24.307,40.785,24.544,40.953,24.839,41.089z"/> </g> </g> </g>
</svg>
 <p style="font-size: 18px; margin-top: 15px;">El futuro de la auditoría de cultivos está aquí.</p>
  </div>
 `,
            background: '#f4f6f9', // Fondo claro
            timer: 2000, // Tiempo de la alerta
            timerProgressBar: true, // Barra de progreso del temporizador
            showConfirmButton: false, // Sin botón de confirmación
            didOpen: () => {
              const content = Swal.getHtmlContainer();
              if (content) {
                content.style.fontSize = '16px'; // Ajuste de tamaño de fuente
              }
            }
          }).then(() => {
            this.router.navigate(['/dashboard/home']); // Redirección tras la alerta
          });
          
        } else {
          this.showCreateAccountAlert();
        }
      },
      (error) => {
        this.showCreateAccountAlert();
      }
    );
  }
  
  private showCreateAccountAlert() {
    Swal.fire({
      title: '<strong>¡Credenciales incorrectas!</strong>',
      html: `
        <p>No tienes una cuenta registrada. ¿Deseas <strong>crear una cuenta</strong> ahora?</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-user-plus"></i> Crear cuenta',
      cancelButtonText: '<i class="fa fa-times-circle"></i> Cancelar',
      reverseButtons: true,
      confirmButtonColor: '#55d573',
      cancelButtonColor: '#ff0000',
      timer: 10000, 
      timerProgressBar: true, 
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
        popup: 'custom-popup',  // Personalización del cuadro de diálogo
        title: 'custom-title',  // Estilo personalizado para el título
        htmlContainer: 'custom-html'  // Estilo para el contenido HTML
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/creat-account']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}  

