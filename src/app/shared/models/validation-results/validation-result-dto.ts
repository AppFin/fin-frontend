export type ValidationResultDto<D = any, E = any> = {
  data: D | null;
  message: string;
  success: boolean;
  errorCode: E | null;
};
