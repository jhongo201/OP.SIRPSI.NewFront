import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-data-profile',
  templateUrl: './change-data-profile.component.html',
  styleUrls: ['./change-data-profile.component.scss'],
})
export class ChangeDataProfileComponent implements OnInit {
  public form: FormGroup;
  public formEmail: FormGroup;
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
      NewPassword: ['', Validators.required, Validators.email],
      ConfirmPassword: ['', Validators.required, Validators.email],
    });
    this.formEmail = this.formBuilder.group({
      OldEmail: this.accountService.userData.user.email,
      NewEmail: ['', Validators.required],
      ConfirmEmail: ['', Validators.required],
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
          timer: 2000,
        }).then(() => window.location.reload());
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      },
      (error) => {
        console.error(error);
        this.openSnackBar(error.error.message);
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
