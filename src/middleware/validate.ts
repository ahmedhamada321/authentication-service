export const validateJoiSchema = (data: any, schema: any) => {
  const validation = schema.validate(data, { abortEarly: false });

  const validationError = validation?.error?.message;

  const error: any = {
    status: 422,
    message: validationError,
  };
  if (validationError) throw new Error(validationError);
};
