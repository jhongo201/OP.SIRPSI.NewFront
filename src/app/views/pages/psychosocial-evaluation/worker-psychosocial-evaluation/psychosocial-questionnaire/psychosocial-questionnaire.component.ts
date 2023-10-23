import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-psychosocial-questionnaire',
  templateUrl: './psychosocial-questionnaire.component.html',
  styleUrls: ['./psychosocial-questionnaire.component.scss']
})
export class PsychosocialQuestionnaireComponent implements OnInit {

  defaultNavActiveId = 1;

  minutos: number = 10;
  segundos: number = 0;
  cronometroActivo: boolean = false;
  intervalo: any;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(false);
    this.modalAlertConfirmation();
    this.iniciarDetenerCronometro();
  }

  iniciarDetenerCronometro() {
    if (this.cronometroActivo) {
      clearInterval(this.intervalo);
    } else {
      this.intervalo = setInterval(() => {
        if (this.minutos === 0 && this.segundos === 0) {
          clearInterval(this.intervalo);
          this.cronometroActivo = false;
        } else {
          if (this.segundos === 0) {
            this.minutos--;
            this.segundos = 59;
          } else {
            this.segundos--;
          }
        }
      }, 1000);
    }
    this.cronometroActivo = !this.cronometroActivo;
  }


  modalAlertConfirmation() {
    var messageInfo =
      '<p class="texto-mensaje"> Estimado/a Usuario/a, este módulo le permite realizar la evaluación psicosocial con la asesoría del Psicólogo Especialista SST de la empresa. Toda la información que proporcione será confidencial y solo estará disponible para el Psicólogo Especialista SST designado por la empresa. Si necesita el informe individual con el resultado de la evaluación, deberá solicitarlo al Psicólogo Especialista SST respectivo. Antes de comenzar la evaluación, es importante que lea y comprenda el consentimiento informado disponible en el siguiente enlace <a href="#">Información de consentimiento</a>.</p>';
    Swal.fire({
      icon: 'info',
      title: 'Estimado(a) usuario(a)',
      html: messageInfo,
      confirmButtonText: 'Sí Acepto',
      cancelButtonText: 'No Acepto',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {

      }
    });
  }

}
