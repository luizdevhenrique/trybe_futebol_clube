import { IMatches } from './Matches/IMatches';

export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
'BAD_REQUEST' |
'NOT_FOUND' |
'UNAUTHORIZED' |
'CONFLICT' |
'UNPROCESSABLE_ENTITY';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;

export type SucessfullyCreated = {
  status: 'CREATED',
  data: IMatches
};
