import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LogindataService, User } from '@services/logindata.service';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  currentUser: User = { id: 0, name: '', email: '', password: '' }; // Use User type for currentUser

  users: User[] = []; // Use array of User type for users

  constructor(private userdata: LogindataService) {
    this.loadUsers(); // Load the initial list of users
  }

  // Load all users
  loadUsers(): void {
    this.userdata.getUser().subscribe((result) => {
      this.users = result; // Assign result to users array
      console.log('Users loaded:', this.users);
    });
  }

  // Get the next available ID
  getNextUserId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map(user => user.id || 0)) + 1
      : 1; // If no users exist, start with ID = 1
  }

  // Add a new user
  addUser(name: string, email: string, password: string): void {
    // Get the next ID for the new user
    const newId = this.getNextUserId();
    console.log('New ID:', newId);

    const userData: User = { id: newId, name, email, password };

    this.userdata.addUsers(userData).subscribe(
      (result) => {
        console.log('User added successfully:', result);

        // Add the new user to the local users array
        this.users.push(userData);

        // Reset the current user form
        this.currentUser = { id: 0, name: '', email: '', password: '' };
        alert('User added successfully!');
      }

    );
  }






}
