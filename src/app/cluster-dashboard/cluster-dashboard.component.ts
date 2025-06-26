import { Component, OnInit } from '@angular/core';
import { ClusterService, Cluster } from '../cluster.service';

@Component({
  selector: 'app-cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.css']
})
export class ClusterDashboardComponent implements OnInit {
  clusters: Cluster[] = [];
  isAdmin = false;

  constructor(private svc: ClusterService) {}

  ngOnInit() {
    const user = localStorage.getItem('username');
    this.isAdmin = user === 'admin';
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(data => this.clusters = data);
  }

  save(cluster: Cluster, input: HTMLInputElement) {
    const val = parseInt(input.value, 10);
    this.svc.update(cluster.id, val).subscribe(() => this.load());
  }
}
