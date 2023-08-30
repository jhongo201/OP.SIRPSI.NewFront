import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading: Boolean = true;
  public form: FormGroup;
  public siteKey: string = '6Lf_cGcnAAAAAGQM8rP0Vw3vBTTSe8mUPpMS7wUC';
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(
      (result) => (this.loading = result)
    );
    this.form = this.formBuilder.group({
      IdCompany: ['103365981', Validators.required],
      Document: ['1234567', Validators.required],
      Password: ['Admin123*.', Validators.required],
      // ReCaptcha: ['', Validators.required],
      Tc: [false, Validators.required],
    });
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    if (this.form.valid && this.form.value.Tc == true) {
      this.loadingService.ChangeStatusLoading(true);
      this.accountService.Authenticate(this.form.value).subscribe(
        (result: any) => {
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
        },
        (error) => {
          console.log(error.error);
          Swal.fire('Error', error.error.message, 'error');
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
        }
      );
    } else {
      Swal.fire(
        'Estimado/a Usuario/a',
        'Para continuar, debes aceptar los términos y condiciones del sistema SIRPSI.' +
          '\nPor favor, marca la casilla de aceptación antes de avanzar.',
        'warning'
      );
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  OpenTermsConditions() {
    // const dialogRef = this.dialog.open(TermsConditionsComponent, {
    //   data: { id: 0, type: 1 },
    // });
    // dialogRef.afterClosed().subscribe();
  }
}
