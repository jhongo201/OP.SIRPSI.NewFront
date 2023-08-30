import { Component, inject, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss'],
})
export class CompaniesFormComponent implements OnInit {
  public form: FormGroup;
  public formUser: FormGroup;
  public option: string;
  estadosList: any;
  listUsuario: any;
  listMinisterios: any;
  listDocs: any;
  listTipoEmpresa: any;
  listEmpresas: any;
  listPaises: any;
  id: number | undefined;
  type: number = this.data.type;
  table: number = this.data.table;
  listRoles: any;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    public dialogRef: MatDialogRef<CompaniesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      TipoDocumento: ['', Validators.required],
      DigitoVerificacion: '',
      IdTipoEmpresa: ['', Validators.required],
      Documento: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Observacion: '',
      IdMinisterio: ['', Validators.required],
      IdEstado:
        this.data.estado == undefined
          ? ['', Validators.required]
          : this.data.estado,
      IdUsuario: '0',
      Usuario: null,
    });
    this.formUser = this.formBuilder.group({
      IdTypeDocument: ['', Validators.required],
      Document: ['', Validators.required],
      IdCountry: ['', Validators.required],
      IdCompany: '',
      Names: ['', Validators.required],
      Surnames: ['', Validators.required],
      IdRol: environment.adminitradorEmpRole,
      Password: ['', Validators.required],
      PhoneNumber: '',
      Email: ['', Validators.required, Validators.email],
      IdEstado: environment.inactivoEstado,
    });
  }
  onSave() {
    this.loadingService.ChangeStatusLoading(true);
    this.formUser.value.PhoneNumber = '+57' + this.formUser.value.PhoneNumber;
    this.form.value.Usuario =
      this.form.value.IdUsuario == '0' ? this.formUser.value : null;
    this.genericService
      .Post('empresas/RegistrarEmpresa', this.form.value)
      .subscribe({
        next: (data) => {
          if (this.data.reload) '';
          else this.dialogRef.close();
          this.loadingService.ChangeStatusLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'Empresa, Registrado, exitosamente.',
            showConfirmButton: false,
            timer: 2800,
          }).then(() => window.location.reload());
        },
        error: (error) => {
          this.loadingService.ChangeStatusLoading(false);
          Swal.fire({
            icon: 'warning',
            title:
              'Ha ocurrido un error! ' + error.error.message ==
              'Registro de usuario ¡fallido!  Failed : PasswordRequiresNonAlphanumeric,PasswordRequiresLower,PasswordRequiresUpper'
                ? 'Registro de usuario ¡fallido!  Error: La contraseña no cumple los criterios de seguridad.'
                : error.error.message,
            showConfirmButton: false,
            timer: 2800,
          });
        },
      });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll('ministerio/ConsultarMinisterio')
      .subscribe((data: any) => {
        this.listMinisterios = data;
        this.form.controls['IdMinisterio'].setValue(this.listMinisterios[0].id);
        this.genericService
          .GetAll('tipodocumento/ConsultarTipoDocumento')
          .subscribe((data: any) => {
            this.listDocs = data;
            this.genericService
              .GetAll('tiposempresa/ConsultarTipoEmpresa')
              .subscribe((data: any) => {
                this.listTipoEmpresa = data;
                this.genericService
                  .GetAll('estados/ConsultarEstados')
                  .subscribe((data: any) => {
                    this.estadosList = data;
                    this.genericService
                      .GetAll('empresas/ConsultarEmpresas')
                      .subscribe((data: any) => {
                        this.listEmpresas = data;
                        this.genericService
                          .GetAll('pais/ConsultarPaises')
                          .subscribe((data: any) => {
                            this.listPaises = data;
                            this.genericService
                              .GetAll('roles/ConsultarRoles')
                              .subscribe((data: any) => {
                                this.listRoles = data;
                                this.genericService
                                  .GetAll('usuario/ConsultarUsuarios')
                                  .subscribe((data: any) => {
                                    this.listUsuario = data.filter(
                                      (data: any) =>
                                        data.idRol ==
                                        (this.data.table == 0
                                          ? environment.adminitradorEmpRole
                                          : this.data.table == 1
                                          ? environment.psicologoRole
                                          : environment.trabajadorRole)
                                    );
                                    this.listUsuario.push({
                                      id: '0',
                                      nombreUsuario: 'Registrar',
                                      apellidosUsuario: '',
                                    });
                                    setTimeout(
                                      () =>
                                        this.loadingService.ChangeStatusLoading(
                                          false
                                        ),
                                      500
                                    );
                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }
  changeViewFormUser(role: number, estado: number) {
    var roleId;
    var estadoId;
    if (role == 1) roleId = environment.adminitradorEmpRole;
    if (estado == 1) estadoId = environment.activoEstado;
    this.dialogRef.close();
    // this.dialog
    //   .open(UsersFormComponent, {
    //     data: {
    //       id: 0,
    //       type: 0,
    //       reload: false,
    //       estado: estadoId,
    //       role: roleId,
    //       retornarModal: environment.retornarModal.registrarAdmin,
    //     },
    //   })
    //   .afterClosed()
    //   .subscribe();
  }
}
