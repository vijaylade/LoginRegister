import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LogindataService, User } from '@services/logindata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LogindataService, private router: Router) {}

  loginData = { email: '', password: '' };

  isAuthenticated = false;
  currentUser: User | null = null;



  onLogin(): void {

    const { email, password } = this.loginData;

    this.loginService.loginUser(email, password).subscribe((user) => {

      if (user) {
        this.isAuthenticated = true;
        this.currentUser = user;
        console.log('Login Successful:', user);
        alert('Login Successful!');
        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.isAuthenticated = false;
        this.currentUser = null;
        console.error('Invalid credentials');
        alert('Invalid email or password');
      }
     
  });
  }





  

}
