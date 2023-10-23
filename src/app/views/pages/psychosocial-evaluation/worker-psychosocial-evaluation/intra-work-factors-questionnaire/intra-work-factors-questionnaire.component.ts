import { Component, OnInit } from '@angular/core';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-intra-work-factors-questionnaire',
  templateUrl: './intra-work-factors-questionnaire.component.html',
  styleUrls: ['./intra-work-factors-questionnaire.component.scss']
})
export class IntraWorkFactorsQuestionnaireComponent implements OnInit {

  startQuiz = false;

  dataList : any[] = [];

  step = 0;

  dataListText = [
    {
      dimesion : 'Demandas ambientales y de\r\nesfuerzo físico',
      title : 'Las siguientes preguntas están relacionadas con las condiciones ambientales del(los) sitio(s) o lugar(es) donde habitualmente rea liza su trabajo.'
    },
    {
      dimesion : 'Demandas cuantitativas',
      title : 'Para responder a las siguientes preguntas piense en la cantidad de trabajo que usted tiene a cargo.'
    },
    {
      dimesion : 'Demandas cuantitativas',
      title : 'Las siguientes preguntas están relacionadas con el esfuerzo mental que le exige su trabajo'
    }
  ]

  constructor(
    private psychosocialQuestionnaireService : PsychosocialQuestionnaireService
  ) { }

  ngOnInit(): void {
  }


  startQuizData(){
    this.startQuiz = true;
    this.getDataList(this.step);
  }

  getDataList( step : number ){
    this.psychosocialQuestionnaireService.getList().subscribe({
      next: (data) =>{
        const list : any[] = data;
        this.dataList = list.filter(d => d.forma === 'A1');
      },
      error: () =>{

      },
    })
  }

  clickContinue(){
    this.step = this.step + 1;
    alert(this.step);    
    this.getDataList(this.step);
  }

  clickBack(){
    this.step = this.step - 1;
    this.getDataList(this.step);
  }

}
