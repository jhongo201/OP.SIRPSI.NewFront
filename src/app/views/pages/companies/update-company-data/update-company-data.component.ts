import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-update-company-data',
  templateUrl: './update-company-data.component.html',
  styleUrls: ['./update-company-data.component.scss'],
})
export class UpdateCompanyDataComponent implements OnInit {
  listCompaniesUser: any;
  company: any = null;
  constructor(
    private genericService: GenericService,
    private loadingService: LoadingService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.getListas();
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
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
      });
  }
  selectedCompanie(event: any) {
    this.company = event;
  }
}
