import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { SearchComponent } from './search/search.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DepartmentTableComponent } from './department-table/department-table.component';
import {TableModule} from 'primeng/table';
import { StatusPipe } from './shared/status.pipe';
import { DepartmentService } from './shared/department.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [DepartmentComponent, SearchComponent, DepartmentTableComponent, StatusPipe],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    HttpClientModule
  ],
  exports: [DepartmentComponent],
  providers: [DepartmentService]
})
export class DepartmentModule { }
