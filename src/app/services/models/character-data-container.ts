/* tslint:disable */
/* eslint-disable */
import { Character } from '../models/character';
export interface CharacterDataContainer {
  count?: number;
  limit?: number;
  offset?: number;
  results?: Array<Character>;
  total?: number;
}
