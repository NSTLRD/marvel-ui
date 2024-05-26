/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CharacterDataWrapper } from '../models/character-data-wrapper';
import { getAllCharacters } from '../fn/marvel-api/get-all-characters';
import { GetAllCharacters$Params } from '../fn/marvel-api/get-all-characters';
import { getCharacterById } from '../fn/marvel-api/get-character-by-id';
import { GetCharacterById$Params } from '../fn/marvel-api/get-character-by-id';
import { ApiRequestLogResponse } from '../models/Api-Request-Log-Response';
import { GetAllApiRequestLog, GetAllApiRequestLog$Params } from '../fn/marvel-api/get-all-api-request-log';


/**
 * Marvel API operations
 */
@Injectable({ providedIn: 'root' })
export class MarvelApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllCharacters()` */
  static readonly GetAllCharactersPath = '/api/v1/marvel/characters';

  /**
   * Get all characters.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCharacters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCharacters$Response(params?: GetAllCharacters$Params, context?: HttpContext): Observable<StrictHttpResponse<CharacterDataWrapper>> {
    return getAllCharacters(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all characters.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCharacters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCharacters(params?: GetAllCharacters$Params, context?: HttpContext): Observable<CharacterDataWrapper> {
    return this.getAllCharacters$Response(params, context).pipe(
      map((r: StrictHttpResponse<CharacterDataWrapper>): CharacterDataWrapper => r.body)
    );
  }

  /** Path part for operation `getCharacterById()` */
  static readonly GetCharacterByIdPath = '/api/v1/marvel/characters/{characterId}';

  /**
   * Get character by id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCharacterById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCharacterById$Response(params: GetCharacterById$Params, context?: HttpContext): Observable<StrictHttpResponse<CharacterDataWrapper>> {
    return getCharacterById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get character by id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCharacterById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCharacterById(params: GetCharacterById$Params, context?: HttpContext): Observable<CharacterDataWrapper> {
    return this.getCharacterById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CharacterDataWrapper>): CharacterDataWrapper => r.body)
    );
  }

  /**
   * Get all API request logs.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCharacters()` instead.
   *
   * This method doesn't expect any request body.
   */
    static readonly GetAllApiRequestLogPath = '/api/v1/marvel/ApiRequestLog';



  getAllApiRequestLog$Response(params?: GetAllApiRequestLog$Params, context?: HttpContext): Observable<StrictHttpResponse<ApiRequestLogResponse>> {
    return GetAllApiRequestLog(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all API request logs.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCharacters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */

  getAllApiRequestLog(params?: GetAllApiRequestLog$Params, context?: HttpContext): Observable<ApiRequestLogResponse> {
    return this.getAllApiRequestLog$Response(params, context).pipe(
      map((r: StrictHttpResponse<ApiRequestLogResponse>): ApiRequestLogResponse => r.body)
    );
  }

}
