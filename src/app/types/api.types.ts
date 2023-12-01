export type ApiReponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};
