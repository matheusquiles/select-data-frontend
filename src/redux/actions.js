export const setFormData = (formData) => ({
    type: 'SET_FORM_DATA',
    payload: formData
  });
  
  export const setInvalidFields = (invalidFields) => ({
    type: 'SET_INVALID_FIELDS',
    payload: invalidFields
  });