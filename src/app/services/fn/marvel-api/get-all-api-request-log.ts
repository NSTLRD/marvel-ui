import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { ApiRequestLogResponse } from '../../models/Api-Request-Log-Response';



export interface GetAllApiRequestLog$Params {
}

export function GetAllApiRequestLog(http: HttpClient, rootUrl: string, params?: GetAllApiRequestLog$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiRequestLogResponse>> {
  const rb = new RequestBuilder(rootUrl, GetAllApiRequestLog.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ApiRequestLogResponse>;
    })
  );
}

GetAllApiRequestLog.PATH = '/api/v1/marvel/ApiRequestLog';
