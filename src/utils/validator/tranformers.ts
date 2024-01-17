import { TransformFnParams } from "class-transformer";

export const toJSONTransformer = (params: TransformFnParams) => {
  if (!params.value) return;
  try {
    return JSON.parse(params.value);
  } catch (error) {
    return params.value;
  }
};

export const toNumberTransformer = (params: TransformFnParams) => {
  if (!params.value) return;

  return Number(params.value);
};
