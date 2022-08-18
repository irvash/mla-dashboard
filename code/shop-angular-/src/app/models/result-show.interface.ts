export interface resultShow {
  dataValue: string;
  message: string;
  status: boolean;
  data: any;
}


export interface resultShow2<T> {
  dataValue: string;
  message: string;
  // messageError: string;
  status: boolean;
  data: T;
  errors: string[];
  validationErrors: ValidationErrors[];
}

export interface ValidationErrors {
  errorMessage: string;
  propertyName: string;
}

export interface DropDownViewModel {
  /**متن */
  text: string;
  /**مقدار */
  value: string;
  // valueInt: number | null;

}

export interface DropDownViewModel2<T> {
  /**متن */
  text: string;
  /**مقدار */
  value: T;
}


export enum ErrorHandling {
  userNotFound = 'userNotFound',
  userpaswrong = 'userpaswrong',
  add = 'add',
  edit = 'edit',
  server = 'server',
  upload = 'upload',
  validation = 'validation',
  success = 'success',
  duplicate = 'duplicate',
  nofile = 'nofile',
  successEdite = 'successEdite',
  notfound = 'notfound',
  nullValue = 'nullValue',
  duplicateCodeMeli = 'duplicateCodeMeli',
  sendMessageError = 'sendMessageError',
  maxRequest = 'maxRequest',
  notAbleAccess = 'notAbleAccess',
  cantEdit = 'cantEdit',
  homeWebService = 'homeWebService',
  useIt = 'useIt',
  cantDelete = 'cantDelete'
}
