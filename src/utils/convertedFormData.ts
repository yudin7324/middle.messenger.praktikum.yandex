const convertedFormData = (form: HTMLFormElement) => {
  let formData = new FormData(form);
  let result: { [key: string]: any } = {};

  for (let [key, value] of formData.entries()) {
    result[key] = value.toString();
  }

  return result;
};

export default convertedFormData;
