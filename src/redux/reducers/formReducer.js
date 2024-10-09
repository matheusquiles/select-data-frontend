const initialState = {
    formData: {
      admissao: '',
      demissao: '',
      principal_pedido: '',
      ultimos_andamentos_processuais: '',
      valor_perda_estimado: '',
      deposito_recursal_ordinario: '',
      data_deposito_recursal_ordinario: '',
      deposito_recursal_revista: '',
      data_deposito_recursal_revista: '',
      deposito_judicial: '',
      data_deposito_judicial: '',
      bloqueio_judicial: '',
      data_bloqueio_judicial: '',
      estado: '',
      cidade: ''
    },
    invalidFields: []
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORM_DATA':
        return {
          ...state,
          formData: {
            ...state.formData,
            ...action.payload
          }
        };
      case 'SET_INVALID_FIELDS':
        return {
          ...state,
          invalidFields: action.payload
        };
      default:
        return state;
    }
  };
  
  export default formReducer;