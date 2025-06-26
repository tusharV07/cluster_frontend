import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cluster {
  id: number;
  name: string;
  serverCount: number;
}

@Injectable({ providedIn: 'root' })
export class ClusterService {
  private api = 'http://localhost:8080/api/clusters';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.api);
  }

  update(id: number, count: number) {
    return this.http.put<Cluster>(`${this.api}/${id}`, { serverCount: count });
  }
}


