import { Component, OnInit } from '@angular/core';
import { ClusterService } from '../cluster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string = '';
  password:string = '';
  error = false;

  constructor(private clusterService: ClusterService, private router: Router) {}

  login() {
    this.clusterService.setCredentials(this.username, this.password);

    this.clusterService.getAll().subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error = true;
        this.clusterService.setCredentials('', '');
      }
    });
  }
}

