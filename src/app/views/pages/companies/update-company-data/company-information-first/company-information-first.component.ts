import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-information-first',
  templateUrl: './company-information-first.component.html',
  styleUrls: ['./company-information-first.component.scss'],
})
export class CompanyInformationFirstComponent implements OnInit {
  public form: FormGroup;
  public formWorkCenter: FormGroup;
  public formUser: FormGroup;
  public option: string;
  listCompaniesUser: any;
  estadosList: any;
  listUsuario: any;
  listMinisterios: any;
  listDocs: any;
  listTipoEmpresa: any;
  listEmpresas: any;
  listPaises: any;
  id: number | undefined;
  listRoles: any;
  listTiposPersona: any;
  listRegimenes: any;
  listActividadEconomica: any;
  @Input('company') company: any = null;
  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getListas();
    this.form = this.formBuilder.group({
      Id: ['', Validators.required],
      IdTipoPersona: ['', Validators.required],
      IdRegimenTributario: ['', Validators.required],
      TipoDocumento: ['', Validators.required],
      DigitoVerificacion: '',
      IdTipoEmpresa: ['', Validators.required],
      IdActividadEconomica: ['', Validators.required],
      Documento: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Observacion: '',
      IdMinisterio: ['', Validators.required],
      IdEstado: ['', Validators.required],
      IdUsuario: '0',
      IdConsecutivo: '',
    });
    this.formWorkCenter = this.formBuilder.group({
      Id: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Principal: true,
      IdMinisterio: ['', Validators.required],
      IdEstado: ['', Validators.required],
      IdUsuario: ['', Validators.required],
      IdEmpresa: ['', Validators.required],
    });
    this.formUser = this.formBuilder.group({
      Id: ['', Validators.required],
      TypeDocument: ['', Validators.required],
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
    this.loadDataCompany(this.company);
  }
  onSave() {
    var body = {
      Empresa: this.form.value,
      CentroTrabajo: this.formWorkCenter.value,
      Usuario: this.formUser.value,
    };
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService.Put('empresas/ActualizarEmpresa', body).subscribe({
          next: (data) => {
            this.loadingService.ChangeStatusLoading(false);
            Swal.fire({
              icon: 'success',
              title: 'Empresa, Actualizada exitosamente.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => window.location.reload());
          },
          error: (error) => {
            console.error(error);
            this.openSnackBar(error.error.message);
            this.loadingService.ChangeStatusLoading(false);
          },
        });
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  getListas() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        'empresas/ConsultarEmpresasUsuario?user=' +
          this.accountService.userData.id
      )
      .subscribe((data: any) => {
        this.listCompaniesUser = data;
        this.genericService
          .GetAll('ministerio/ConsultarMinisterio')
          .subscribe((data: any) => {
            this.listMinisterios = data;
            this.form.controls['IdMinisterio'].setValue(
              this.listMinisterios[0].id
            );
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
                                      .GetAll(
                                        'regimenesTributario/ConsultarRegimenesTributario'
                                      )
                                      .subscribe((data: any) => {
                                        this.listRegimenes = data;
                                        this.genericService
                                          .GetAll(
                                            'tiposPersonas/ConsultarTiposPersona'
                                          )
                                          .subscribe((data: any) => {
                                            this.listTiposPersona = data;
                                            this.genericService
                                              .GetAll(
                                                'actividadEconomica/ConsultarActividadEconomica'
                                              )
                                              .subscribe((data: any) => {
                                                this.listActividadEconomica =
                                                  data;
                                                this.genericService
                                                  .GetAll(
                                                    'usuario/ConsultarUsuarios'
                                                  )
                                                  .subscribe((data: any) => {
                                                    this.listUsuario = data;
                                                    this.listUsuario.push({
                                                      id: '0',
                                                      nombreUsuario:
                                                        'Registrar',
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
                  });
              });
          });
      });
  }
  loadDataCompany(event: any) {
    if (event != null && event != undefined) {
      this.form.controls['Id'].setValue(event.id);
      this.form.controls['DigitoVerificacion'].setValue(
        event.digitoVerificacion
      );
      this.form.controls['IdTipoEmpresa'].setValue(event.idTipoEmpresa);
      this.form.controls['Documento'].setValue(event.documento);
      this.form.controls['Nombre'].setValue(event.nombre);
      this.form.controls['IdMinisterio'].setValue(event.idMinisterio);
      this.form.controls['IdEstado'].setValue(event.idEstado);
      this.form.controls['IdConsecutivo'].setValue(event.idConsecutivo);
      this.form.controls['TipoDocumento'].setValue(event.tipoDocumento.id);
      this.form.controls['Descripcion'].setValue(event.descripcion);
      this.form.controls['IdUsuario'].setValue(event.idUsuario);
      this.form.controls['IdTipoPersona'].setValue(event.idTipoPersona);
      this.form.controls['IdRegimenTributario'].setValue(
        event.idRegimenTributario
      );
      this.form.controls['IdActividadEconomica'].setValue(
        event.idActividadEconomica
      );

      this.formWorkCenter.controls['Id'].setValue(event.centroTrabajo.id);
      this.formWorkCenter.controls['Nombre'].setValue(
        event.centroTrabajo.nombre
      );
      this.formWorkCenter.controls['Descripcion'].setValue(
        event.centroTrabajo.descripcion
      );
      this.formWorkCenter.controls['Principal'].setValue(
        event.centroTrabajo.principal
      );
      this.formWorkCenter.controls['IdUsuario'].setValue(
        event.centroTrabajo.idUsuario
      );
      this.formWorkCenter.controls['IdEmpresa'].setValue(
        event.centroTrabajo.idEmpresa
      );
      this.formWorkCenter.controls['IdEstado'].setValue(
        event.centroTrabajo.idEstado
      );

      this.formUser.controls['Id'].setValue(event.usuario.id);
      this.formUser.controls['TypeDocument'].setValue(
        event.usuario.typeDocument
      );
      this.formUser.controls['Document'].setValue(event.usuario.document);
      this.formUser.controls['IdCountry'].setValue(event.usuario.idCountry);
      this.formUser.controls['IdCompany'].setValue(event.usuario.idCompany);
      this.formUser.controls['Names'].setValue(event.usuario.names);
      this.formUser.controls['Surnames'].setValue(event.usuario.surnames);
      this.formUser.controls['IdRol'].setValue(event.usuario.idRol);
      this.formUser.controls['PhoneNumber'].setValue(event.usuario.phoneNumber);
      this.formUser.controls['Email'].setValue(event.usuario.email);
      this.formUser.controls['IdEstado'].setValue(event.usuario.idEstado);
    } else {
      this.form.reset();
      this.formWorkCenter.reset();
      this.formUser.reset();
    }
  }
}
