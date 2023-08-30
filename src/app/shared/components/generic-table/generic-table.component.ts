import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from '../../services/loading.service';
import { environment } from 'src/environments/environment';
import { DataTable } from 'simple-datatables';
import { AnyObject } from 'chart.js/types/basic';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  @Output() selected = new EventEmitter<any>();
  @Output() dateil = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() pdf = new EventEmitter<any>();
  @Output() assign = new EventEmitter<any>();
  @Output() deletePer = new EventEmitter<any>();
  @Input('columns') columns: any = [];
  @Input('table') table: string = '';
  @Input('title') title: string = '';
  @Input('delete') delete: string = '';
  @Input('changeStatus') changeStatus: string = '';
  @Input('nameColumnStatus') nameColumnStatus: string = 'idEstado';
  @Input('filter') filter: any = '';
  @Input('options') options: any = [];
  @Input('dataTable') dataTable: any;
  public state: string = environment.activoEstado;
  public data: any[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  constructor(
    private genericService: GenericService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    if (this.dataTable == undefined) this.Get();
    if (this.dataTable.length >= 0) {
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
    }
    // this.loadingService.ChangeStatusLoading()
  }
  ChangePage(event: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.Get();
  }
  Get() {
    this.loadingService.ChangeStatusLoading(true);
    this.genericService
      .GetAll(
        this.table +
          '?PageNumber=' +
          (this.pageNumber + 1) +
          '&PageSize=' +
          this.pageSize,
        this.filter
      )
      .subscribe(
        (data: any) => {
          this.data = data;
          this.pageSize = data.pageSize;
          this.totalItems = data.totalItems;
          setTimeout(() => {
            var dataTable = new DataTable('#dataTableExample', {
              perPageSelect: [5, 10, 15, 20],
              perPage: 5,
              labels: {
                placeholder: 'Buscar...', // The search input placeholder
                perPage: '{select} Numero de registro por pagina', // per-page dropdown label
                noRows: 'No se encontraron registros', // Message shown when there are no records to show
                noResults:
                  'Ningún resultado coincide con su consulta de búsqueda', // Message shown when there are no search results
                info: 'Mostrando {start} a {end} de {rows} entradas', //
              },
            });
            console.log(dataTable);
            this.AjustarEventosTable(dataTable);
            this.loadingService.ChangeStatusLoading(false);
          }, 1200);
        },
        (error) => {
          console.error(error);
          this.openSnackBar(error.error.message);
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
        }
      );
  }
  AjustarEventosTable(dataTable: DataTable) {
    dataTable.on(
      'datatable.selectrow',
      (rowIndex: any, event: any, value: any) => {
        event.preventDefault();
        var item = this.data.filter(
          (data: any) => data.id == rowIndex.children[0].data
        )[0];
        var btn = event.srcElement.classList;
        if (btn.contains('btn-delete'))
          this.DeletePeople(rowIndex.children[0].data);
        if (btn.contains('btn-edit')) this.DetailOrEditItem(item, 2);
        if (btn.contains('btn-details')) this.DetailOrEditItem(item, 1);
        if (btn.contains('btn-state')) this.ChangeStaTus(item);
        if (btn.contains('btn-assign')) this.DetailOrEditItem(item, 4);
        if (btn.contains('btn-select')) this.SeletedItem(item, null, null);
      }
    );
  }
  DeletePeople(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'no podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService.Delete(this.delete, id).subscribe(
          (data) => {
            this.openSnackBar(data.message);
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              600
            );
            if (this.dataTable == undefined) this.Get();
            else window.location.reload();
          },
          (error) => {
            console.error(error);
            this.openSnackBar(error.error.message);
            setTimeout(
              () => this.loadingService.ChangeStatusLoading(false),
              1000
            );
          }
        );
      }
    });
  }
  DetailOrEditItem(item: any, type: number) {
    this.loadingService.ChangeStatusLoading(true);
    if (type == 1) this.dateil.emit(item);
    if (type == 2) this.edit.emit(item);
    if (type == 3) this.pdf.emit(item);
    if (type == 4) this.assign.emit(item);
    if (type == 5) this.deletePer.emit(item);
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
  SeletedItem(item: any, estado: any, validationSelect: boolean | any) {
    this.loadingService.ChangeStatusLoading(true);
    // if (estado == 0 || validationSelect == false)
    this.selected.emit(item);
    // else
    //   this.openSnackBar("El registro con la id: " + id + " esta deshabilitado.");
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 600);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
  ChangeStaTus(item: any) {
    Swal.fire({
      title: '¿Estas seguro?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.ChangeStatusLoading(true);
        this.genericService
          .ChangeStatus(this.changeStatus, item.id, item.idEstado)
          .subscribe(
            (data) => {
              this.loadingService.ChangeStatusLoading(false);
              window.location.reload();
              this.openSnackBar(data.message);
            },
            (error) => {
              console.error(error);
              this.openSnackBar(error.error.message);
              setTimeout(
                () => this.loadingService.ChangeStatusLoading(false),
                1000
              );
            }
          );
      }
    });
  }
}
export const defaultConfig: any = {
  // for sorting
  sortable: true,
  locale: 'en',
  numeric: true,
  caseFirst: 'false',

  // for searching
  searchable: true,
  sensitivity: 'base',
  ignorePunctuation: true,
  destroyable: true,
  searchItemSeparator: '', // If specified, splits the content of cells up using this separator before performing search.
  searchQuerySeparator: ' ',
  searchAnd: false,

  // Pagination
  paging: true,
  perPage: 5,
  perPageSelect: [5, 10, 15, 20, 25],
  nextPrev: true,
  firstLast: false,
  prevText: '‹',
  nextText: '›',
  firstText: '«',
  lastText: '»',
  ellipsisText: '…',
  truncatePager: true,
  pagerDelta: 2,

  // Customise the display text
  // Customize the class names used by datatable for different parts
  classes: {
    // Note: use single class names
    active: 'datatable-active',
    ascending: 'datatable-ascending',
    bottom: 'datatable-bottom',
    container: 'datatable-container',
    cursor: 'datatable-cursor',
    descending: 'datatable-descending',
    disabled: 'datatable-disabled',
    dropdown: 'datatable-dropdown',
    ellipsis: 'datatable-ellipsis',
    filter: 'datatable-filter',
    filterActive: 'datatable-filter-active',
    empty: 'datatable-empty',
    headercontainer: 'datatable-headercontainer',
    hidden: 'datatable-hidden',
    info: 'datatable-info',
    input: 'datatable-input',
    loading: 'datatable-loading',
    pagination: 'datatable-pagination',
    paginationList: 'datatable-pagination-list',
    paginationListItem: 'datatable-pagination-list-item',
    paginationListItemLink: 'datatable-pagination-list-item-link',
    search: 'datatable-search',
    selector: 'datatable-selector',
    sorter: 'datatable-sorter',
    table: 'datatable-table',
    top: 'datatable-top',
    wrapper: 'datatable-wrapper',
  },
};
