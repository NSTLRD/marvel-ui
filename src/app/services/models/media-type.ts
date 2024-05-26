/* tslint:disable */
/* eslint-disable */
export interface MediaType {
  charset?: string;
  concrete?: boolean;
  parameters?: {
[key: string]: string;
};
  qualityValue?: number;
  subtype?: string;
  subtypeSuffix?: string;
  type?: string;
  wildcardSubtype?: boolean;
  wildcardType?: boolean;
}
