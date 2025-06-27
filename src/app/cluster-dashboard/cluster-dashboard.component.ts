import { Component, OnInit } from '@angular/core';
import { ClusterService, Cluster } from '../cluster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.css']
})
export class ClusterDashboardComponent implements OnInit {
  clusters: Cluster[] = [];
  isAdmin = false;

  constructor(private svc: ClusterService,private router:Router) {}

  ngOnInit() {
    let user = this.svc.getCredentials();
    this.isAdmin =  user?.username === 'admin';
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => this.clusters = data);
  }

  save(cluster: Cluster, input: HTMLInputElement) {
    const val = parseInt(input.value, 10);
    this.svc.update(cluster.id, val).subscribe(() => this.load());
  }
  logout() {
  this.svc.logout();
  this.router.navigate(['/']);
}

}
