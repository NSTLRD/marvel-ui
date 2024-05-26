/* tslint:disable */
/* eslint-disable */
export interface ContentDisposition {
  attachment?: boolean;
  charset?: string;
  /** @deprecated */creationDate?: string;
  filename?: string;
  formData?: boolean;
  inline?: boolean;
  /** @deprecated */modificationDate?: string;
  name?: string;
  /** @deprecated */readDate?: string;
  /** @deprecated */size?: number;
  type?: string;
}
