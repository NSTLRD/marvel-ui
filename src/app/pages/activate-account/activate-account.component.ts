import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivateAccount$Params } from 'src/app/services/fn/user-controller/activate-account';
import { UserControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {
  activationCode: string = ''; // Holds the entered code
  userEmail: string = '';
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private authService: UserControllerService,
    private router: Router,
  ) { }

  onCodeCompleted(code: string) {
    this.activationCode = code;
  }

  ngOnInit() {
    // Get the email from the query parameters
    console.log('Email:', localStorage.getItem('email'));
    this.userEmail = localStorage.getItem('email') || 'example@example.com';
  }

  submitCode() {
    if (this.activationCode.length === 6) {
      this.submitted = true;

      const params: ActivateAccount$Params = {
        token: this.activationCode
      };

      this.authService.activateAccount(params).subscribe({
        next: (response) => {
          this.message = 'Account activated successfully';
          this.isOkay = true;
          localStorage.removeItem('userEmail');

          // Wait for 5 seconds before redirecting
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 8000); // 8000 milliseconds = 8 seconds
        },
        error: (error) => {
          this.message = 'There was an error activating your account: ' + error.error.message;
          this.isOkay = false;
        }
      });
    } else {
      this.message = 'Please enter the complete code.';
      this.isOkay = false;
    }
  }


  resendCode() {
    // Logic to handle resending the code
  }

}
