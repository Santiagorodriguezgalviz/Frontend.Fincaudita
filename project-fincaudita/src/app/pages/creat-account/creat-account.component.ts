import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-creat-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, NgbTypeaheadModule, RouterModule,  MatInputModule,
    MatAutocompleteModule],
  templateUrl: './creat-account.component.html',
  styleUrls: ['./creat-account.component.css']
})
export class CreatAccountComponent implements OnInit {
  currentStep: number = 1;

  person: any = {
    first_name: '', 
    last_name: '', 
    type_document: '', 
    document: '', 
    phone: '', 
    email: '', 
    birth_of_date: '',
    cityId: 0,
    addres: ''
  };

  user: any = {
    username: '',
    password: '',
    roles: []
  };

  citys: any[] = [];
  filteredCitys:  any[] = [];
  isModalOpen = false;
  termsAccepted: boolean = false;
  isCheckboxChecked = false;
  usernameStrength: number = 0; 
  usernameStrengthMessage: string = '';
  passwordStrength: number = 0;
  passwordStrengthMessage: string | null = null;

  private personApiUrl = 'http://localhost:9191/api/Person';
  private userApiUrl = 'http://localhost:9191/api/User';
  private citysUrl = 'http://localhost:9191/api/City';
  
  private personId: number | null = null;
  minDate?: string; 
  maxDate?: string;
  password: string = '';
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {
    this.setDateLimits();
  }

  updateUsernameStrength(usernameField: any): void {
    const username = usernameField.value;

    // Resetear fuerza y mensaje
    this.usernameStrength = 0;
    this.usernameStrengthMessage = '';

    // Evaluar fuerza del nombre de usuario
    const lengthCriteria = username.length >= 4 && username.length <= 15; 
    const uppercaseCriteria = /[A-Z]/.test(username); 
    const lowercaseCriteria = /[a-z]/.test(username); 

    const criteriaMet = [lengthCriteria, uppercaseCriteria, lowercaseCriteria].filter(Boolean).length;

    this.usernameStrength = criteriaMet / 3; 

  }

updatePasswordStrength(passwordField: any): void {
  if (passwordField.value) {
    const lengthCriteria = passwordField.value.length >= 8 ? 1 : 0;
    const uppercaseCriteria = /[A-Z]/.test(passwordField.value) ? 1 : 0;
    const numberCriteria = /\d/.test(passwordField.value) ? 1 : 0;
    
    this.passwordStrength = lengthCriteria + uppercaseCriteria + numberCriteria;

  }
}

  onInputChange(field: any) {
    field.control.updateValueAndValidity();
  }

  setDateLimits() {
    const today = new Date();

    // Calcular la fecha máxima (70 años atrás)
    const maxYear = today.getFullYear() - 18; 
    const maxMonth = today.getMonth() + 1; 
    const maxDay = today.getDate();

    // Establecer el formato YYYY-MM-DD
    this.maxDate = `${maxYear}-${this.pad(maxMonth)}-${this.pad(maxDay)}`;


    // Calcular la fecha mínima (70 años atrás)
    const minYear = today.getFullYear() - 70; 
    this.minDate = `${minYear}-${this.pad(maxMonth)}-${this.pad(maxDay)}`;

  }

  pad(num: number): string {
    return num < 10 ? '0' + num : '' + num; 
  }

  onCheckboxChange(): void {
    if (this.isCheckboxChecked) {
      this.openModal(); 
    } else {
      this.closeModal(); 
    }
  }

  searchCitys(event: any): void {
    const term = event.target.value.toLowerCase();
    this.filteredCitys = this.citys.filter(city => 
      city.name.toLowerCase().includes(term)
    );
  }

  onCitySelect(event: any): void {
    const selectedcity = this.citys.find(city => 
      city.name === event.option.value
    );
    if (selectedcity) {
        this.person.cityId = selectedcity.id;
        this.person.cityName = selectedcity.name; 
        this.filteredCitys = [];
    }
}

  ngOnInit(): void {
    this.getCitys();
    const storedPerson = sessionStorage.getItem('person');
    const storedTermsAccepted = sessionStorage.getItem('termsAccepted');

    if (storedPerson) {
      this.person = JSON.parse(storedPerson);
    }
    if (storedTermsAccepted) {
      this.termsAccepted = JSON.parse(storedTermsAccepted);
    }
  }

    openModal(): void {
      this.isModalOpen = true;
    }
  
    closeModal(): void {
      this.isModalOpen = false;
    }

    onTermsChange(event: any) {
      this.termsAccepted = event.target.checked; 
    }

  acceptTerms(): void {
    this.termsAccepted = true;
    this.showAlert()
    this.closeModal();
  }

  getCitys(): void {
    this.http.get<any[]>(this.citysUrl).subscribe(
      (citys) => {
        this.citys = citys;
        this.filteredCitys;
      },
      (error) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getCityName(cityId: number): string {
    const city = this.citys.find(c => c.id === cityId);
    return city ? city.name : 'Desconocido';
  }

  nextStep(): void {
    sessionStorage.setItem('person', JSON.stringify(this.person));
    sessionStorage.setItem('termsAccepted', JSON.stringify(this.termsAccepted));

    if (this.currentStep === 1 && this.validateStep1()) {
        this.currentStep++;
    } else if (this.currentStep === 2) {
        if (!this.termsAccepted) {
            Swal.fire({
                title: 'Debe aceptar los términos y condiciones',
                text: 'Por favor, acepte los términos y condiciones antes de continuar.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                background: '#ffffff',
                color: '#721c24',
                padding: '20px',
                showClass: {
                    popup: 'animate_animated animate_fadeInDown'
                },
                hideClass: {
                    popup: 'animate_animated animate_fadeOutUp'
                },
                customClass: {
                    title: 'swal-title',
                    popup: 'swal-popup'
                }
            });
        } else if (this.validateStep2()) {
            this.currentStep++;
        }
    } else if (this.currentStep === 3) {
        this.onSubmit();
    }
}

showAlert(): void {
  Swal.fire({
    title: 'Términos Aceptados',
    text: 'Has aceptado los términos y condiciones.',
    icon: 'success',
    confirmButtonText: 'Entendido',
    background: '#ffffff',
    color: '#721c24',
    padding: '20px',
    showClass: {
      popup: 'animate_animated animate_fadeInDown'
    },
    hideClass: {
      popup: 'animate_animated animate_fadeOutUp'
    },
    customClass: {
      title: 'swal-title',
      popup: 'swal-popup'
    }
  });
}

  validateStep1(): boolean {
    if (!this.person.first_name || !this.person.last_name || !this.person.type_document || 
        !this.person.document || !this.person.phone || !this.person.birth_of_date) {
      Swal.fire({
        title: '¡Error!',
        text: 'Todos los campos del primer paso son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        background: '#ffffff',
        color: '#721c24', 
        padding: '20px', 
        showClass: {
          popup: 'animate_animated animate_fadeInDown'
        },
        hideClass: {
          popup: 'animate_animated animate_fadeOutUp'
        },
        customClass: {
          title: 'swal-title',
          popup: 'swal-popup'
        }
      });
      return false;
    }

    return true;
  }
  
  validateStep2(): boolean {
    if (!this.person.cityId || !this.person.addres || !this.person.email || !this.validateEmail(this.person.email)) {
        Swal.fire({
            title: '¡Error!',
            text: 'Todos los campos del segundo paso son obligatorios y el correo debe ser válido.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            background: '#ffffff',
            color: '#721c24',
            padding: '20px',
            showClass: {
                popup: 'animate_animated animate_fadeInDown'
            },
            hideClass: {
                popup: 'animate_animated animate_fadeOutUp'
            },
            customClass: {
                title: 'swal-title',
                popup: 'swal-popup'
            }
        });
        return false;
    }

    return true;
}

  validateLetters(input: string): boolean {
    const lettersPattern = /^[A-Za-zÀ-ÿ\s]+$/; 
    return lettersPattern.test(input);
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('Password') as HTMLInputElement; // Cambié 'password' a 'Password'
    const icon = document.getElementById('togglePassword');
  
    if (passwordInput) { // Verifica que el input no sea nulo
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon?.classList.remove('fa-eye');
        icon?.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon?.classList.remove('fa-eye-slash');
        icon?.classList.add('fa-eye');
      }
    }
  }
  

  filterInput(event: any): void {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    event.target.value = filteredValue;
    if (event.target.name === 'first_name') {
      this.person.first_name = filteredValue;
    } else if (event.target.name === 'last_name') {
      this.person.last_name = filteredValue;
    }
  }

  // Método para validar el formato de la dirección
  isValidAddress: boolean = false;

  validateAddress(address: string): void {
    // Patrón que acepta "Calle", "Carrera" o "Transversal", seguido de un número, el símbolo #, otro número y un guion con más números
    const addressPattern = /^(Calle|Carrera|Transversal)\s\d+\s#\s\d+-\d+$/i;
    this.isValidAddress = addressPattern.test(address);
  }
  
  
  
  validateNumber(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (allowedKeys.indexOf(event.key) !== -1) {
      return; 
    }
    if (event.key.length === 1 && !/^\d$/.test(event.key)) {
      event.preventDefault(); 
    }
  }
  emailError: string = '';

  validateEmail(email: string): { valid: boolean; message?: string } {
    if (!email) {
      return { valid: false, message: 'El correo es obligatorio.' };
    }
    if (!email.includes('@')) {
      return { valid: false, message: 'El símbolo "@" es obligatorio.' };
    }
    if (!email.endsWith('.com')) {
      return { valid: false, message: 'El dominio debe terminar con ".com".' };
    }
    const re = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;
    if (!re.test(String(email).toLowerCase())) {
      return { valid: false, message: 'El correo debe ser de Gmail o Hotmail y no debe contener caracteres especiales.' };
    }
    return { valid: true };
  }
  
  onEmailChange() {
    const validation = this.validateEmail(this.person.email);
    if (!validation.valid) {
      this.emailError = validation.message || '';
    } else {
      this.emailError = ''; 
    }
  }
  
usernameError: string = '';

isValidUsername(username: string): boolean {
  if (!username || username.length < 4 || username.length > 15) {
    this.usernameError = 'El nombre de usuario debe tener entre 4 y 15 caracteres.';
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(username);
  const hasLowerCase = /[a-z]/.test(username);
  const hasInvalidCharacters = /[^a-zA-Z]/.test(username);

  if (!hasUpperCase || !hasLowerCase || hasInvalidCharacters) {
    this.usernameError = 'El nombre de usuario debe contener al menos una mayúscula, una minúscula y no debe contener números ni caracteres especiales.';
    return false;
  }

  this.usernameError = '';
  return true;
}

passwordError: string = '';

isValidPassword(password: string): boolean {
  if (!password || password.length < 8) {
    this.passwordError = 'La contraseña debe tener al menos 8 caracteres.';
    return false;
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasUpperCase) {
    this.passwordError = 'La contraseña debe contener al menos una mayúscula.';
    return false;
  }

  if (!hasNumber) {
    this.passwordError = 'La contraseña debe contener al menos un número.';
    return false;
  }

  this.passwordError = '';
  return true;
}

  prevStep(): void {
    
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  confirmExit(): void {
    Swal.fire({
      title: '<strong>¿Estás seguro?</strong>',
      html: `
        <p>Si sales, perderás todos los datos ingresados.</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-check-circle"></i> Sí, salir',
      cancelButtonText: '<i class="fa fa-times-circle"></i> Cancelar',
      reverseButtons: true,
      confirmButtonColor: '#44E32A', 
      cancelButtonColor: '#ff0000',
      timer: 10000, 
      timerProgressBar: true, 
      showClass: {
        popup: 'animate_animated animate_fadeInDown'
      },
      hideClass: {
        popup: 'animate_animated animate_fadeOutUp'
      },
      customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
        popup: 'custom-popup',
        title: 'custom-title',
        htmlContainer: 'custom-html'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
        sessionStorage.clear();
      }
    });
  }

  onSubmit(): void {
    if (!this.person.cityId) {
      Swal.fire('Error', 'Debe seleccionar una ciudad válida.', 'error');
      return;
    }

  
    this.person.birth_of_date = this.person.birth_of_date;
    this.person.document = this.person.document.toString();
  
    this.http.post<any>(this.personApiUrl, this.person).subscribe({
      next: (response) => {
        this.personId = response.id;


        
        sessionStorage.clear();
  
        this.submitUserData();
      },
      error: () => {
        Swal.fire('Error', 'Hubo un problema al enviar los datos de la persona', 'error');
      }
    });
  }

  clearSessionData(): void {
    this.person = {
      first_name: '', last_name: '', type_document: '', document: '', phone: '',
      email: '', birth_of_date: '', cityId: 0, addres: ''
    };
    this.user = { username: '', password: '', roles: [] };
    this.termsAccepted = false;
    sessionStorage.removeItem('person');
    sessionStorage.removeItem('termsAccepted');
}

  private submitUserData(): void {
    if (this.personId === null) {
      Swal.fire('Error', 'No se pudo obtener el ID de la persona.', 'error');
      return;
    }

    const userData = {
      username: this.person.first_name + this.person.last_name,
      password: this.user.password,
      roles: [{ id: 7 }],
      personId: this.personId
    };

    this.http.post(this.userApiUrl, userData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Cuenta creada con éxito', 'success');
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire('Error', 'Hubo un problema al enviar los datos del usuario', 'error');
      }
    });
  }
}