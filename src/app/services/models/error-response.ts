/* tslint:disable */
/* eslint-disable */

import { HttpMethod } from '../models/http-method';

import { HttpStatusCode } from '../models/http-status-code';

export interface ErrorResponse {
  timestamp: string;
  messageError?: string;
  HttpMethod?: HttpMethod;
  path: string;
  statusCode?: HttpStatusCode;
  titleMessageCode?: string;
  typeMessageCode?: string;
}
