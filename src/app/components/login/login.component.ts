import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['user', Validators.required], // Default to user role
  });

  // Define roles array and selectedRole variable
  roles = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];

  selectedRole: string = 'user'; // Default to 'user'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  get role() {
    return this.loginForm.controls['role'];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      (response) => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          const isAdmin = response[0].isAdmin || false; // Default to false if isAdmin is not present
          if (isAdmin) {
            sessionStorage.setItem('isAdmin', 'true'); // Set isAdmin flag for admin user
            this.router.navigate(['/admin/dashboard']); // Redirect to admin dashboard
          } else {
            sessionStorage.removeItem('isAdmin'); // Remove isAdmin flag for non-admin user
            this.router.navigate(['/home']); // Redirect to home page
          }
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged in successfully',
          });
        } else {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email or password is wrong',
          });
        }
      },
      (error) => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );
  }
}
