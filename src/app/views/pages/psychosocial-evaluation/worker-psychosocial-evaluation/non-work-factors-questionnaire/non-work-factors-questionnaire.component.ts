import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-non-work-factors-questionnaire',
  templateUrl: './non-work-factors-questionnaire.component.html',
  styleUrls: ['./non-work-factors-questionnaire.component.scss']
})
export class NonWorkFactorsQuestionnaireComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }

}
