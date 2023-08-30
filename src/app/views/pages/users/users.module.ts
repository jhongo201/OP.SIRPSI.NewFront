import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersCompanyComponent } from './users-company/users-company.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivateInactiveUsersComponent } from './activate-inactive-users/activate-inactive-users.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { UsersCompanyNotAffiliatedComponent } from './users-company-not-affiliated/users-company-not-affiliated.component';
import { BulkUserAssignmenFormComponent } from './bulk-user-assignmen-form/bulk-user-assignmen-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersCompanyComponent,
    ActivateInactiveUsersComponent,
    UsersCompanyNotAffiliatedComponent,
    BulkUserAssignmenFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatSnackBarModule,
    GenericTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatNativeDateModule,
    NgSelectModule,
    NgxMaskModule.forRoot({ validation: true }),
  ],
})
export class UsersModule {}
