import { Component, OnInit } from '@angular/core';
import { Department } from '../shared/department';
import { DepartmentService } from '../shared/department.service';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  departmentList: Department[] = [];
  constructor(public service: DepartmentService) {

  }

  ngOnInit() {
    this.query();
  }
  query(condition?: any) {
    this.service.loadDepartmentList(condition).subscribe(response => this.departmentList = response);
  }

}
