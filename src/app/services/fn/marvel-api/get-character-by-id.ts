/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CharacterDataWrapper } from '../../models/character-data-wrapper';

export interface GetCharacterById$Params {
  characterId: number;
}

export function getCharacterById(http: HttpClient, rootUrl: string, params: GetCharacterById$Params, context?: HttpContext): Observable<StrictHttpResponse<CharacterDataWrapper>> {
  const rb = new RequestBuilder(rootUrl, getCharacterById.PATH, 'get');
  if (params) {
    rb.path('characterId', params.characterId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CharacterDataWrapper>;
    })
  );
}

getCharacterById.PATH = '/api/v1/marvel/characters/{characterId}';
