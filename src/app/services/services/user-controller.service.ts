/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { activateAccount } from '../fn/user-controller/activate-account';
import { ActivateAccount$Params } from '../fn/user-controller/activate-account';
import { LoginResponseDto } from '../models/login-response-dto';
import { loginUser } from '../fn/user-controller/login-user';
import { LoginUser$Params } from '../fn/user-controller/login-user';
import { registerUser } from '../fn/user-controller/register-user';
import { RegisterUser$Params } from '../fn/user-controller/register-user';
import { UserResponseDto } from '../models/user-response-dto';


/**
 * Manejo de usuarios
 */
@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/api/v1/users/register';

  /**
   * Register a new user.
   *
   * Registers a new user and provides a JWT for authentication.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponseDto>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Register a new user.
   *
   * Registers a new user and provides a JWT for authentication.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<UserResponseDto> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponseDto>): UserResponseDto => r.body)
    );
  }

  /** Path part for operation `loginUser()` */
  static readonly LoginUserPath = '/api/v1/users/login';

  /**
   * User login.
   *
   * Authenticates a user and issues a JWT.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser$Response(params: LoginUser$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponseDto>> {
    return loginUser(this.http, this.rootUrl, params, context);
  }

  /**
   * User login.
   *
   * Authenticates a user and issues a JWT.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginUser(params: LoginUser$Params, context?: HttpContext): Observable<LoginResponseDto> {
    return this.loginUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>): LoginResponseDto => r.body)
    );
  }

  /** Path part for operation `activateAccount()` */
  static readonly ActivateAccountPath = '/api/v1/users/activate-account';

  /**
   * Activate account.
   *
   * Activates a user account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `activateAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount$Response(params: ActivateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return activateAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * Activate account.
   *
   * Activates a user account.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `activateAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  activateAccount(params: ActivateAccount$Params, context?: HttpContext): Observable<string> {
    return this.activateAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
