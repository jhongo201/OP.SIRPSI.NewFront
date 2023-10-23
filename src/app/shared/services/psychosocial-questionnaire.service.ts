import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsychosocialQuestionnaireService {

  constructor(
    private http: HttpClient,
  ) { }

  public getList(): Observable<any> {
    return this.http
      .get<any>(environment.urlApi + 'Preguntas/ConsultarPreguntas')
      .pipe(
        map((res) => {
          if (res.Status == '400') {
            console.log(res);
          }
          return res;
        })
      );
  }
}
