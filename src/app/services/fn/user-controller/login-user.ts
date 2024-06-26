/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginDto } from '../../models/login-dto';
import { LoginResponseDto } from '../../models/login-response-dto';

export interface LoginUser$Params {
      body: LoginDto
}

export function loginUser(http: HttpClient, rootUrl: string, params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponseDto>> {
  const rb = new RequestBuilder(rootUrl, loginUser.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoginResponseDto>;
    })
  );
}

loginUser.PATH = '/api/v1/users/login';
