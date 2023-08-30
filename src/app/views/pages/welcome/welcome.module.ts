import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CompaniesModule } from '../companies/companies.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    WelcomeRoutingModule,
    MatDividerModule,
    CompaniesModule,
  ],
  providers: [HttpClientModule],
})
export class WelcomeModule {}
