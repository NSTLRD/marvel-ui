import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser$Params } from 'src/app/services/fn/user-controller/register-user';
import { ErrorResponse, UserDto } from 'src/app/services/models';
import { UserControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMsg: Array<string> = [];
  countryCodes = [{ code: '+1', name: 'USA' }, { code: '+1', name: 'DR' }, { code: '+33', name: 'UK' }];
  cityCodes = [{ code: '212', name: 'New York' }, { code: '213', name: 'Los Angeles' },{ code: '100710', name: 'Santo Domingo' }];


  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: UserControllerService,
    ) {}

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])(?=\\S+$).{8,}$")]],
        confirmPassword: [''],
      }, {
        validator: this.mustMatch('password', 'confirmPassword') // Custom validator for matching passwords
      });
    }




    mustMatch(password: string, confirmPassword: string): (formGroup: FormGroup) => void {
      return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[password];
        const confirmPasswordControl = formGroup.controls[confirmPassword];
        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ mustMatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      };
    }


    register() {
      this.errorMsg = [];
      const user: UserDto = this.registerForm.value;
      const userEmail = this.registerForm.get('email')?.value;
      this.authService.registerUser({ body: user }).subscribe({
        next: (response) => {
          console.log("Registration successful, response:", response);
          if (userEmail) {
            localStorage.setItem('email', userEmail);
            console.log("Email stored in localStorage:", localStorage.getItem('email'));
            this.router.navigate(['/activate-account']);
          } else {
            console.error("No email to store in localStorage.");
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Error during registration:', errorResponse);
        }
      });
    }


  goBack() {
    this.router.navigate(['/login']);
  }
}
