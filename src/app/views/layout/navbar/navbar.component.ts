import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SelectRoleService } from 'src/app/shared/services/select-role.service';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public enableSesion: boolean = false;
  public menuSettings: any = {
    Dashboard: false,
    Roles: false,
    Routes: false,
    RoutesRole: false,
    Configuration: false,
    MinisterioUno: false,
    Ministerio: false,
    WorkCenters: false,
    Countries: false,
  };
  constructor(
    public accountService: AccountService,
    public roleService: SelectRoleService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  onLogout(e: Event) {
    this.accountService.CloseUserSession();
  }
}
