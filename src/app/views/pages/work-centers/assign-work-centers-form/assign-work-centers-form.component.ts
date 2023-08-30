import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-assign-work-centers-form',
  templateUrl: './assign-work-centers-form.component.html',
  styleUrls: ['./assign-work-centers-form.component.scss'],
})
export class AssignWorkCentersFormComponent implements OnInit {
  public form: FormGroup;
  public option: string;
  toastr: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public loadingService: LoadingService,
    public genericService: GenericService,
    public dialogRef: MatDialogRef<AssignWorkCentersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Descripcion: '',
      Nombre: ['', Validators.required],
      IdEmpresa: [this.data.id, Validators.required],
    });
  }
  onSaveCentroTrabajo() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .Post('centrotrabajo/RegistrarCentroDeTrabajo', this.form.value)
      .subscribe({
        next: (data) => {
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
          window.location.reload();
          this.toastr.success('Usuario Registrado, exitosamente!');
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          console.log('error usuario' + error.error.message);
          this.toastr.error('Ha ocurrido un error! ' + error.error.message);
        },
      });
  }
}
