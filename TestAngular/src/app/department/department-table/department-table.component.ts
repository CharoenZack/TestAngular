import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../shared/department';
import { DepartmentService } from '../shared/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  departmentList: Department[] = [];
  displayDialog: boolean;

  @ViewChild('departmentform') form: DepartmentFormComponent;

  constructor(public service: DepartmentService) {
    this.service.loadDepartmentList().subscribe(
      response => this.departmentList = response)
  }


  ngOnInit() {
    this.query();
  }
  query(condition?: any) {
    this.service.loadDepartmentList(condition).subscribe(response => this.departmentList = response);
  }
  // showDialogToAdd() {
  //   // this.newCar = true;
  //   // this.car = {};
  //   this.displayDialog = true;
  // }
  onRowSelect(event: any) {
    console.log(event.data);
    const selectedRow = { ...event.data };
    this.displayDialog = true;
    // this.newCar = false;
    // this.car = this.cloneCar(event.data);
    const telephoneList = selectedRow.telephone.split(/\s*\,\s*/);
    selectedRow.telephone = telephoneList;
    const loop = telephoneList.length - this.form.addedTelephoneFormArrayCtrl.length;
    for (let i = 0; i < Math.abs(loop); i++) {
      if (loop < 0) {
        this.form.addedTelephoneFormArrayCtrl.removeAt(0);
      } else {
        this.form.addedTelephoneFormArrayCtrl.push(new FormControl(null, [Validators.maxLength(11), Validators.required]));
      }
    }
    // while (this.departmentForm.addedTelephoneFormArray.lenght! == 0) {
    //   this.departmentForm.addedTelephoneFormArray.removeAt(0);
    // }
    // for (let i = 0; i < telephoneList.lenght - 1; i++) {
    //   this.departmentForm.addedTelephoneFormArray.push(new FormControl());
    // }
    setTimeout(() => {
      this.form.registerForm.patchValue(selectedRow);
    }, 200);
  }
  updataSelectedRow(payload: any) {
    if (payload.departmentCode) {
      const department = {
        departmentCode: payload.departmentCode,
        departmentName: payload.departmentName,
        telephone: payload.telephone.join(','),
        province: payload.province,
        budget: payload.budget,
        status: payload.status
      };
      this.service.editDepartment(department).subscribe(respone => {
        this.displayDialog = false;
        const index = this.departmentList.findIndex(department => {
          return department.departmentCode === payload.departmentCode;
        });
        this.departmentList[index] = payload;
        this.query();
      });
    } else {
      this.service.addDepartment(payload).subscribe(response => {
        this.departmentList.push(response);
        this.displayDialog = false;

      });
    }
  }
  deleteDepartment(code: string) {
    this.service.deleteDepartMent(code).subscribe(response => {
      const index = this.departmentList.findIndex(department => department.departmentCode === code);
      this.departmentList.splice(index, 1);
    });
  }
  addItem() {
    this.displayDialog = true;
    this.form.registerForm.reset({ status: 'Y', remark: { value: '', disabled: true } });
  }
}
