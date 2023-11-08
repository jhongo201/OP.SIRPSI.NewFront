import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { PsychosocialQuestionnaireService } from 'src/app/shared/services/psychosocial-questionnaire.service';

@Component({
  selector: 'app-intra-work-factors-questionnaire',
  templateUrl: './intra-work-factors-questionnaire.component.html',
  styleUrls: ['./intra-work-factors-questionnaire.component.scss']
})
export class IntraWorkFactorsQuestionnaireComponent implements OnInit {


  @Input() idQuiz: string;
  @Output() propagar = new EventEmitter();
  @Output() propagarStart = new EventEmitter();

  startQuiz = false;

  progress = 0;
  progressA = 0;

  index = 0;

  dataList: any[] = [];
  dataListA: any[] = [];

  resPutn1: any;
  resPutn2: any;
  dataListText = [
    {
      title: 'Las siguientes preguntas están relacionadas con las condiciones ambientales del(los) sitio(s) o lugar(es) donde habitualmente rea liza su trabajo. [1-12]',
      option: false,
      quiz: true,
      buton: true,
      min: 1,
      max: 12
    },
    {
      title: 'Para responder a las siguientes preguntas piense en la cantidad de trabajo que usted tiene a cargo. [13-15]',
      option: false,
      quiz: true,
      buton: true,
      min: 13,
      max: 15
    },
    {
      title: 'Las siguientes preguntas están relacionadas con el esfuerzo mental que le exige su trabajo [16-21]',
      option: false,
      quiz: true,
      buton: true,
      min: 16,
      max: 21
    },
    {
      title: 'Las siguientes preguntas están relacionadas con las responsabilidades y actividades que usted debe hacer en su trabajo. [22-30]',
      option: false,
      quiz: true,
      buton: true,
      min: 22,
      max: 30
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la jornada de trabajo. [31-38]',
      option: false,
      quiz: true,
      buton: true,
      min: 31,
      max: 38
    },
    {
      title: 'Las siguientes preguntas están relacionadas con las decisiones y el control que le permite su trabajo. [39-47]',
      option: false,
      quiz: true,
      buton: true,
      min: 39,
      max: 47
    },
    {
      title: 'Las siguientes preguntas están relacionadas con cualquier tipo de cambio que ocurra en su trabajo. [48-52]',
      option: false,
      quiz: true,
      buton: true,
      min: 48,
      max: 52
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la información que la empresa le ha dado sobre su trabajo. [53-59]',
      option: false,
      quiz: true,
      buton: true,
      min: 53,
      max: 59
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la formación y capacitación que la empresa le facilita para hacer su trabajo. [60-62]',
      option: false,
      quiz: true,
      buton: true,
      min: 60,
      max: 62
    },
    {
      title: 'Las siguientes preguntas están relacionadas con el o los jefes con quien tenga más contacto. [63-75]',
      option: false,
      quiz: true,
      buton: true,
      min: 63,
      max: 75
    },
    {
      title: 'Las siguientes preguntas indagan sobre las relaciones con otras personas y el apoyo entre las personas de su trabajo. [76-89]',
      option: false,
      quiz: true,
      buton: true,
      min: 76,
      max: 89
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la información que usted recibe sobre su rendimiento en el trabajo. [90-94]',
      option: false,
      quiz: true,
      buton: true,
      min: 90,
      max: 94
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la satisfacción, reconocimiento y la seguridad que le ofrece su trabajo. [95-105]',
      option: false,
      quiz: true,
      buton: true,
      min: 95,
      max: 105
    },
    {
      title: 'Las siguientes preguntas están relacionadas con la atención a clientes y usuarios. En mi trabajo debo brindar servicio a clientes o usuarios: Si [ ] No [ ]. [106-114]',
      option: true,
      quiz: false,
      buton: false,
      min: 106,
      max: 114
    },
    {
      title: 'Soy jefe de otras personas en mi trabajo: Si [ ] No [ ], Las siguientes preguntas están relacionadas con las personas que usted supervisa o dirige. [115-123]',
      option: true,
      quiz: false,
      buton: false,
      min: 115,
      max: 123
    },
  ]

  constructor(
    private psychosocialQuestionnaireService: PsychosocialQuestionnaireService,
    private accountService: AccountService
  ) {
    this.loadRadio();
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  calculateProgress() {
    const totalItems = this.dataList.length;
    const answeredItems = this.dataList.filter(data => data.puntuacionA !== null).length;
    this.progress = (answeredItems / totalItems) * 100;
  }

  calculateProgressA() {
    const totalItems = this.dataListA.length;
    const answeredItems = this.dataListA.filter(data => data.puntuacionA !== null).length;
    this.progressA = (answeredItems / totalItems) * 100;
  }


  startQuizData() {
    this.startQuiz = true;
    this.propagarStart.emit();
    this.getDataList([]);
  }


  getDataList(lista: any[]) {
    this.psychosocialQuestionnaireService.getList().subscribe({
      next: (data) => {
        let list: any[] = data;
        list = list.sort((a, b) => a.posicion - b.posicion);
        this.dataList = list.filter(d => d.forma === 'A1');
        this.dataList.forEach((objeto) => {
          objeto.puntuacion = null;
          objeto.puntuacionA = null;
        });
        this.asignarPuntuaciones(lista);
        this.calculateProgress();
        this.asginarPosicion();
      },
    })
  }

  asignarPuntuaciones(list: any[]) {
    this.dataList.forEach(objeto1 => {
      list.forEach(objeto2 => {
        if (objeto1.id === objeto2.idPreguntaEvaluacion) {
          objeto1.puntuacion = objeto2.puntuacion;
          objeto1.puntuacionA = objeto2.puntuacion;
        }
      });
    });
  }

  asginarPosicion() {
    let numero;
    if (!this.resPutn1) {
      this.dataList = this.dataList.filter(p => p.posicion < 106 || p.posicion > 114);
    }

    if (!this.resPutn2) {
      this.dataList = this.dataList.filter(p => p.posicion < 115 || p.posicion > 123);
    }

    const lista = this.dataList.filter(p => p.puntuacion === null && p.puntuacionA === null);

    if (lista.length === 0) {
      numero = 0;
    } else {
      numero = lista[0].posicion;
    }
    switch (true) {
      case numero >= 1 && numero <= 12:
        this.index = 0;
        break;
      case numero >= 13 && numero <= 15:
        this.index = 1;
        break;
      case numero >= 16 && numero <= 21:
        this.index = 2;
        break;
      case numero >= 22 && numero <= 30:
        this.index = 3;
        break;
      case numero >= 31 && numero <= 38:
        this.index = 4;
        break;
      case numero >= 39 && numero <= 47:
        this.index = 5;
        break;
      case numero >= 48 && numero <= 52:
        this.index = 6;
        break;
      case numero >= 53 && numero <= 59:
        this.index = 7;
        break;
      case numero >= 60 && numero <= 62:
        this.index = 8;
        break;
      case numero >= 63 && numero <= 75:
        this.index = 9;
        break;
      case numero >= 76 && numero <= 89:
        this.index = 10;
        break;
      case numero >= 90 && numero <= 94:
        this.index = 11;
        break;
      case numero >= 95 && numero <= 105:
        this.index = 12;
        break;
      case numero >= 106 && numero <= 114:
        this.index = 13;
        break;
      case numero >= 115 && numero <= 123:
        this.index = 14;
        break;
      case numero === 0:
        this.propagar.emit();
        break;
      default:
        break;
    }
    this.dataListA = this.dataList.filter(r => r.posicion >= this.dataListText[this.index].min && r.posicion <= this.dataListText[this.index].max);
    this.calculateProgressA();
  }

  clickContinue() {
    if (this.dataListText.length === this.index + 1) {
      this.propagar.emit();
    } else {
      this.index++;
      this.progressA = 0;
      this.dataListA = this.dataList.filter(r => r.posicion >= this.dataListText[this.index].min && r.posicion <= this.dataListText[this.index].max);
    }
  }

  changeResponse(e: any, data: any) {
    switch (e) {
      case '0':
        this.saveQuestions(data, data.siempre, e);
        break;
      case '1':
        this.saveQuestions(data, data.casiSiempre, e);
        break;
      case '2':
        this.saveQuestions(data, data.algunasVeces, e);
        break;
      case '3':
        this.saveQuestions(data, data.casiNunca, e);
        break;
      case '4':
        this.saveQuestions(data, data.nunca, e);
        break;
      default:
        break;
    }
    this.calculateProgress();
    this.calculateProgressA();
  }

  changeOption1(e: any, i: number) {
    if (e) {
      localStorage.setItem('resPutn2', `${e}`);
      this.dataListText[i].quiz = e;
      this.dataListText[i].buton = e;
      this.calculateProgressA();
    } else {
      localStorage.setItem('resPutn1', `${e}`);
      this.dataListText[i].buton = true;
      this.dataListText[i].quiz = e;
      this.progressA = 100;
    }
  }

  changeOption2(e: any, i: number) {
    if (e) {
      localStorage.setItem('resPutn2', `${e}`);
      this.dataListText[i].quiz = e;
      this.dataListText[i].buton = e;
      this.calculateProgressA();
    } else {
      localStorage.setItem('resPutn2', `${e}`);
      this.dataListText[i].buton = true;
      this.dataListText[i].quiz = e;
      this.progressA = 100;
    }
  }

  loadRadio() {
    const data = localStorage.getItem('resPutn1');
    const data2 = localStorage.getItem('resPutn2');
    if(data === 'true'){
      this.resPutn1 = true;
    }else if(data === 'false'){
      this.resPutn1 = false;
    }

    if(data2 === 'true'){
      this.resPutn1 = true;
    }else if(data2 === 'false'){
      this.resPutn1 = false;
    }
  }

  getQuestions() {
    this.psychosocialQuestionnaireService.getListResponse(this.accountService.userData.id).subscribe({
      next: (data) => {
        const list: any[] = data;
        if (list.length !== 0) {
          this.startQuiz = true;
          this.getDataList(list);
        }
      },
      error: () => {
        this.startQuiz = false;
      },
    })
  }

  saveQuestions(data: any, resp: number, punt: string) {
    if (data.puntuacion === null) {
      this.createQuestions(data, resp, punt);
      data.puntuacion === punt;
    } else if (data.puntuacionA !== data.puntuacion) {
      this.updateQuestions(data, resp, punt);
      data.puntuacion === punt;
    }
  }

  createQuestions(data: any, resp: number, punt: string) {
    const res = {
      idEvaluacionPsicosocialUsuario: this.idQuiz,
      idPreguntaEvaluacion: data.id,
      respuesta: resp,
      puntuacion: punt,
      idUserEvaluacion: this.accountService.userData.id,
      idDimension: data.idDimension,
      idDominio: data.dominio
    }
    this.psychosocialQuestionnaireService.createPsychosocialQuestionnaire(res).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => {
        console.log(data);
      },
    })
  }

  updateQuestions(data: any, resp: number, punt: string) {
    this.psychosocialQuestionnaireService.updatePsychosocialQuestionnaire(data.id, resp, punt).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: () => {
        console.log(data);
      },
    })
  }



}
