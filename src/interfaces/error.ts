export type IGenericErrorMessage = {
  path: string | number;
  message: string | Record<string, unknown> | undefined;
};
