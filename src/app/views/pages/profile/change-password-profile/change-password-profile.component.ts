import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password-profile',
  templateUrl: './change-password-profile.component.html',
  styleUrls: ['./change-password-profile.component.scss'],
})
export class ChangePasswordProfileComponent implements OnInit {
  public form: FormGroup;
  countErrorPassword: number = 0;
  hide = true;
  constructor(
    public formBuilder: FormBuilder,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.ChangePassword(this.form.value).subscribe(
      (result: any) => {
        this.openSnackBar(result.message);
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => this.form.reset());
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error.error.message);
        if (
          error.error.message ==
          'Ha ocurrido un error con el cambio de contraseña: Password Incorrecta.'
        )
          this.countErrorPassword++;
        if (this.countErrorPassword >= 3) {
          Swal.fire({
            icon: 'warning',
            title: '¡Has olvidado tu contraseña?',
            text: 'Por favor ingresa al siguiente link para recuperar',
            footer:
              '<a style="padding: 10px;" href="/account/restore-password">Olvidó su contraseña</a>',
          });
        }
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }
  cancelarForm() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) this.form.reset();
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
