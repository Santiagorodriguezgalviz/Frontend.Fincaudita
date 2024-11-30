import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landig-page',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './landig-page.component.html',
  styleUrls: ['./landig-page.component.css']
})
export class LandigPageComponent {
  showLoginModal = false;
  loginData = {
    email: "",
    password: ""
  };

  constructor(private router: Router) {} // Inyecta el Router

  services = [
    {
      title: "Distribución Global",
      description: "Red eficiente de logística y distribución mundial que garantiza la entrega oportuna de productos agrícolas premium",
      image: "card-servicios.jpg"
    },
    {
      title: "Control de Calidad",
      description: "Procesos integrales de control de calidad y certificación que cumplen con los estándares internacionales",
      image: "card-servicios2.jpg"
    },
    {
      title: "Análisis de Mercado",
      description: "Información detallada del mercado y análisis de tendencias para optimizar tus inversiones agrícolas",
      image: "card-servicios3.jpg"
    }
  ];
  

  qualityStandards = [
    "Sistema de Gestión de Seguridad Alimentaria Certificado ISO 22000",
    "Certificación Global G.A.P. para Excelencia Agrícola",
    "Certificación Orgánica que Cumple Estándares Internacionales",
    "Prácticas de Agricultura Sostenible y Gestión Ambiental",
    "Trazabilidad Completa y Transparencia en la Cadena de Suministro"
  ];

  scrollToContact(): void {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  openLoginModal(): void {
    this.showLoginModal = true;
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  handleLogin(): void {
    console.log("Login attempted with:", this.loginData);
    this.closeLoginModal();

    // Navega a la página de login o a cualquier ruta específica
    this.router.navigate(['/login']); // Asegúrate de tener configurada esta ruta en tu enrutador
  }
  
  openContactModal(): void {
    // Aquí puedes agregar el código para abrir el modal de contacto
    // Por ejemplo, puedes mostrar un modal con un formulario de contacto
    // o enviar un correo electrónico a un destinatario específico
    console.log("Abrir modal de contacto");
  }
}
