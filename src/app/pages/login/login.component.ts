import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/services/models';
import { UserControllerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';
import { ErrorResponse } from '../../services/models/error-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginRequest: LoginDto = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private authService: UserControllerService,
    private router: Router,
    private tokenService: TokenService

  ) { }

  navigateToRegister() {
    this.router.navigate(['/register']); // Use Angular Router to navigate
  }

  login() {
    this.errorMsg = []; // Clear any existing error messages
    this.authService.loginUser({ body: this.loginRequest }).subscribe({
      next: (response) => {
        this.tokenService.token = response.token as string;
        this.router.navigate(['/home']);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.error('Error during login:', errorResponse);

        // Extracting the error message from the 'error' object within the HttpErrorResponse
        const errorInfo: ErrorResponse = errorResponse.error;
        const message = errorInfo.messageError || 'An unexpected error occurred. Please try again later.';

        this.errorMsg.push(message);
      }
    });
}




  register() {
    this.errorMsg = [];
    this.router.navigate(['/register']);
  }

}
