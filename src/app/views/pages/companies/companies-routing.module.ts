import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CompaniesUserComponent } from './companies-user/companies-user.component';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { UpdateCompanyDataComponent } from './update-company-data/update-company-data.component';

const routes: Routes = [
  {
    path: 'list-companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companies-user',
    component: CompaniesUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-company-data',
    component: UpdateCompanyDataComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
