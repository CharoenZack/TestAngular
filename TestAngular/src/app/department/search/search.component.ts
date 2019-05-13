import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DepartmentService } from '../shared/department.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() topic = 'Search Department';
  @Output() search = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() status = new EventEmitter();
  departmentForm = new FormGroup({
    departmentName: new FormControl(null, [this.badWordValidator('fuck'), Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    province: new FormControl(null),
    budgetFrom: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    budgetTo: new FormControl(null, Validators.pattern(/^[0-9]+$/)),
    status: new FormControl('Y'),
    telephone: new FormControl(null, Validators.pattern(/^\d+$/)),
    remark: new FormControl(null, Validators.maxLength(10))
  });

  DisableRemark = true;
  cities1: SelectItem[];
  constructor() {
    this.cities1 = [
      { label: 'None', value: null },
      { label: 'Bangkok', value: { id: 1, name: 'Bangkok' } },
      { label: 'Chonburi', value: { id: 2, name: 'Chonburi' } }
    ];
  }
  ngOnInit() {
  }
  badWordValidator(word: string): ValidatorFn {
    // type ValidatorFn = (control: AbstractControl)=>ValidationErrors |null
    return (control: AbstractControl): ValidationErrors => {
      const departmentName: string = control.value;
      if (departmentName && departmentName.indexOf(word) !== -1) {
        return {fuck: true};
      }
  // ถ้า return เป็น object จะหมายถึง validate ไม่ผ่าน
  // ถ้า return null หมายถึง validate ผ่าน
      return null;
    };
  }
  Search() {
    // console.log('search');
    if (this.departmentForm.valid) {
      const formGroupRawValue = this.departmentForm.getRawValue();
      const condition = {};
      Object.keys(formGroupRawValue).forEach(key => {
        if (formGroupRawValue[key]) {
          condition[key] = formGroupRawValue[key];
        }
      });
      this.search.emit(condition);
      // console.log();
    } else {
      Object.values(this.departmentForm.controls).forEach(formControl => {
        formControl.markAsTouched();
      });
    }
  }
  Cancel() {
    console.log('cancel');
    this.cancel.emit();
    this.departmentForm.reset();
  }
  Status(checkstatus: string, remarkInput: HTMLInputElement) {
    if (checkstatus === 'Y') {
      // this.DisableRemark = false;
      // remarkInput.value = '';
      this.departmentForm.get('remark').setValue(null);
      this.departmentForm.get('remark').disable();
    } else {
      // this.DisableRemark = null;
      this.departmentForm.get('remark').enable();
    }
    // checkstatus === 'Y' ? this.DisableRemark = false : this.DisableRemark = null;
    console.log('status', checkstatus);
    this.status.emit();
  }
}
