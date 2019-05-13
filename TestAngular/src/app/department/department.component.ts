import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DepartmentTableComponent } from './department-table/department-table.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  @Input() hp = 0;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @ViewChild('departmentTable') departmentTable: DepartmentTableComponent;
  // @Input() topic = 'Search Department';

  constructor() {
    console.log('Constructor word!');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }
  incre() {
    this.hp++;
    this.increase.emit(this.hp);
  }
  del() {
    this.hp -= 2;
    this.decrease.emit(this.hp);
  }
  onCondition(condition: any) {
    // console.log('Hello Condition', condition);
    this.departmentTable.query(condition);
  }
}
