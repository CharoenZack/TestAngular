import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './department';


@Injectable()

export class DepartmentService {

  constructor(private http: HttpClient) { }

  loadDepartmentList(condition: any = {}) {
    return this.http.get<Department[]>('/workshop-api/api/department', {params: condition});
  }
}


