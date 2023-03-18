type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage: string;
  requiredMessage?: string;
};

type ValidationResult = {
  [key: string]: string | null;
};

const validateFormFields = (
  rules: { [key: string]: ValidationRule },
  formValues: { [key: string]: string }
): ValidationResult => {
  const result: ValidationResult = {};

  for (const fieldName in rules) {
    const fieldRules = rules[fieldName];
    const fieldValue = formValues[fieldName];

    if (fieldRules.required && !fieldValue) {
      result[fieldName] = fieldRules.errorMessage;
      continue;
    }

    if (fieldRules.minLength && fieldValue.length < fieldRules.minLength) {
      result[fieldName] = fieldRules.errorMessage;
      continue;
    }

    if (fieldRules.maxLength && fieldValue.length > fieldRules.maxLength) {
      result[fieldName] = fieldRules.errorMessage;
      continue;
    }

    if (fieldRules.pattern && !fieldRules.pattern.test(fieldValue)) {
      result[fieldName] = fieldRules.errorMessage;
      continue;
    }

    result[fieldName] = null;
  }

  return result;
};

export default validateFormFields;
