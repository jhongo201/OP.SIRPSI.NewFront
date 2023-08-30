import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCompanyComponent } from './users-company/users-company.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { UsersComponent } from './users.component';
import { ActivateInactiveUsersComponent } from './activate-inactive-users/activate-inactive-users.component';
import { UsersCompanyNotAffiliatedComponent } from './users-company-not-affiliated/users-company-not-affiliated.component';
import { BulkUserAssignmenFormComponent } from './bulk-user-assignmen-form/bulk-user-assignmen-form.component';

const routes: Routes = [
  { path: 'list-users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'users-company',
    component: UsersCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users-company-not-affiliated',
    component: UsersCompanyNotAffiliatedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inactive-users',
    component: ActivateInactiveUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bulk-user-assignmen',
    component: BulkUserAssignmenFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
