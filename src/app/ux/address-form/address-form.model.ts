export interface Controls {
  addressId?: string;
  addressee: string;
  street1: string;
  street2: string;
  town: string;
  county: string;
  postcode: string;
}

export interface ValidationError {
  fieldName: string;
  groupName?: string;
  message: string;
}

export interface Validation {
  isValid: boolean;
  errors: ValidationError[]
}
